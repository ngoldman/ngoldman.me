var fs = require('fs');
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

var opts = { encoding: 'utf8' };

var index = md.render(fs.readFileSync('./README.md', opts));
var header = fs.readFileSync('./partials/_header.html', opts);
var footer = fs.readFileSync('./partials/_footer.html', opts);

fs.writeFile('index.html', header + index + footer, function (err) {
  if (err) { throw err; }
  console.log('built index.html');
});

var projects = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>ngoldman projects</title><link rel="stylesheet" href="http://code.ngoldman.me/style.css/style.css"><style>.container{margin: 3rem auto; max-width: 666px; padding: 16px;} .markdown-body h1, .markdown-body h2 { border-bottom: none; } .markdown-body a, .markdown-body a:hover { color: #f30; }</style></head><body><main class="container markdown-body"><h1><a href="/">ngoldman</a> projects</h1>';
projects += md.render(fs.readFileSync('./projects/README.md', opts));
projects += '</main></body></html>';

fs.writeFile('projects/index.html', projects, function (err) {
  if (err) { throw err; }
  console.log('built projects/index.html');
});
