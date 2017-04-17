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
        Leap.loop(controllerOptions, function(frame) {
            if (frame.hands.length > 0) {
                for (var i = 0; i < frame.hands.length; i++) {
                    var hand = frame.hands[i];
                    if (hand.type == 'left') {
                        maoEsquerda = Hand(hand);
                        console.log(maoEsquerda.direction[0]);
                    } else {
                        maoDireita = Hand(hand);
                        console.log(maoDireita.direction[0]);
                    }
                    //console.log(mao.dedos[0].ossos[0].center() + " Qual mão? " + mao.type + " Qual dedo? " + fingerTypeMap[mao.dedos[0].type] + " Qual osso? " + boneTypeMap[mao.dedos[0].ossos[0].type]);
                }
            }
        });
        $scope.salvar = function() {
            if (maoDireita != null) {
                $scope.maoDireita = {
                    type: maoDireita.type,
                    direction: vectorToString(maoDireita.direction, 2)
                };
            }
            if (maoEsquerda != null) {
                $scope.maoEsquerda = {
                    type: maoEsquerda.type,
                    direction: vectorToString(maoEsquerda.direction, 2)
                };
            }
        };

    });

function vectorToString(vector, digits) {

    if (typeof digits === "undefined") {
        digits = 1;
    }
    return "(" + vector[0].toFixed(digits) + ", " +
        vector[1].toFixed(digits) + ", " +
        vector[2].toFixed(digits) + ")";
}

function convertToEuclidenDistance(vector1, vector2) {
    return Math.sqrt();
}