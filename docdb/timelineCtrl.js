var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var TimelineEntry = require('./timeline');

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
var timelineEntry = new TimelineEntry(docDbClient, config.databaseId, config.collectionId);
timelineEntry.init(function (e, d) {
    timelineEntry.getItem('7a6b6e9e-1a24-4899-e6dc-285524bf7e49', function(e, d){
        console.log(d);
    })
});