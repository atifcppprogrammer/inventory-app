const helpers = require('./helpers');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const genres = await helpers.getGenre();
  const template = genres.length > 0 ? 'index' : 'noAnimeAvailable';
  const populateWith = genres.length == 0 ? {} : {
    title:'Index', genres, ...helpers.getClientSideResourcesFor(template)
  };
  res.render(template, populateWith);
});

module.exports = router;
