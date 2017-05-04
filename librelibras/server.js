// Require - função: carregar os módulos de que precisamos em nosso script
// createServer - Aqui entra o Express com os seus middlewares

var http = require('http');
var app = require('./config/express')();
require('./config/database.js')('mongodb://localhost/librelibras');

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server escutando na porta ' +  app.get('port'));
});

