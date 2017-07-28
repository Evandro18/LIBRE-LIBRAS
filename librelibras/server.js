// Require - função: carregar os módulos de que precisamos em nosso script
// createServer - Aqui entra o Express com os seus middlewares

var http = require('http');
var app = require('./config/express')()
require('./config/database.js')('mongodb://localhost/librelibras2')
    // require('./config/database.js')('mongodb://librelibras:librelibras@ds047732.mlab.com:47732/librelibras');

http.createServer(app).listen(app.get('port'), function() {
    console.log('Servidor Express iniciado na porta ' + app.get('port'));
});