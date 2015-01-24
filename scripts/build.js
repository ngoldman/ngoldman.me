var fs = require('fs');
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

var opts = { encoding: 'utf8' };

var index = md.render(fs.readFileSync('./index.md', opts));
var header = fs.readFileSync('./partials/_header.html', opts);
var footer = fs.readFileSync('./partials/_footer.html', opts);

fs.writeFile('index.html', header + index + footer, function (err) {
  if (err) { throw err; }
  console.log('built index.html');
});

var projects = '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>ngoldman haus | projeks</title> <link rel="stylesheet" href="http://code.ngoldman.me/style.css/style.css"> <style>.container{margin: 3rem auto; max-width: 666px; padding: 13px;}</style> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/github.min.css"> <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script> <script>hljs.initHighlightingOnLoad();</script></head><body><main class="container markdown-body">';
projects += md.render(fs.readFileSync('./projects.md', opts));
projects += '</main></body></html>';

fs.writeFile('projects/index.html', projects, function (err) {
  if (err) { throw err; }
  console.log('built projects/index.html');
});
