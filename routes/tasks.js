'use strict';
var express = require('express');
var gmailHelper = require('../gmailHelper');
var router = express.Router();

router.get('/receipts', function (req, res) {
  gmailHelper.retrieveMail('client_secret.json')
    .then(function (receipts) {
      res.send(receipts);
    });
});

module.exports = router;