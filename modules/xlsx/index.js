const fs = require('fs');
const os = require('os');
const path = require('path');
const JSZip = require('jszip');
const uuidv4 = require('uuid/v4');
const XlsxTemplate = require('xlsx-template');

const tmpDirPath = os.tmpdir();

module.exports = class XlsxF {
    static fill ({uuid, name, md5, mimetype, tmp_path, date}, data) {
       return new Promise((resolve, reject) => {
          
            var file = fs.readFileSync(path.resolve(tmp_path), 'binary');                
            var template = new XlsxTemplate(file);            
            
            var sheetNumber = 1; // todo: fill all sheets Может сделать прям в передаваемых данных для заполнения
            
            try {                
                template.substitute(sheetNumber, JSON.parse(data));
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                };
                
                reject(e);
            }
            
            var buf = template.generate();                    
            
            resolve(buf);
        });
    }
}