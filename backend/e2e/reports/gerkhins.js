var fs = require('fs');
const path = require('path');
var walk = function (dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    var fileItem = dir + '/' + file;
    var stat = fs.statSync(fileItem);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(fileItem));
    } else {
      /* Is a file */
      results.push(fileItem);
    }
  });
  return results;
};

walk('./test/features').forEach(filePath => {
  const targetDir = './reports/' + path.dirname(filePath);
  fs.mkdirSync(targetDir, {recursive: true});

  fs.copyFileSync(filePath, targetDir + '/' + path.basename(filePath) + '.txt');
});
