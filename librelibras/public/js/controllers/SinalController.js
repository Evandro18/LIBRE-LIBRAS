angular.module('librelibras').controller('SinalController',
    function($scope, $routeParams, Sinal) {
        // ^ Sinal - devolve um objeto que permite realizar uma série de operações seguindo o padrão REST

        maoDireitaTemp = null;

        maoEsquerdaTemp = null;

        $scope.maos = [];

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
        Leap.loop(controllerOptions, function(frame) {
            if (frame.hands.length > 0) {
                for (var i = 0; i < frame.hands.length; i++) {
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
                $scope.maos = [];
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
            return mao = {
                lado: objMao.type,
                distanciaPolegar: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[0].dipPosition).toFixed(2),
                distanciaIndicador: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[1].dipPosition).toFixed(2),
                distanciaMedio: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[2].dipPosition).toFixed(2),
                distanciaAnelar: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[3].dipPosition).toFixed(2),
                distanciaMindinho: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[4].dipPosition).toFixed(2),
                distanciaMindinhoAnelar: converteParaDistEuclidiana(objMao.fingers[4].dipPosition, objMao.fingers[3].dipPosition).toFixed(2),
                distanciaAnelarMedio: converteParaDistEuclidiana(objMao.fingers[3].dipPosition, objMao.fingers[2].dipPosition).toFixed(2),
                distanciaMedioIndicador: converteParaDistEuclidiana(objMao.fingers[2].dipPosition, objMao.fingers[1].dipPosition).toFixed(2)
            };
        }

        $scope.comparaSinal = function() {
            $scope.sinal.$compara()
                .then(function() {
                    console.log("Funcionou");
                })
                .catch(function(erro) {
                    console.log("Erro");
                });
        }

        // Função que salva o sinal
        $scope.salvaSinal = function() {
            $scope.sinal.$save()
                .then(function() {
                    $scope.mensagem = { texto: 'Salvo com sucesso!' };
                    $scope.sinal = new Sinal();
                    console.log('salvaSinal');
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