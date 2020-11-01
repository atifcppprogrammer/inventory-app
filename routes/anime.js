const helpers = require('./helpers');
const express = require('express');
const router = express.Router();

router.get('/update/:name', async (req, res, next) => {
  const { name } = req.params, template = 'addOrUpdateAnime';
  const options = await helpers.getGenre();
  const anime = (await helpers.getAnime(null, name)).pop();
  res.render(template, { 
    title:'Update Anime', message:`update anime ${name}`, options,
    anime, ...helpers.getClientSideResourcesFor(template)
  });
});

router.get('/delete/:name', async (req, res, next) => {
  const { name } = req.params, template = 'deleteGenreOrAnime';
  const anime = (await helpers.getAnime(null, name)).pop();
  res.render(template, {
    title:'Delete Anime', collection: 'anime', name,
    ...helpers.getClientSideResourcesFor(template)
  });
});

router.get('/add', async (req, res, next) => {
  const template = 'addOrUpdateAnime';
  const options = await helpers.getGenre();
  res.render(template, {
    title:'Add Anime', message:'add new anime', options, data:{},
    ...helpers.getClientSideResourcesFor(template)
  });
});

module.exports = router;
