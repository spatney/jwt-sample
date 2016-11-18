var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var socketioJwt = require("socketio-jwt");
var jwt = require('jsonwebtoken');
var SUPER_SECRET_KEY = "TEAVANA";
var port = process.env.port || 1337
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.post('/login', function (req, res) {
    console.log(req.body);
    var profile = {
        name: 'John',
        surname: 'Doe',
        email: req.body.email,
        id: 1
    };
    res.json({
        token: jwt.sign(profile, SUPER_SECRET_KEY, {
            expiresIn: 60 * 5
        })
    });
});

app.get('/DoSomething', function (req, res) {
    var r = {
        reply: 'reply'
    }
    var t = req.headers['authorization'];
    if (t) {
        t = t.replace('Bearer ', '');
    }


    res.json(require('jwt-decode')(t))

})

io.use(socketioJwt.authorize({
    secret: SUPER_SECRET_KEY,
    handshake: true
}));

io.on('connection', function (socket) {
    console.log('hello! ', socket.decoded_token.email);

})

server.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


