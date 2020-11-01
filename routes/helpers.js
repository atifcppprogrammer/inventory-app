const db = require('./../models/db');

const sanitizeMongoDocument = doc => {
  delete doc._id; return doc;
}

exports.getGenre = (name = '') => { 
  const filter = name  === '' ? { } : { name };
  return db.genres.find(filter).toArray()
    .then(docs => docs.map(doc => sanitizeMongoDocument(doc)));
}

exports.getAnime = (genre, name = '') => { 
  const filter = name === '' ? { genre } : { name };
  return db.animes.find(filter).toArray()
    .then(docs => docs.map(doc => sanitizeMongoDocument(doc)));
}

exports.getClientSideResourcesFor = template => ({
  javascript:template, stylesheet:template
})


