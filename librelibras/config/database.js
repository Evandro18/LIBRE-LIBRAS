var mongoose = require('mongoose');
module.exports = function(uri) {
	mongoose.connect(uri);

	// Avisa que o mongo está conectado
	mongoose.connection.on('connected', function() {
		console.log('Mongoose conectado: ' + uri); // mostra na tela a mensagem de "Connected"

	});

	// Função que imprime erro de conexão e mostra o caminho onde ocorre o erro
	mongoose.connection.on('Error', function(erro) {
		console.log('Mongoose - Erro na conexão: ' + uri);
	});

	mongoose.connection.on('disconnected', function(){
		console.log('Mongoose desconectado: ' + uri);
	})

	// Função que imprime quando o servidor for encerrado
	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose desconectado pelo término da aplicação!');
			process.exit(0);
		});

	});
	mongoose.set('debug', true);
}