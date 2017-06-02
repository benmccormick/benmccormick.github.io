const fs = require('fs');
// From http://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
const copyFile = (source, target, cb) => {
  let cbCalled = false;

  const done = (err) => {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  };
  //read stream
  let rd = fs.createReadStream(source);
  rd.on('error', err => done(err));

  //write stream
  let wr = fs.createWriteStream(target);
  wr.on('error', err => done(err));
  wr.on('close', ex => done());
  rd.pipe(wr);
};

module.exports = {
  copyFile,
};
