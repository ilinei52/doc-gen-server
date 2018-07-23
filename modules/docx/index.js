const fs = require('fs');
const os = require('os');
const path = require('path');
const JSZip = require('jszip');
const uuidv4 = require('uuid/v4');
const Docxtemplater = require('docxtemplater');

const tmpDirPath = os.tmpdir();

class DocxF {
    static fill ({uuid, name, md5, mimetype, tmp_path, date}, data) {
       return new Promise((resolve, reject) => {
          
            var file = fs.readFileSync(path.resolve(tmp_path), 'binary');
            var zip = new JSZip(file);
            var doc = new Docxtemplater();
            doc.loadZip(zip);            
            
            try {            
                doc.setData(JSON.parse(data)); 
                doc.render()
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
            
            var buf = doc.getZip()
                         .generate({type: 'nodebuffer'});
            let tmpFileName = uuidv4()
            let pathFiF = path.join(tmpDirPath, tmpFileName);
            fs.writeFileSync(pathFiF, buf);
            resolve(pathFiF);
        });
    }
}

module.exports = DocxF;