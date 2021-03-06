angular.module('librelibras').controller('SinalController',
    function($scope, $routeParams, Sinal) {
        // ^ Sinal - devolve um objeto que permite realizar uma série de operações seguindo o padrão REST
        $scope.sinal = new Sinal();

        maoDireitaTemp = null;

        maoEsquerdaTemp = null;

        $scope.maos = [];

        // $scope.sinal = {};

        $scope.sinal.nomeSinal = "";

        $scope.maoDireita = {};

        $scope.maoEsquerda = {};

        $scope.texto = '';

        var direita = undefined;
        var esquerda = undefined;

        var buscaSinais = function() {
            Sinal.query(null,
                function(sinais) {
                    $scope.sinais = sinais;
                },
                function(erro) {
                    alert('error');
                    $scope.mensagem = { texto: 'Erro' };
                }
            );
        }

        buscaSinais();

        $scope.buscaSinal = function(id) {
            Sinal.get({ id: id },
                function(sinal) {
                    $scope.sinal = sinal;
                    console.log(sinal);
                    $scope.maoEsquerda = sinal.maos.filter((mao) => {
                        return mao.lado === 'left'
                    })[0];
                    $scope.maoDireita = sinal.maos.filter((mao) => {
                        return mao.lado === 'right'
                    })[0];

                    direita = $scope.maoDireita;
                    esquerda = $scope.maoEsquerda;
                },
                function(erro) {
                    console.log(erro);
                });
        };

        var controllerOptions = { enableGestures: true };

        // metódo que inicia a leitura através do Leap Motion
        var controller = Leap.loop(controllerOptions, function(frame) {
                if (frame.hands.length > 0) {
                    for (var i = 0; i < frame.hands.length; i++) {
                        if (frame.hands[i].type === 'left') {
                            maoEsquerdaTemp = frame.hands[i];
                        } else {
                            maoDireitaTemp = frame.hands[i];
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
        // camera.position.set(-1, -10, -13);
        camera.position.set(0, -20, -5);
        // camera.lookAt(new THREE.Vector3(0, 3, 0));
        camera.lookAt(new THREE.Vector3(0, 3, 0));

        window.onload = function() {
            var canvas = document.getElementsByTagName("canvas")[0];
            canvas.style.width = '97%';
            canvas.style.height = '60%';
            canvas.style.marginTop = '30px';
            canvas.style.marginLeft = '20px';
            var visualizer = document.getElementById('visualizer');
            visualizer.appendChild(canvas)
            canvas.style.position = 'absolute';
        }

        window.onload();

        // Função que captura o sinal 
        $scope.capturar = function() {

            //TODO: confirmar método de atualização
            console.log('capturarando');
            $scope.maoDireita = maoDireitaTemp ? pegaDistancias(maoDireitaTemp) : direita ? direita : undefined;
            $scope.maoEsquerda = maoEsquerdaTemp ? pegaDistancias(maoEsquerdaTemp) : esquerda ? esquerda : undefined;

            $scope.sinal.maos = new Array();
            if ($scope.maoDireita) {
                console.log('Mão Direita');
                $scope.sinal.maos.push($scope.maoDireita);
            }

            if ($scope.maoEsquerda) {
                console.log('Mão Esquerda');
                $scope.sinal.maos.push($scope.maoEsquerda);
            }

            console.log($scope.sinal);
            maoDireitaTemp = undefined;
            maoEsquerdaTemp = undefined;
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
                },
                lado: objMao.type
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
            console.log($scope.sinal);
            $scope.sinal.$save()
                .then(function() {
                    $scope.mensagem = { texto: 'Salvo com sucesso!' };
                    $scope.sinal = new Sinal();
                    console.log('salvaSinal');
                    $scope.mensagem = {
                        texto: 'Salvo com sucesso',
                        sucesso: true
                    }
                    buscaSinais();
                })
                .catch(function(erro) {
                    $scope.mensagem = { texto: 'Erro ao salvar!' };
                    console.log('salvaSinal' + erro);
                });
        };

        $scope.remove = function(id) {
            Sinal.remove({ id: id },
                function(resposta) {
                    alert(resposta.mensagem);
                },
                function(erro) {
                    alert(erro);
                });
        }
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