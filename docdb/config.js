var config = {}

config.host = process.env.HOST;
config.authKey = process.env.AUTH_KEY;
config.databaseId = "timeline";
config.collectionId = "entries";

module.exports = config;