const os = require('os');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const tr = require('transliteration');

const db = require('./db/index');
const mt = require('./consts/mime-types');
const DocxF = require('./docx/index');
const XlsxF = require('./xlsx/index');


const tmpDirPath = os.tmpdir();

// todo: реализовать следующие генераторы
// let xlsx = require('../modules/xlsx/index');
// let pdf = require('../modules/pdf/index');
// let img = require('../modules/img/index');
// let doc = require('../modules/img/index');
// let txt = require('../modules/img/index');
// let html = require('../modules/img/index');

/**
 * Template file data filling
 * @param {*} req Express request
 * @param {*} res Express response
 */
const templateFill = (req, res) => {
    var data = req.body.data || req.query.data;
    var fileUuid = req.body.uuid || req.query.uuid;

    db.Models.Files.getOneByUUID(fileUuid).then(fileD => {
        if (!fileD)
            return res.status(404).json({
                error: {
                    message: "File not found!"
                }
            });
        // todo: Нельзя вернуть без транслитерации имени файла. Разобравться!
        if (fileD.mimetype == mt.DOCX) {
            DocxF.fill(fileD, data).then(result => {
                res.setHeader('Content-Disposition', 'attachment;filename="' + tr.transliterate(fileD.name) + '"');
                res.setHeader('content-type', fileD.mimetype);
                return res.sendFile(result);
            }, error => {
                return res.status(500).json({
                    error: {
                        message: "Internal server error!",
                        error: error // todo: write to log file if production
                    }
                });
            });
            // todo: Сделать через https://npmjs.com/package/xlsx-populate так как с xlsx-template не работает "файл повреждён"
            // } else if (fileD.mimetype == mt.XLSX) {
            //     XlsxF.fill(fileD, data).then(result => {
            //         res.setHeader('Content-Disposition', 'attachment;filename="' + tr.transliterate(fileD.name) + '"');
            //         res.setHeader('content-type', fileD.mimetype);
            //         res.setHeader('content-length', result.length);
            //         return res.send(new Buffer(result));
            //     }, error => {
            //         return res.status(500).json({
            //             error: {
            //                 message: "Internal server error!",
            //                 error: error // todo: write to log file if production
            //             }
            //         });
            //     });
        } else {
            return res.status(400).json({
                error: {
                    message: `Bad request! mime-type: "${fileD.mimetype}"  is not supported`
                }
            });
        }
    }, error => {
        res.status(500).json({
            error: {
                message: "Internal server error!",
                error: error // todo: write to log file if production
            }
        });
    });
};

/**
 * Upload template file
 * @param {*} req Express request
 * @param {*} res Express response
 */
const templateUpload = (req, res) => {
    var per = req.body.permanent || req.query.permanent;
    per = (per === 'true');

    var tmpDir = per ? path.join(__dirname, '../', '.localFS') : tmpDirPath;
    if (!req.files)
        return res.status(400).send({
            error: {
                message: 'No files were uploaded.'
            }
        });

    let files = req.files;

    function saveFile(fileN) {
        return new Promise((res, rej) => {

            let tmpFileName = uuidv4();
            let storePath = tmpFileName.replace(/-/gm, '/');
            let tmpFolder = path.join(tmpDir, storePath);
            let tmpFilePath = path.join(tmpFolder, tmpFileName);

            mkdirp.sync(tmpFolder);

            fileN.mv(tmpFilePath, (err) => {
                if (err) rej(err);

                let fD = {
                    uuid: tmpFileName,
                    name: fileN.name,
                    md5: fileN.md5,
                    mimetype: fileN.mimetype,
                    tmpPath: tmpFilePath
                };

                db.Models.Files.add(fD);
                res(db.Models.Files.getOneByUUID(fD.uuid));
            });

        });
    }

    for (let key of Object.keys(files)) {
        let fileN = files[key];
        if (Array.isArray(fileN)) {

            //todo: почему то одна или две записи возвращают null. Вероятно из-за того, что база данных отвечает пустой строкой на запрос по только что добавленной строке.
            res.status(500).json({
                error: {
                    message: "Internal server error!",
                    error: error
                }
            });

            // // get all promises
            // let proms = fileN.map((val) => {
            //   return saveFile(val);
            // });

            // // собрать все обещания
            // Promise.all(proms).then((result) => {
            //   res.json(result);
            // }, error => {
            //   res.status(500).json({
            //     error: {
            //       message: "Internal server error!",
            //       error: error
            //     }
            //   })
            // });

        } else {
            // Save single file
            saveFile(fileN).then(result => {
                res.send(result);
            }, error => {
                res.status(500).json({
                    error: {
                        message: "Internal server error!",
                        error: error
                    }
                });
            });
        }
    }
};

/**
 * Convert file
 * @param {*} req 
 * @param {*} res 
 */
const docConvert = (req, res) => {
    // todo: Convert document
    res.status(404).json({
        error: {
            message: 'Метод не реализован!'
        }
    })
};

module.exports = {
    templateFill: templateFill,
    templateUpload: templateUpload,
    docConvert: docConvert
};