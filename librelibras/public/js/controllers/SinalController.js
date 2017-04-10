angular.module('librelibras').controller('SinalController',
function($scope, $resource) {
    var Sinal = $resource('/sinais/:id');
    $scope.salvar = function() {
            console.log("Funcionando!");
    };
});
