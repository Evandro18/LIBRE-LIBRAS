angular.module('librelibras', ['ngRoute', 'ngResource'])
    // routeProvider - provedor de rota
    .config(function($routeProvider) {
        $routeProvider.when('/sinal', {
            templateUrl: 'partials/sinal.html',
            controller: 'SinalController'
        });
        // provê uma rota de outra forma
        $routeProvider.otherwise({ redirectTo: '/sinal' });
    });