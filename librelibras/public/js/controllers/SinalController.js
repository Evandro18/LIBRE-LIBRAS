angular.module('librelibras').controller('SinalController',
    function($scope, $routeParams, Sinal) {
        // ^ Sinal - devolve um objeto que permite realizar uma série de operações seguindo o padrão REST

        maoDireitaTemp = null;

        maoEsquerdaTemp = null;

        $scope.maos = [];

        $scope.sinal = {};

        $scope.sinal.nomeSinal = "";

        if ($routeParams.sinalId) {
            Sinal.get({ id: $routeParams.sinalId },
                function(sinal) {
                    $scope.sinal = sinal;
                },
                function(erro) {
                    $scope.mensagem = { texto: 'Erro' };
                }
            );
        } else {
            $scope.sinal = new Sinal();
        }

        var controllerOptions = { enableGestures: true };

        // metódo que inicia a leitura através do Leap Motion
        var controller = Leap.loop(controllerOptions, function(frame) {
            if (frame.hands.length > 0) {
                for (var i = 0; i < frame.hands.length; i++) {
                    console.log(frame.hands.length);
                    if (frame.hands[i].type == 'left') {
                        maoEsquerdaTemp = frame.hands[i];
                    } else {
                        maoDireitaTemp = frame.hands[i];
                    }
                }
            }
        });

        // Função que captura o sinal 
        $scope.capturar = function() {

            $scope.maos = [];

            console.log('capturar' + "\n");
            if ($scope.maos.length == 2) {
                $scope.maos = [{}];
            }
            if (maoDireitaTemp) {
                $scope.maos.push(pegaDistancias(maoDireitaTemp));
            }

            if (maoEsquerdaTemp) {
                $scope.maos.push(pegaDistancias(maoEsquerdaTemp));
            }

            $scope.sinal.maos = $scope.maos;
            console.log($scope.sinal);
        };

        function pegaDistancias(objMao) {
            var mao = {
                yaw: objMao.yaw().toFixed(2),
                roll: objMao.roll().toFixed(2),
                pitch: objMao.pitch().toFixed(2),
                distPolegar: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[0].dipPosition).toFixed(2),
                distIndicador: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[1].dipPosition).toFixed(2),
                distMedio: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[2].dipPosition).toFixed(2),
                distAnelar: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[3].dipPosition).toFixed(2),
                distMindinho: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[4].dipPosition).toFixed(2),
                distMindinhoAnelar: converteParaDistEuclidiana(objMao.fingers[4].dipPosition, objMao.fingers[3].dipPosition).toFixed(2),
                distAnelarMedio: converteParaDistEuclidiana(objMao.fingers[3].dipPosition, objMao.fingers[2].dipPosition).toFixed(2),
                distMedioIndicador: converteParaDistEuclidiana(objMao.fingers[2].dipPosition, objMao.fingers[1].dipPosition).toFixed(2)
            }
            return mao;
        }

        $scope.comparaSinal = function() {
            console.log("compara");
            $scope.sinal.$compara()
                .then(function(resposta) {
                    console.log(resposta + "");
                })
                .catch(function(erro) {
                    console.log("Erro");
                });
        };

        // Função que salva o sinal
        $scope.salvaSinal = function() {
            $scope.sinal.$save()
                .then(function() {
                    $scope.mensagem = { texto: 'Salvo com sucesso!' };
                    $scope.sinal = new Sinal();
                    console.log('salvaSinal');
                    $scope.mensagem = {
                        texto: 'Salvo com sucesso',
                        sucesso: true
                    }
                })
                .catch(function(erro) {
                    $scope.mensagem = { texto: 'Erro ao salvar!' };
                    console.log('salvaSinal' + erro);
                });
        };
    });

// converte em String e limita o número de casas decimas a dois "direction: vectorToString(maoEsquerda.direction, 2)"
function vectorToString(vector, digits) {
    if (typeof digits === "undefined") {
        digits = 1;
    }
    return "(" + vector[0].toFixed(digits) + ", " +
        vector[1].toFixed(digits) + ", " +
        vector[2].toFixed(digits) + ")";
}

function converteParaDistEuclidiana(vector1, vector2) {
    return Math.sqrt(Math.pow((vector1[0] - vector2[0]), 2) + Math.pow((vector1[1] - vector2[1]), 2) + Math.pow((vector1[2] - vector2[2]), 2));
}