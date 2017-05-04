var mongoose = require('mongoose');
module.exports = function(uri) {

	// Avisa que o mongo está conectado
	mongoose.connection.on('connected', function() {
		console.log(uri); // mostra na tela a mensagem de "Connected"

	});

	// Função que imprime erro de conexão e mostra o caminho onde ocorre o erro
	mongoose.connection.on('Error', function(erro) {
		console.log('Mongoose. Erro na conexão: ' + uri);
	});

	// Função que imprime quando o servidor for encerrado
	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose desconectado pelo término da aplicação');
			process.exit(0);
		});
	});
}