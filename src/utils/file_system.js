const fs = require('fs');

const BASE_PATH = __dirname + '/..';
// From http://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
const copyFile = (sourcePath, targetPath, cb) => {
  let cbCalled = false;

  const done = err => {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  };
  //read stream
  let rd = fs.createReadStream(BASE_PATH + sourcePath);
  rd.on('error', err => done(err));

  //write stream
  let wr = fs.createWriteStream(BASE_PATH + targetPath);
  wr.on('error', err => done(err));
  wr.on('close', ex => done());
  rd.pipe(wr);
};

const mkDir = path => {
  try {
    fs.mkdirSync(BASE_PATH + path);
  } catch (e) {
    //this is probably fine, it may fail if the file already exists
    console.log('oops');
  }
};

const mkFile = (path, content) => {
  try {
    fs.writeFileSync(BASE_PATH + path, content);
  } catch (e) {
    //this is probably fine, it may fail if the file already exists
    console.log(
      `🔥 Failed to write a file to ${path}, something is probably wrong`
    );
  }
};

module.exports = {
  copyFile,
  mkFile,
  mkDir
};
