const mongoClient = require('mongodb').MongoClient;

const connectionString = 'mongodb://localhost:27017' || process.env.mongoConnectionString;

const animesCollectionName = 'animes';
const genresCollectionName = 'genres';
const dbName = 'inventoryDB';

const makeConnection = async () => {
  const options = { 'useUnifiedTopology':true };
  const client = await mongoClient.connect(connectionString, options);
  const db = client.db(dbName);
  exports.genres = db.collection(genresCollectionName);
  exports.animes = db.collection(animesCollectionName);
}

exports.connection = makeConnection();
exports.genres = undefined;
exports.animes = undefined;

