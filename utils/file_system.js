const fs = require('fs');
// From http://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
const copyFile = (sourcePath, targetPath, cb) => {
  let cbCalled = false;

  const done = (err) => {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  };
  //read stream
  let rd = fs.createReadStream(__dirname + sourcePath);
  rd.on('error', err => done(err));

  //write stream
  let wr = fs.createWriteStream(__dirname + targetPath);
  wr.on('error', err => done(err));
  wr.on('close', ex => done());
  rd.pipe(wr);
};

const mkDir = path => {
  try {
    fs.mkdirSync(__dirname + path);
  } catch (e) {
        //this is probably fine, it may fail if the file already exists
  }
};

const mkFile = (path, content) => {
  try {
    fs.writeFileSync(__dirname + path, content);
  } catch (e) {
        //this is probably fine, it may fail if the file already exists
  }
};

module.exports = {
  copyFile,
  mkFile,
  mkDir,
};
