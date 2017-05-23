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
                    var vetorDistancias = new Array();
                    sinais.forEach(function(sinal) {
                        var distancia = euclidian(dados.mao[0].distancias, sinal.mao[0].distancias);
                        var distanciaAngulos = euclidian(dados.mao[0].angulos, sinal.mao[0].angulos);

                        var elemento = {
                            distancia: distancia,
                            angulos: distanciaAngulos,
                            sinal: sinal
                        };
                        vetorDistancias.push(elemento);
                    });

                    vetorDistancias.sort(function(a, b) {
                        return a.distancia - b.distancia;
                    });

                    vetorDistancias.forEach(function(elemento) {

                        console.log("Nome: " + elemento.sinal.nomeSinal + ": " + elemento.distancia + " " + elemento.angulos);

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