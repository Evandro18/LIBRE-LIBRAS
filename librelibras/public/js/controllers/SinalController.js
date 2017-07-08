angular.module('librelibras').controller('SinalController',
    function($scope, $routeParams, Sinal) {
        // ^ Sinal - devolve um objeto que permite realizar uma série de operações seguindo o padrão REST

        maoDireitaTemp = null;

        maoEsquerdaTemp = null;

        $scope.maos = [];

        $scope.sinal = {};

        $scope.sinal.nomeSinal = "";

        $scope.maoDireita = {};

        $scope.maoEsquerda = {};

        $scope.texto = '';

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
                        if (frame.hands[i].type === 'left') {
                            maoEsquerdaTemp = frame.hands[i];
                            console.log("esquerda");
                            console.log(maoEsquerdaTemp.palmNormal);
                        } else {
                            maoDireitaTemp = frame.hands[i];
                            console.log("Direita");
                            console.log(maoDireitaTemp.palmNormal);
                        }
                    }
                }
            }).use('playback', {
                recording: 'demo2.json'
            })
            .use('riggedHand', {
                scale: 1.5,
                boneColors: function(boneMesh, leapHand) {
                    if ((boneMesh.name.indexOf('Finger_') == 0)) {
                        return {
                            hue: 0,
                            saturation: leapHand.grabStrength,
                            lightness: 0.5
                        }
                    }
                }
            }).connect();

        var camera = controller.plugins.riggedHand.camera;
        camera.position.set(-1, -10, -13);
        camera.lookAt(new THREE.Vector3(0, 3, 0));

        window.load = function() {
            var canvas = document.getElementsByTagName("canvas");
            canvas[0].style.width = '64%';
            canvas[0].style.height = '45%';
            canvas[0].style.marginTop = '100px';
            canvas[0].style.marginLeft = '20px';
        }

        window.load();

        // Função que captura o sinal 
        $scope.capturar = function() {
            console.log('capturarando');
            var direita = maoDireitaTemp ? pegaDistancias(maoDireitaTemp) : undefined;
            var esquerda = maoEsquerdaTemp ? pegaDistancias(maoEsquerdaTemp) : undefined;
            $scope.maoDireita = direita;
            console.log(direita);
            $scope.maoEsquerda = esquerda;
            console.log(esquerda);

            $scope.sinal.maos = new Array();
            if (direita) {
                console.log('Mão Direita');

                $scope.sinal.maos.push($scope.maoDireita);
            }

            if (esquerda) {
                console.log('Mão Esquerda');
                $scope.sinal.maos.push($scope.maoEsquerda);
            }

            maoDireitaTemp = undefined;
            maoEsquerdaTemp = undefined;
            console.log($scope.sinal);
        };

        function pegaDistancias(objMao) {
            console.log('Calculando distâncias');
            var mao = {
                distancias: {
                    distPolegar: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[0].bones[3].nextJoint),
                    distIndicador: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[1].bones[3].nextJoint),
                    distMedio: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[2].bones[3].nextJoint),
                    distAnelar: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[3].bones[3].nextJoint),
                    distMindinho: converteParaDistEuclidiana(objMao.palmPosition, objMao.fingers[4].bones[3].nextJoint),
                    distMindinhoAnelar: converteParaDistEuclidiana(objMao.fingers[4].bones[3].nextJoint, objMao.fingers[3].bones[3].nextJoint),
                    distAnelarMedio: converteParaDistEuclidiana(objMao.fingers[3].bones[3].nextJoint, objMao.fingers[2].bones[3].nextJoint),
                    distMedioIndicador: converteParaDistEuclidiana(objMao.fingers[2].bones[3].nextJoint, objMao.fingers[1].bones[3].nextJoint)
                },
                angulos: {
                    yaw: objMao.yaw(),
                    roll: objMao.roll(),
                    pitch: objMao.pitch()
                }
            }
            return mao;
        }

        $scope.comparaSinal = function() {
            console.log("Comparando sinal");
            $scope.sinal.$compara()
                .then(function(resposta) {
                    $scope.sinalRetornado = resposta.sinal;
                    $scope.distanciaRetornada = resposta.distancia;
                })
                .catch(function(erro) {
                    console.log("Error");
                });
        };

        // Função que salva o sinal
        $scope.salvaSinal = function() {
            console.log('Salvando');
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