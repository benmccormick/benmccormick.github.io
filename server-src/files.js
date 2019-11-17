const { copyFile } = require('../src/utils/file_system');

const copyCNAME = cb => copyFile('/src/pages/CNAME', '/public/CNAME');

const copyManifest = () =>
  copyFile('/src/pages/manifest.json', '/public/manifest.json');

module.exports = {
  copyCNAME,
  copyManifest,
};
