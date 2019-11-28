'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => { // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  // TODO: use sharp to create a png thumbnail of 160x160px, use async await
  const result = await sharp(file).
    resize(160, 160).trimpng().
    toFile('thumbnails/' + thumbname);
  return result;
};

module.exports = {
  makeThumbnail,
};