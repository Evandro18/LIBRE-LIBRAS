// Schema - define a estrutura de qualquer documento que será armazenado em uma collection do MongoDB
// Quando adicionamos um documento ao mesmo tempo em que esta-mos criando uma collection

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function() {
    var schema = mongoose.Schema({
        maos: [{
            distancias: {
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
            },

            angulos: {
                yaw: {
                    type: Number
                },
                pitch: {
                    type: Number
                },
                roll: {
                    type: Number
                }
            },

            lado: {
                type: String
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