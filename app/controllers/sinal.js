const similarity = require('compute-cosine-similarity');
const euclidian = require('euclidean-distance')
module.exports = function(app) {
    var Sinal = app.models.sinal;
    var controller = {};

    controller.salvaSinal = function(req, res) {
        var id = req.body._id;
        if (!id) {
            Sinal.create(req.body)
                .then(
                    function(sinal) {
                        res.json(sinal);
                    },
                    function(erro) {
                        console.log(erro);
                        res.status(500).json(erro);
                    });
        } else {
            Sinal.findByIdAndUpdate(id, req.body)
                .then(
                    function(sinal) {
                        console.log('Atualizado com sucesso')
                    },
                    function(erro) {
                        console.log(erro);
                        res.status(500).json(erro);
                    });
        }
    }

    controller.buscaPorId = function(req, res) {
        var id = req.params.id;
        Sinal.findById(id).exec()
            .then(function(sinal) {
                res.json(sinal);
            }, function(erro) {
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
                    console.log(erro);
                    res.status(500).json(erro);
                });
    }

    controller.remove = function(req, res) {
        Sinal.remove({ _id: req.params.id }).exec()
            .then(function() {
                    res.status(200).json({ mensagem: 'Removido com sucesso' });
                },
                function(erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                })
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
    var criaVetoresBanco = function(sinalBanco, lado) {

        distancias = [];
        angulos = [];

        var filtraLadoMao = function() {
            return sinalBanco.maos.filter((mao) => {
                return mao.lado === lado
            })
        }

        var pegaDistancias = function(mao) {
            if (mao) {
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
            } else {
                console.log('Mão não encontrada')
            }
        }

        sinalBanco.maos.forEach(function(mao) {
            pegaDistancias(mao)
        });

        return { distancias: distancias, angulos: angulos };
    }


    var executaCalculos = function(nomeSinal, distanciasCliente, angulosCliente, distanciasBanco, angulosBanco) {
        var distancia = euclidian(distanciasCliente, distanciasBanco);
        // var distancia = similarity(distanciasCliente, distanciasBanco);
        var angulo = euclidian(angulosCliente, angulosBanco);
        // var angulo = similarity(angulosCliente, angulosBanco);

        var distanciaTotal = ((distancia * 0.7) + (angulo * 0.3));

        var elemento = {
            distancia: distanciaTotal,
            sinal: nomeSinal,
            angulosB: angulosBanco,
            angulosC: angulosCliente
        };
        return elemento;
    }

    var ordenaVetor = function(vetor) {
        return vetor.sort(function(a, b) {
            //ordenação para Euclidian
            return a.distancia - b.distancia;
            //ordenação para Cosseno
            // return b.distancia - a.distancia;
        });
    }

    var log = function(vetor) {
        // vetor.forEach(function(elemento) {
        //     console.log("Nome: " + elemento.sinal + ": " + elemento.distancia);
        // });
        console.log(vetor[0].sinal);
        console.log(vetor[0].angulosB);
        console.log(vetor[0].angulosC);
        console.log("Total de sinais comparados: " + vetor.length);
    }

    buscaMaoPadrao = function() {
        return Sinal.findOne({ nomeSinal: 'Mão padão' }).exec()
    }

    var regra = function(item1, item2) {
            return ((item2 * 100) / item1);
        }
        //A normalização tem de ser feita no cadastro do sinal
    var normaliza = function(vetorSerPadronizado) {
        var maoPadrao = buscaMaoPadrao()
        var vetorPadrao = criaVetoresBanco(maoPadrao);
        var padronizado = []
        for (i = 0; i < vetor.length; i++) {
            padronizado.push(regra(vetorPadrao[i], vetorSerPadronizado[i]));
        }

        return novo;
    }

    controller.comparaSinal = function(req, res) {
        var sinalCliente = req.body;
        console.log(sinalCliente)
        const lado = sinalCliente.maos.length < 2 ? sinalCliente.maos[0].lado : undefined;

        Sinal.find().exec()
            .then(function(sinais) {

                    var vetorDistancias = new Array();

                    vetoresCliente = criaVetoresCliente(sinalCliente);
                    var distanciasCliente = vetoresCliente.distancias;
                    var angulosCliente = vetoresCliente.angulos;


                    var criaVetorDistancias = function(sinal) {
                        var vetoresBanco = criaVetoresBanco(sinal, lado)
                        var distanciasBanco = vetoresBanco.distancias;
                        var angulosBanco = vetoresBanco.angulos;
                        if (distanciasBanco.length == distanciasCliente.length) {
                            vetorDistancias.push(executaCalculos(sinal.nomeSinal, distanciasCliente, angulosCliente, distanciasBanco, angulosBanco));
                        }
                    }

                    sinais.forEach(function(sinal) {
                        if (lado && sinal.maos.length === 1) {
                            if (sinal.maos[0].lado === lado) {
                                criaVetorDistancias(sinal)
                            }
                        } else {
                            criaVetorDistancias(sinal)
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
}