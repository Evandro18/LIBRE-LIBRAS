var mongoose = require('mongoose');
module.exports = function(uri) {

	// avisa que o mongo está conectado
	mongoose.connect.on('Connected', function () {
		console.log(uri); // mostra na tela a mensagem de "Connected"

	});

	// Função que imprime erro de conexão, e mostra o caminho onde ocorre o erro
	mongoose.connection.on('Error', function(erro) {
		console.log('Mongoose. Erro na conexão: ' + uri);
	});

	// Função que imprime qando o servidor for encerrado
	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose desconectado pelo término da aplicação');
			process.exit(0);
		});
	});
}