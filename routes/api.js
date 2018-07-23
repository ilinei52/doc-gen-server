const express = require('express');
const router = express.Router();

const api = require("../modules/api");

/**
 * @api {post} /template/upload Upload template
 * @apiName Upload
 * @apiGroup Template
 * @apiVersion 0.0.1  
 * 
 * @apiParam {String} permanent File storage type [false - temporary | true - permanent]
 * 
 * @apiErrorExample {json} Error 400:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": {
 *         "message": "No files were uploaded!"
 *       }
 *     }
 * @apiErrorExample {json} Error 500:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "error": {
 *         "message": "Internal server error!",
 *         "error":{}
 *       }
 *     }
 * @apiExample {curl} Example usage:
 *     Form: http://localhost:3000/api-helper/template/upload
 *     or
 *     Curl: curl -F "permanent=false" -F "fileX=@\Path\to\file\file.txt" http://localhost:3000/template/upload
 * 
 */
router.post('/template/upload', api.templateUpload);

/**
 * @api {get} /template/fill  Fill template {get}
 * @apiName Fill template {get}
 * @apiGroup Template
 * @apiVersion 0.0.1
 * 
 * @apiParam {String} uuid Template uuid
 * @apiParam {String} data  Data
 * 
 * @apiErrorExample {json} Error 400:
 *     HTTP/1.1 400 Not found
 *     {
 *       "error": {
 *         "message": "Bad request! mime-type:   is not supported!",
 *       }
 *     }
 * 
 * @apiErrorExample {json} Error 404:
 *     HTTP/1.1 404 Not found
 *     {
 *       "error": {
 *         "message": "File not found!",
 *       }
 *     }
 * @apiErrorExample {json} Error 500:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "error": {
 *         "message": "Internal server error!",
 *       }
 *     }
 * @apiSampleRequest ../../template/fill
 */
router.get('/template/fill', api.templateFill);

/**
 * @api {post} /template/fill  Fill template {post}
 * @apiName Fill template {post}
 * @apiGroup Template
 * @apiVersion 0.0.1
 * 
 * @apiParam {String} uuid  Template uuid
 * @apiParam {String} data  Data
 * 
 * @apiSampleRequest ../../template/fill
 */
router.post('/template/fill', api.templateFill);


/**
 * @api {post} /doc/convert Convert document
 * @apiName Convert
 * @apiGroup Doc
 * @apiVersion 0.0.1
 * 
 * @apiParam {String} file_guid Template guid
 * @apiParam {String} data  Data
 * 
 * @apiSampleRequest ../../doc/convert
 */
router.post('/doc/convert', api.docConvert);

module.exports = router;
