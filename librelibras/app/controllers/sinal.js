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
        Sinal.findOne().exec()
            .then(function(sinais) {
                    var similaridade = similarity(dados.distancias, sinais.distancias);
                    console.log("Coseno: " + similaridade);
                    console.log("Euclidiana: " + euclidian(dados.distancias, sinais.distancias));
                    res.json(similaridade);
                },
                function(erro) {
                    res.status(500).json(erro);
                    console.log('Erro');
                });
    }

    return controller;
};