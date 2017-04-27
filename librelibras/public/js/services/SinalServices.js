angular.module('librelibras').factory('Sinal',

	// Service é ligação entre cliente-servidor
	function($resource) {
		return $resource('/sinal'); 
	})