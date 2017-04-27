module.exports = function(app) {
	var Sinal = app.models.sinal;
	var controller = {}; 
	controller.salvaSinal = function(req, res) {
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
}