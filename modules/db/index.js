var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gendocDatabase.sqllite');
 
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS files (uuid TEXT, name TEXT, md5 TEXT, mimetype TEXT, tmp_path TEXT, date numeric)");
});

// db.close();
let Files =  {};
Files.add = ({uuid, name, md5, mimetype, tmpPath}) => {
  let stmt = db.prepare("INSERT INTO files VALUES (?,?,?,?,?,?)");
  console.log(`uuid ${uuid} name ${name} md5 ${md5} mimetype ${mimetype} tmpPath ${tmpPath}`);
  stmt.run([uuid, name, md5, mimetype, tmpPath, (new Date).getTime()]); 
  stmt.finalize();
};

Files.getOneByUUID = (uuid) => {
  return new Promise ((resolve, reject) => {
    db.get("SELECT * FROM files where uuid=?", [uuid] , (err, row) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(row); 
      }
    });
  });
};

module.exports = {db: db, Models:{Files:Files}};