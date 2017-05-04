// Schema - define a estrutura de qualquer documento que será armazenado em uma collection do MongoDB
// Quando adicionamos um documento ao mesmo tempo em que esta-mos criando uma collection

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = function() {
	var schema = mongoose.Schema({
		mao: {
			type: String
		},
		distanciaPolegar: {
			type: Number
		},
		distanciaIndicador: {
			type: Number
		},
		distanciaMedio: {
			type: Number
		},
		distanciaAnelar: {
			type: Number
		},
		distanciaMindinho: {
			type: Number
		},
		distanciaMindinhoAnelar: {
			type: Number
		},
		distanciaAnelarMedio: {
			type: Number
		},
		distanciaMedioIndicador: {
			type: Number
		}
	});
	
	// Retorna o sinal do banco de dados
	return mongoose.model('Sinal', schema);
}
