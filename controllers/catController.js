"use strict";
// catController
const catModel = require("../models/catModel");
const { validationResult } = require("express-validator");
const resize = require("../utils/resize.js");
const imageMeta = require("../utils/imageMeta");

const cat_create_post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ errors: errors.array() });
  } else {
    try {
      // create thumbnails
      const thumb = await resize.makeThumbnail(
        req.file.path,
        "thumbnails/" + req.file.filename,
        { width: 160, height: 160 }
      );
      const coords = await imageMeta.getCoordinates(req.file.path);
      console.log("thumb", thumb);
      const params = [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.owner,
        req.file.filename,
        coords
      ];
      const result = await catModel.addCat(params);
      await res.json({message: "upload ok"});
    } catch (e) {
      console.log("exif error", e);
      res.status(400).json({ message: "error" });
    }
  }
};

const cat_update_put = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({ errors: errors.array() });
  } else {
    const params = [
      req.body.name,
      req.body.age,
      req.body.weight,
      req.body.owner,
      req.body.id
    ];
    const result = await catModel.updateCat(params);
    await res.json(result);
  }
};

const cat_delete = async (req, res) => {
  const params = [req.params.id];
  const result = await catModel.deleteCat(params);
  await res.json(result);
};

const cat_get = async (req, res) => {
  const cat = await catModel.getCat(req.params.id);
  await res.json(cat[0]);
};

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  await res.json(cats);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_create_post,
  cat_update_put,
  cat_delete
};
