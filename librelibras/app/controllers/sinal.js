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

    var executaCalculos = function(nomeSinal, distanciasCliente, angulosCliente, distanciasBanco, angulosBanco) {
        var distancia = euclidian(distanciasCliente, distanciasBanco);
        var angulo = euclidian(angulosCliente, angulosBanco);

        var distanciaTotal = ((distancia * 0.7) + (angulo * 0.3));

        var elemento = {
            distancia: distanciaTotal,
            sinal: nomeSinal
        };
        return elemento;
    }

    var ordenaVetor = function(vetor) {
        return vetor.sort(function(a, b) {
            return a.distancia - b.distancia;
        });
    }

    var log = function(vetor) {
        vetor.forEach(function(elemento) {
            console.log("Nome: " + elemento.sinal + ": " + elemento.distancia);
        });
        console.log("Total de sinais comparados: " + vetor.length);
    }

    controller.comparaSinal = function(req, res) {
        var dados = req.body;
        Sinal.find().exec()
            .then(function(sinais) {

                    var vetorDistancias = new Array();

                    vetoresCliente = criaVetoresCliente(dados);
                    var distanciasCliente = vetoresCliente.distancias;
                    var angulosCliente = vetoresCliente.angulos;

                    sinais.forEach(function(sinal) {

                        vetoresBanco = criaVetoresBanco(sinal);
                        var distanciasBanco = vetoresBanco.distancias;
                        var angulosBanco = vetoresBanco.angulos;

                        if (distanciasBanco.length == distanciasCliente.length) {
                            vetorDistancias.push(executaCalculos(sinal.nomeSinal, distanciasCliente, angulosCliente, distanciasBanco, angulosBanco));
                        }
                    });
                    distanciasCliente = [];
                    angulosCliente = [];

                    ordenaVetor(vetorDistancias);

                    log(vetorDistancias);

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