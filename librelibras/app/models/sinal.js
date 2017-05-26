// Schema - define a estrutura de qualquer documento que será armazenado em uma collection do MongoDB
// Quando adicionamos um documento ao mesmo tempo em que esta-mos criando uma collection

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function() {
    var schema = mongoose.Schema({
        maos: [{
            yaw: {
                type: Number
            },
            roll: {
                type: Number
            },
            pitch: {
                type: Number
            },
            distPolegar: {
                type: Number
            },
            distIndicador: {
                type: Number
            },
            distMedio: {
                type: Number
            },
            distAnelar: {
                type: Number
            },
            distMindinho: {
                type: Number
            },
            distMindinhoAnelar: {
                type: Number
            },
            distAnelarMedio: {
                type: Number
            },
            distMedioIndicador: {
                type: Number
            }
        }],
        nomeSinal: {
            type: String,
            index: {
                unique: true
            }
        }

    });
    // Retorna o sinal do banco de dados
    return mongoose.model('Sinal', schema, 'sinais');
}