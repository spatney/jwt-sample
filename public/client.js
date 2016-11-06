function connect_socket(token) {
    var socket = io.connect('', {
        query: 'token=' + token
    });

    socket.on('connect', function () {
        console.log('authenticated');
    }).on('disconnect', function () {
        console.log('disconnected');
    });
}

function start() {
    var user = {
        email: 'spatney@microsoft.com',
        password: 'pass'
    }

    var data = new FormData();
    data.append("json", JSON.stringify(user));
    window.fetch('/login', {
        method: 'POST',
        body: data
    })
        .then(function (res) { return res.json(); })
        .then(function (result) {
            connect_socket(result.token);
        });
}
