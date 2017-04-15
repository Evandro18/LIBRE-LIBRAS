angular.module('librelibras').controller('SinalController',
    function($scope, $resource) {
        var Sinal = $resource('/sinais/:id');

        var mao = '';

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
                    mao = Hand(hand);
                    console.log(mao.dedos[0].ossos[0].center() + " Qual mão? " + mao.type + " Qual dedo? " + fingerTypeMap[mao.dedos[0].type] + " Qual osso? " + boneTypeMap[mao.dedos[0].ossos[0].type]);
                }
            }
        });

        $scope.capturar = function() {
            $scope.mensagem = {
                text: handID + ' certo'
            };
        };
    });