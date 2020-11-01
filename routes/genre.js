const helpers = require('./helpers');
const express = require('express');
const router = express.Router();

router.get('/view/:name', async (req, res, next) => {
  const { name } = req.params, template = 'viewGenre';
  const animes = await helpers.getAnime(name);
  res.render(template, {
    title:'View Genre', animes, 
    ...helpers.getClientSideResourcesFor(template)
  });
});

router.get('/delete/:name', async (req, res, next) => {
  const { name } = req.params, template = 'deleteGenreOrAnime';
  const genre = (await helpers.getGenre(name)).pop();
  res.render(template, {
    title:'Delete Genre', 'collection': 'genre', name,
    ...helpers.getClientSideResourcesFor(template)
  });
})

router.get('/update/:name', async (req, res, next) => {
  const { name } = req.params, template = 'addOrUpdateGenre';
  const genre = (await helpers.getGenre(name)).pop();
  res.render(template, {
    title:'Update Genre', message:`update genre ${name}`, genre,
    ...helpers.getClientSideResourcesFor(template)
  });
});

router.get('/add', async (req, res, next) => {
  const template = 'addOrUpdateGenre';
  res.render(template, { 
    title:'Add Genre', message:'add new genre', data:{},
    ...helpers.getClientSideResourcesFor(template)
  });
});

module.exports = router;
