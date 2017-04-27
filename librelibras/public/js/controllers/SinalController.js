angular.module('librelibras').controller('SinalController',
    function($scope, $resource) {
        var Sinal = $resource('/sinais/:id');

        var maoDireita = null;
        var maoEsquerda = null;

        var handID = '';

        var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];

        var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];

        function Finger(finger) {
            this.finger = finger;
            finger.ossos = [];
            finger.bones.forEach(function(bone) {
                finger.ossos.push(bone);
            }, this);
            return finger;
        };

        function Hand(hand) {
            this.hand = hand;
            hand.dedos = [];
            // pointables - coisas que podem ser apontadas
            if (hand.pointables.length > 0) {
                for (j = 0; j < hand.pointables.length; j++) {
                    var pointable = hand.pointables[j];
                    var dedo = new Finger(pointable);
                    hand.dedos.push(dedo);
                }
                return hand;
            }
        };

        var controllerOptions = { enableGestures: true };
        // metódo que inicia a leitura através do Leap
        Leap.loop(controllerOptions, function(frame) {
            if (frame.hands.length > 0) {
                for (var i = 0; i < frame.hands.length; i++) {
                    var hand = frame.hands[i];
                    if (hand.type == 'left') {
                        maoEsquerda = Hand(hand);
                        //console.log(maoEsquerda.dedos[0].ossos[0].center() + "ponto");
                    } else {
                        maoDireita = Hand(hand);
                        console.log(boneTypeMap[maoDireita.dedos[1].ossos[3].type]);
                        // console.log(maoDireita.dedos[0].type());
                    
                    //console.log(mao.dedos[0].ossos[0].center() + " Qual mão? " + mao.type + " Qual dedo? " + fingerTypeMap[mao.dedos[0].type] + " Qual osso? " + boneTypeMap[mao.dedos[0].ossos[0].type]);
                }
            }
        }
    });
        $scope.capturar = function() {
            if (maoDireita != null) {
                $scope.maoDireita = {
                    distancia1: convertToEuclidenDistance(maoDireita.palmPosition, maoDireita.dedos[0].ossos[3].center()).toFixed(2),
                    distancia2: convertToEuclidenDistance(maoDireita.palmPosition, maoDireita.dedos[1].ossos[3].center()).toFixed(2),
                    distancia3: convertToEuclidenDistance(maoDireita.palmPosition, maoDireita.dedos[2].ossos[3].center()).toFixed(2),
                    distancia4: convertToEuclidenDistance(maoDireita.palmPosition, maoDireita.dedos[3].ossos[3].center()).toFixed(2),
                    distancia5: convertToEuclidenDistance(maoDireita.palmPosition, maoDireita.dedos[4].ossos[3].center()).toFixed(2),
                    distancia6: convertToEuclidenDistance(maoDireita.dedos[4].ossos[3].center(), maoDireita.dedos[3].ossos[3].center()).toFixed(2),
                    distancia7: convertToEuclidenDistance(maoDireita.dedos[3].ossos[3].center(), maoDireita.dedos[2].ossos[3].center()).toFixed(2),
                    distancia8: convertToEuclidenDistance(maoDireita.dedos[2].ossos[3].center(), maoDireita.dedos[1].ossos[3].center()).toFixed(2),

                };
            }
            if (maoEsquerda != null) {
                $scope.maoEsquerda = {
                    distancia1: convertToEuclidenDistance(maoEsquerda.palmPosition, maoEsquerda.dedos[0].ossos[3].center()).toFixed(2),
                    distancia2: convertToEuclidenDistance(maoEsquerda.palmPosition, maoEsquerda.dedos[1].ossos[3].center()).toFixed(2),
                    distancia3: convertToEuclidenDistance(maoEsquerda.palmPosition, maoEsquerda.dedos[2].ossos[3].center()).toFixed(2),
                    distancia4: convertToEuclidenDistance(maoEsquerda.palmPosition, maoEsquerda.dedos[3].ossos[3].center()).toFixed(2),
                    distancia5: convertToEuclidenDistance(maoEsquerda.palmPosition, maoEsquerda.dedos[4].ossos[3].center()).toFixed(2),
                    distancia6: convertToEuclidenDistance(maoEsquerda.dedos[4].ossos[3].center(), maoEsquerda.dedos[3].ossos[3].center()).toFixed(2),
                    distancia7: convertToEuclidenDistance(maoEsquerda.dedos[3].ossos[3].center(), maoEsquerda.dedos[2].ossos[3].center()).toFixed(2),
                    distancia8: convertToEuclidenDistance(maoEsquerda.dedos[2].ossos[3].center(), maoEsquerda.dedos[1].ossos[3].center()).toFixed(2),
                };
            }
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

function convertToEuclidenDistance(vector1, vector2) {

    return Math.sqrt(Math.pow((vector1[0] - vector2[0]), 2) + Math.pow((vector1[1] - vector2[1]), 2) + Math.pow((vector1[2] - vector2[2]), 2));
}