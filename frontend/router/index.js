const express = require('express');
const router = express.Router();
const {logErrors} = require('./../../src/middlewares/error.handler');

router.get('/',
    logErrors, 
    (req, res) => {
  res.render('index', { title: 'First Web Node' });
});
