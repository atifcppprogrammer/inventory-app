const db = require('./../models/db');
const express = require('express');
const router = express.Router();

const messages = {
  'authenticationError':'Cannot perform given operation, incorrect password given !!',
  'requestSuccessful':'Request completed successfully !!!'
}

const password = "atifcppprogrammer" || process.env.administratorPassword;
const successful = messages.requestSuccessful;

const prepareResponse = (status, data, message = successful, error = null) => {
  return { status, data, message, error }
}

const prepareUnauthorizedResponse = () => {
  const error = 'authenticationError';
  return prepareResponse('NOT_OK', null, messages[error], error);
}

router.post('/update_anime.json', async (req, res) => {
  if (req.body.password !== password){
    res.status(401).json(prepareUnauthorizedResponse());
    return;
  }
  const { name, doc } = req.body;
  const data = await db.animes.updateOne({ name }, { $set:doc });
  res.json(prepareResponse('OK', {
    'animeUpdated':data.modifiedCount
  }));
});

router.post('/update_genre.json', async (req, res) => {
  if (req.body.password !== password){
    res.status(401).json(prepareUnauthorizedResponse());
    return;
  }
  const { name, doc } = req.body;
  const updateGenre = { $set:doc };
  const updateAnime = { $set:{ genre:doc.name }};
  const dataGenre = await db.genres.updateOne({ name }, updateGenre);
  const dataAnime = await db.animes.updateMany({ genre:name }, updateAnime);
  res.json(prepareResponse('OK', {
    'animeUpdated':dataAnime.modifiedCount,
    'genreUpdated':dataGenre.modifiedCount
  }));
});

router.post('/add_anime.json', async (req, res) => {
  if (req.body.password !== password){
    res.status(401).json(prepareUnauthorizedResponse());
    return;
  }
  const { doc } = req.body;
  const data = await db.animes.insertOne(doc);
  res.json(prepareResponse('OK', {
    'animeInserted':data.insertedCount
  }));
});

router.post('/add_genre.json', async (req, res) => {
  if (req.body.password !== password){
    res.status(401).json(prepareUnauthorizedResponse());
    return;
  }
  const { doc } = req.body;
  const data = await db.genres.insertOne(doc);
  res.json(prepareResponse('OK', {
    'genreInserted':data.insertedCount
  }));
});

router.post('/remove_anime.json', async (req, res) => {
  if (req.body.password !== password){
    res.status(401).json(prepareUnauthorizedResponse());
    return;
  }
  const { name } = req.body;
  const data = await db.animes.deleteOne({ name });
  res.json(prepareResponse('OK', {
    'animeDeleted':data.deletedCount 
  }));
});

router.post('/remove_genre.json', async (req, res) => {
  console.log(req.body.password);
  if (req.body.password !== password){
    res.status(401).json(prepareUnauthorizedResponse());
    return;
  }
  const { name } = req.body;
  const dataGenre = await db.genres.deleteOne({ name });
  const dataAnime = await db.animes.deleteMany({ genre:name });
  res.json(prepareResponse('OK', { 
    'animeDeleted':dataAnime.deletedCount, 
    'genreDeleted':dataGenre.deletedCount
  }));
});

module.exports = router;
