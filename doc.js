var DocumentClient = require('documentdb').DocumentClient;
var host = "";                     // Add your endpoint
var masterKey = "";  // Add the massterkey of the endpoint
var client = new DocumentClient(host, { masterKey: masterKey });
var databaseDefinition = { id: "fishDb" };
var collectionDefinition = { id: "fishCollection" };
var documentDefinition = { id: "doc", content: "Hello World!" };
client.createDatabase(databaseDefinition, function (err, database) {
    if (err) return console.log(err);
    console.log('created db');
    client.createCollection(database._self, collectionDefinition, function (err, collection) {
        if (err) return console.log(err);
        console.log('created collection');
        client.createDocument(collection._self, documentDefinition, function (err, document) {
            if (err) return console.log(err);
            console.log('Created Document with content: ', document.content);
            cleanup(client, database);
        });
    });
});
function cleanup(client, database) {
    client.deleteDatabase(database._self, function (err) {
        if (err) console.log(err);
    })
}