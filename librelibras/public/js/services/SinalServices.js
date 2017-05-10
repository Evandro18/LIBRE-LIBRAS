angular.module('librelibras').factory('Sinal',

    // Service é ligação entre cliente-servidor através da url
    function($resource) {
        return $resource('/sinal/:id', null, {
            'compara': { method: 'PUT', params: { compara: true } }
        });
    });