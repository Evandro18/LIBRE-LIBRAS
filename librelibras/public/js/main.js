angular.module('librelibras', ['ngRoute', 'ngResource'])
    .config(function($routeProvider){
        $routeProvider.when('/sinal',{
            templateUrl: 'partials/sinal.html',
            controller: 'SinalController'
        });
    });
