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

    var criaVetoresCliente = function(sinalCliente) {
        distancias = [];
        angulos = [];
        sinalCliente.maos.forEach(function(mao) {
            for (var distancia in mao.distancias) {
                distancias.push(mao.distancias[distancia]);
            }

            for (var angulo in mao.angulos) {
                angulos.push(mao.angulos[angulo]);
            }
        });

        return { distancias: distancias, angulos: angulos };;
    }

    var criaVetoresBanco = function(sinalBanco) {
        distancias = [];
        angulos = [];
        sinalBanco.maos.forEach(function(mao) {
            distancias.push(mao.distancias.distPolegar);
            distancias.push(mao.distancias.distIndicador);
            distancias.push(mao.distancias.distMedio);
            distancias.push(mao.distancias.distAnelar);
            distancias.push(mao.distancias.distMindinho);
            distancias.push(mao.distancias.distMindinhoAnelar);
            distancias.push(mao.distancias.distAnelarMedio);
            distancias.push(mao.distancias.distMedioIndicador);
            angulos.push(mao.angulos.yaw);
            angulos.push(mao.angulos.roll);
            angulos.push(mao.angulos.pitch);
        });
        return { distancias: distancias, angulos: angulos };
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

                    vetoresCliente = criaVetoresCliente(dados);
                    distanciasCliente = vetoresCliente.distancias;
                    angulosCliente = vetoresCliente.angulos;
                    sinais.forEach(function(sinal) {

                        vetoresBanco = criaVetoresBanco(sinal);
                        distanciasBanco = vetoresBanco.distancias;
                        angulosBanco = vetoresBanco.angulos;

                        if (distanciasBanco.length == distanciasCliente.length) {
                            var distancia = euclidian(distanciasCliente, distanciasBanco);
                            var angulo = euclidian(angulosCliente, angulosBanco);

                            var distanciaTotal = ((distancia * 0.7) + (angulo * 0.3));

                            var elemento = {
                                distancia: distanciaTotal,
                                sinal: sinal.nomeSinal
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
                        console.log("Nome: " + elemento.sinal + ": " + elemento.distancia);
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