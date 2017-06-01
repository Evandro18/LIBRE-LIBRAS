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
                    console.log('comparando');
                    var texto = '';
                    var vetorDistancias = new Array();
                    var distanciasCliente = new Array();
                    var angulosCliente = new Array();
                    var angulosBanco = new Array();
                    var distanciasBanco = new Array();

                    var listaPropriedades = ['distPolegar', 'distIndicador', 'distMedio', 'distAnelar', 'distMindinho', 'distMindinhoAnelar', 'distAnelarMedio', 'distMedioIndicador'];
                    dados.maos.forEach(function(mao) {
                        for (var distancia in mao.distancias) {
                            distanciasCliente.push(mao.distancias[distancia]);
                        }

                        for (var angulo in mao.angulos) {
                            angulosCliente.push(mao.angulos[angulo]);
                        }
                    });
                    sinais.forEach(function(sinal) {
                        count = 0;
                        sinal.maos.forEach(function(mao) {
                            distanciasBanco.push(mao.distancias.distPolegar);
                            distanciasBanco.push(mao.distancias.distIndicador);
                            distanciasBanco.push(mao.distancias.distMedio);
                            distanciasBanco.push(mao.distancias.distAnelar);
                            distanciasBanco.push(mao.distancias.distMindinho);
                            distanciasBanco.push(mao.distancias.distMindinhoAnelar);
                            distanciasBanco.push(mao.distancias.distAnelarMedio);
                            distanciasBanco.push(mao.distancias.distMedioIndicador);
                            angulosBanco.push(mao.angulos.yaw);
                            angulosBanco.push(mao.angulos.roll);
                            angulosBanco.push(mao.angulos.pitch);
                        });

                        count = 0;
                        if (distanciasBanco.length === distanciasCliente.length) {
                            var distancia = euclidian(distanciasCliente, distanciasBanco);
                            var angulo = euclidian(angulosCliente, angulosBanco);

                            var distanciaTotal = ((distancia * 0.7) + (angulo * 0.3));

                            var elemento = {
                                distancia: distanciaTotal,
                                sinal: sinal
                            };
                            vetorDistancias.push(elemento);

                        }
                        distanciasBanco = [];
                        angulosBanco = [];
                    });
                    distanciasCliente = [];
                    angulosCliente = [];

                    //ordenação
                    vetorDistancias.sort(function(a, b) {
                        return a.distancia - b.distancia;
                    });

                    vetorDistancias.forEach(function(elemento) {
                        console.log("Nome: " + elemento.sinal.nomeSinal + ": " + elemento.distancia);
                    });
                    console.log("Total de sinais: " + sinais.length);
                    res.json(vetorDistancias[0]);
                    //****************************************
                },
                function(erro) {
                    res.status(500).json(erro);
                    console.log('Erro');
                });
    }
    return controller;
};