// Controller faz ligação entre a página (view) e os dados (model)
// Exports é uma função que ao ser chamada retornará uma instância do Express
var similarity = require('compute-cosine-similarity');
var euclidian = require('euclidean-distance')

module.exports = function(app) {
    var Sinal = app.models.sinal;
    var controller = {};

    controller.salvaSinal = function(req, res) {
        console.log(req.body);
        Sinal.create(req.body)
            .then(
                function(sinal) {
                    res.json(sinal);
                },
                function(erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                });
    }

    controller.listaSinais = function(req, res) {
        Sinal.find().exec()
            .then(function(sinais) {
                    res.json(sinais);
                },
                function(erro) {
                    res.status(git500).json(erro);
                    console.log('Erro');
                });
    }

    controller.comparaSinal = function(req, res) {
        var dados = req.body;
        Sinal.find().exec()
            .then(function(sinais) {
                    //****************************************
                    //TODO: Alterar metodo para comparar duas mãos
                    var vetorDistancias = new Array();
                    var distanciasCliente = new Array();
                    var distanciasBanco = new Array();

                    var listaPropriedades = ['yaw', 'roll', 'pitch', 'distPolegar', 'distIndicador', 'distMedio', 'distAnelar', 'distMindinho', 'distMindinhoAnelar', 'distAnelarMedio', 'distMedioIndicador'];
                    dados.maos.forEach(function(mao) {
                        for (chave in mao) {
                            distanciasCliente.push(mao[chave]);
                        }
                    });

                    sinais.forEach(function(sinal) {
                        count = 0;
                        sinal.maos.forEach(function(mao) {
                            for (chave of listaPropriedades) {
                                distanciasBanco.push(mao[chave]);
                            }
                        });
                        count = 0;
                        console.log("Qtd banco: " + distanciasBanco.length + " qtd Cliente: " + distanciasCliente.length);
                        if (distanciasBanco.length == distanciasCliente.length) {
                            var distancia = euclidian(distanciasCliente, distanciasBanco);
                            console.log(distancia);
                            distanciasBanco = [];
                            var elemento = {
                                distancia: distancia,
                                sinal: sinal
                            };
                            vetorDistancias.push(elemento);
                        }
                    });
                    distanciasCliente = [];

                    vetorDistancias.sort(function(a, b) {
                        return a.distancia - b.distancia;
                    });

                    vetorDistancias.forEach(function(elemento) {

                        console.log("Nome: " + elemento.sinal.nomeSinal + ": " + elemento.distancia);

                    });
                    res.send(vetorDistancias[0].sinal);
                    //****************************************
                },
                function(erro) {
                    res.status(500).json(erro);
                    console.log('Erro');
                });
    }
    return controller;
};