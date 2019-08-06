const fs        = require('fs');
const path      = require('path');
const express   = require('express');
const recursive = require("recursive-readdir");
const router    = express.Router();
const config    = require('../../config.json');

let images     = [];
let sprites    = [];
let animations = [];
let tilesheets = [];
let sounds     = [];

recursive("../assets/images", (err, files) => {
  images = files.filter((file) => {
    return ['.DS_Store', '.gitKeep'].indexOf(file.substring(file.lastIndexOf('/')+1)) === -1;
  }).map((file) => file.slice(17));
});

recursive("../assets/sprites", (err, files) => {
  sprites = files.filter((file) => {
    if (file.slice(-5) === ".json") return;
    return ['.DS_Store', '.gitKeep'].indexOf(file.substring(file.lastIndexOf('/')+1)) === -1;
  }).map((file) => file.slice(18));
});

recursive("../assets/animations", (err, files) => {
  animations = files.filter((file) => {
    if (file.slice(-5) === ".json") return;
    return ['.DS_Store', '.gitKeep'].indexOf(file.substring(file.lastIndexOf('/')+1)) === -1;
  }).map((file) => file.slice(21));
});

recursive("../assets/tilesheets", (err, files) => {
  tilesheets = files.filter((file) => {
    if (file.slice(-5) === ".json") return;
    return ['.DS_Store', '.gitKeep'].indexOf(file.substring(file.lastIndexOf('/')+1)) === -1;
  }).map((file) => file.slice(21));
});

recursive("../assets/sounds", (err, files) => {
  sounds = files.filter((file) => {
    if (file.slice(-5) === ".json") return;
    return ['.DS_Store', '.gitKeep'].indexOf(file.substring(file.lastIndexOf('/')+1)) === -1;
  }).map((file) => file.slice(17));
});

router.get('/', (req, res, next) => {
  res.render('index', {title: config.name});
});

router.get('/scenes/load.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'Client', 'builtin', 'load.js'));
});

router.get('/scenes/input.js', (req, res, next) => {
  if (fs.existsSync(path.join(__dirname, '..', '..', 'scenes', 'input.js'))) {
    res.sendFile(path.join(__dirname, '..', '..', 'scenes', 'input.js'));
  } else {
    res.sendFile(path.join(__dirname, '..', '..', 'Client', 'builtin', 'input.js'));
  }
});

router.get('/scenes/error.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'Client', 'builtin', 'error.js'));
});

router.get('/assets.manifest', (req, res, next) => {
  res.send({images, sprites, animations, tilesheets, sounds});
});

router.get('/css/font.css', (req, res, next) => {
  let font = "";
  config.fonts.forEach((item) => {
    if (item.name === null) return;
    font += `@font-face {
  font-family: "${item.name}";
  src: url("../fonts/${item.src}") format("truetype");
  font-weight: normal;
  font-style: normal;
}
`;
  });

  res.contentType('text/css');
  res.send(font);
});

router.get('/config', (req, res, next) => {
  res.send({
    debug: config.debug,
    defaultFont: (config.fonts === undefined || config.fonts.length === 0 || config.fonts[0].name === null) ? "Arial" : config.fonts[0].name,
    multiplier: config.multiplier,
    tilesize: config.tilesize,
    quadrantsize: config.quadrantsize
  });
});

module.exports = router;
