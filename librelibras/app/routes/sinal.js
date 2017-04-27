module.exports = function(app) {
    var controller = app.controllers.contato;
	app.route('/sinal')
		.post(controller.salvaSinal);    
}
