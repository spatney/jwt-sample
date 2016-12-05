var tok;

function connect_socket(token) {
    tok = token;
    var socket = io.connect('', {
        query: 'token=' + token
    });

    socket.on('connect', function () {
        console.log('authenticated');
        document.getElementById('status').innerHTML = "authenticated"

        fetch('/say', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tok
            },
        })
    }).on('disconnect', function () {
        console.log('disconnected');
        document.getElementById('status').innerHTML = "disconnected"
    });
}

function start() {
    document.getElementById('status').innerHTML = "sigining in ... "
    var user = {
        email: 'spatney@microsoft.com',
        password: 'pass'
    }

    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(function (res) { return res.json(); })
        .then(function (result) {
            connect_socket(result.token);
        });
}
