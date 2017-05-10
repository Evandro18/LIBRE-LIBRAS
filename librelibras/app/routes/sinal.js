// Route - identificador da rota
// Método do protocolo http para salvar

module.exports = function(app) {
    var controller = app.controllers.sinal;
    app.route('/sinal')
        .post(controller.salvaSinal)
        .get(controller.listaSinais);

    app.route('/sinal/:id')
}