var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var socketioJwt = require("socketio-jwt");
var jwt = require('jsonwebtoken');
var SUPER_SECRET_KEY = "TEAVANA";

app.use(express.static('public'));

app.post('/login', function (req, res) {
    var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
    };
    res.json({ token: jwt.sign(profile, SUPER_SECRET_KEY, { expiresIn: 60 * 5 }) });
})

io.use(socketioJwt.authorize({
    secret: SUPER_SECRET_KEY,
    handshake: true
}));

io.on('connection', function (socket) {
    console.log('hello! ', socket.decoded_token.email);
})

server.listen(9000, function () {
    console.log('listening on http://localhost:9000');
});


