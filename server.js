var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var socketioJwt = require("socketio-jwt");
var jwt = require('jsonwebtoken');
var jwtExpress = require('express-jwt');
var bodyParser = require('body-parser');
var unless = require('express-unless');

var SECRET = process.env.SECRET || "TEAVANA";
var port = process.env.port || 1337;

var static = express.static(__dirname + '/public');
static.unless = unless;

app.use(static.unless({ method: 'OPTIONS' }));
app.use(jwtExpress({ secret: SECRET }).unless({ path: ['/login'] }));
app.use(express.static('public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

io.use(socketioJwt.authorize({
    secret: SECRET,
    handshake: true
}));

app.all('/login', function (req, res) {
    console.log(req.body);
    var profile = {
        name: 'John',
        surname: 'Doe',
        email: req.body.email,
        id: 1
    };
    res.json({
        token: jwt.sign(profile, SECRET, {
            expiresIn: 60 * 5
        })
    });
});

app.all('/say', function (req, res) {
    res.json(req.user);
})

io.on('connection', function (socket) {
    console.log('hello! ', socket.decoded_token.email);

})

server.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});