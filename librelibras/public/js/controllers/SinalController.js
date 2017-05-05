angular.module('librelibras').controller('SinalController',
    function($scope, $routeParams, Sinal) {
        // ^ Sinal - devolve um objeto que permite realizar uma série de operações seguindo o padrão REST
        
        var hand = '';

        hand.maoDireita = '';

        hand.maoEsquerda = '';

        $scope.hand = '';

        maoDireita = '';

        maoEsquerda = '';

        // $scope.hand.maoDireita.d1 = '';

        var maoID = '';

        var mapearTipoOsso = ["Metacarpal", "Falange proximal", "Falange intermediária", "Falange distal"];

        var mapearTipoDedo = ["Polegar", "Dedo indicador", "Dedo do meio", "Dedo anelar", "Dedo mindinho"];

        if ($routeParams.sinalId) {
            Sinal.get({id: $routeParams.sinalId}, 
                function(sinal) {
                    $scope.sinal = sinal;
                },
                function(erro) {
                    $scope.mensagem =  {texto: 'Erro'};
                }
                );
        } else {
            $scope.hand = new Sinal();
        }

        var controllerOptions = { enableGestures: true };

        // metódo que inicia a leitura através do Leap Motion
        Leap.loop(controllerOptions, function(frame) {
            if (frame.hands.length > 0) {
                for (var i = 0; i < frame.hands.length; i++) {
                    hand = frame.hands[i];
                    if (hand.type == 'left') {
                        hand.maoEsquerda = hand;
                    } else {
                        hand.maoDireita = hand;
                        // console.log(hand.maoDireita);
                    }
                }
            }
        });

        // Função que captura o sinal 
        $scope.capturar = function() {
            console.log('capturar');
            if (hand.maoDireita != null) {
             maoDireita.distanciaPolegar = convertToEuclidenDistance(hand.maoDireita.palmPosition, hand.maoDireita.fingers[0].dipPosition).toFixed(2);
             maoDireita.distanciaIndicador = convertToEuclidenDistance(hand.maoDireita.palmPosition, hand.maoDireita.fingers[1].dipPosition).toFixed(2);
             maoDireita.distanciaMedio = convertToEuclidenDistance(hand.maoDireita.palmPosition, hand.maoDireita.fingers[2].dipPosition).toFixed(2);
             maoDireita.distanciaAnelar = convertToEuclidenDistance(hand.maoDireita.palmPosition, hand.maoDireita.fingers[3].dipPosition).toFixed(2);
             maoDireita.distanciaMindinho = convertToEuclidenDistance(hand.maoDireita.palmPosition, hand.maoDireita.fingers[4].dipPosition).toFixed(2);
             maoDireita.distanciaMindinhoAnelar = convertToEuclidenDistance(hand.maoDireita.fingers[4].dipPosition, hand.maoDireita.fingers[3].dipPosition).toFixed(2);
             maoDireita.distanciaAnelarMedio = convertToEuclidenDistance(hand.maoDireita.fingers[3].dipPosition, hand.maoDireita.fingers[2].dipPosition).toFixed(2);
             maoDireita.distanciaMedioIndicador = convertToEuclidenDistance(hand.maoDireita.fingers[2].dipPosition, hand.maoDireita.fingers[1].dipPosition).toFixed(2);
             $scope.hand.direita = maoDireita;
             console.log(maoDireita.distanciaPolegar);

         };

         if (hand.maoEsquerda != null) {
            maoEsquerda.distanciaPolegar = convertToEuclidenDistance(hand.maoEsquerda.palmPosition, hand.maoEsquerda.fingers[0].dipPosition).toFixed(2);
            maoEsquerda.distanciaIndicador = convertToEuclidenDistance(hand.maoEsquerda.palmPosition, hand.maoEsquerda.fingers[1].dipPosition).toFixed(2);
            maoEsquerda.distanciaMedio = convertToEuclidenDistance(hand.maoEsquerda.palmPosition, hand.maoEsquerda.fingers[2].dipPosition).toFixed(2);
            maoEsquerda.distanciaAnelar = convertToEuclidenDistance(hand.maoEsquerda.palmPosition, hand.maoEsquerda.fingers[3].dipPosition).toFixed(2);
            maoEsquerda.distanciaMindinho = convertToEuclidenDistance(hand.maoEsquerda.palmPosition, hand.maoEsquerda.fingers[4].dipPosition).toFixed(2);
            maoEsquerda.distanciaMindinhoAnelar = convertToEuclidenDistance(hand.maoEsquerda.fingers[4].dipPosition, hand.maoEsquerda.fingers[3].dipPosition).toFixed(2);
            maoEsquerda.distanciaAnelarMedio = convertToEuclidenDistance(hand.maoEsquerda.fingers[3].dipPosition, hand.maoEsquerda.fingers[2].dipPosition).toFixed(2);
            maoEsquerda.distanciaMedioIndicador = convertToEuclidenDistance(hand.maoEsquerda.fingers[2].dipPosition, hand.maoEsquerda.fingers[1].dipPosition).toFixed(2);
            $scope.hand.esquerda = maoEsquerda;
        };
    };

        // Função que salva o sinal
        $scope.salvaSinal = function() {
            $scope.hand.$save()
            .then(function(){
                $scope.mensagem = {texto: 'Salvo com sucesso!'};
                $scope.sinal = new Sinal();
                console.log('salvaSinal');
            })
            .catch(function(erro) {
                $scope.mensagem = {texto: 'Erro ao salvar!'};
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

function convertToEuclidenDistance(vector1, vector2) {
    return Math.sqrt(Math.pow((vector1[0] - vector2[0]), 2) + Math.pow((vector1[1] - vector2[1]), 2) + Math.pow((vector1[2] - vector2[2]), 2));
}

