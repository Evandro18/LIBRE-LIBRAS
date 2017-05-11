// Controller faz ligação entre a página (view) e os dados (model)
// Exports é uma função que ao ser chamada retornará uma instância do Express

module.exports = function(app) {
    var Sinal = app.models.sinal;
    var controller = {};

    controller.salvaSinal = function(req, res) {
        console.log('Salvando');
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

    var sinaisList = [];

    controller.listaSinais = function(req, res) {
        Sinal.find().exec()
            .then(function(sinais) {
                    sinaisList.push(sinais);
                    res.json(sinais);
                },
                function(erro) {
                    res.status(500).json(erro);
                    console.log('Erro');
                });
    }

    controller.comparaSinal = function(req, res) {
        console.log(sinaisList);
    }

    return controller;
};