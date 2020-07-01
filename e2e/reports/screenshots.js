var pug = require('pug');
var fs = require('fs');
// compile
var fn = pug.compile(
  `
doctype html
html(lang="en")
    head
        title= pageTitle
        style
            | body { background: #313131; color: white; }
            | .container { max-width: 90rem; margin: 0 auto; }
            | .go_back {display: block; font-size: 16px; color: white; margin: 32px 8px 16px 16px; text-decoration: none;}
            | .go_back:hover {opacity: 0.6;}
            | ul {list-style: none; padding: 0; display: flex;flex-wrap: wrap;}
            | .image__item {text-align: center; font-family: Courier; font-size: 12px; margin-bottom: 32px;color: white;}
            | .image__item--sm {flex: 1;min-width: 25%}
            | .image__item--md {flex: 1; min-width: 25%}
            | .image__item--lg {flex: 3; min-width: 100%;}
            | .image__item video {display: block; width: 100%; max-height:80vh;}
            | .image__item a {text-decoration: none; color: white;}
            | .image__item a:hover {text-decoration: none; color: white;background: black;}
            | .image__item img {max-width: 95%;max-height:80vh; display: block; margin: 0 auto;}
            | .image__item strong {font-size: 14px;line-height: 1.8;diplay: block; padding: 14px 8px;}
    body
        div(class='container')
            a(href='/', class='go_back') Go Back
            h1 Screenshots
            em= pageTitle
            each image in images
                h2= image.title
                ul
                    each file in image.files
                        li(class="image__item image__item--" + file.modifier)
                            if(file.type == 'png')
                                a(href=file.path, target="_blank")
                                    img(src=file.path)
                            else
                                video(controls="controls")
                                    source(src=file.path, type="video/mp4")
                                    object(data=file.path)
                            a(href=file.path, target="_blank")
                                strong= file.title
`,
  {}
);
var now = new Date();
var _f = function (num) {
  num = parseInt(num, 10);
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};
function getExtension(filename) {
  var ext = filename.split('.');
  return ext[ext.length - 1];
}

var walkVideo = function (dir) {
  var results = [];
  dir = dir.replace('screenshots', 'videos');
  var list = fs.readdirSync(dir);
  console.log('videos', {list});
  list.forEach(function (file) {
    var fileItem = {
      path: (dir + '/' + file).replace('./reports', ''),
      title: file,
      type: 'mp4',
      modifier: 'lg',
      files: [],
    };
    results.push(fileItem);
  });
  return results;
};

var walk = function (dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    var fileItem = {
      path: (dir + '/' + file).replace('./reports', ''),
      title: file,
      type: 'png',
      modifier: file.indexOf('--') > -1 ? 'sm' : 'md',
      files: [],
    };
    var filePath = dir + '/' + file;
    var stat = fs.statSync(filePath);
    if (stat && stat.isFile() && getExtension(file) !== 'png') {
      return results;
    }
    if (stat && stat.isDirectory()) {
      fileItem.type = 'dir';
      /* Recurse into a subdirectory */
      fileItem.files = fileItem.files.concat(
        walk(filePath).concat(walkVideo(filePath))
      );
    }
    /* Is a file */
    results.push(fileItem);
  });
  return results;
};
const images = walk('./reports/screenshots');
var html = fn({
  pageTitle: `Captures of ${_f(now.getDay())}/${_f(
    now.getMonth()
  )}/${now.getFullYear()} @ ${_f(now.getHours())}:${_f(now.getMinutes())}`,
  images,
});

fs.writeFileSync('./reports/screenshots/index.html', html);
console.log(images);
