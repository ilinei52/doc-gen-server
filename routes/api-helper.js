const express = require('express');
const router = express.Router();

const api = require("../modules/api");

/* API helper */
router.get('/api-helper/template/upload', function (req, res, next) {
    res.render('apiHelper/UploadTemplate', {
        title: 'Helper - /template/upload'
    });
});

module.exports = router;
