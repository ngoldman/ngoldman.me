var fs = require('fs')
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
})
var opts = { encoding: 'utf8' }
var header = fs.readFileSync('./partials/_header.html', opts)
var footer = fs.readFileSync('./partials/_footer.html', opts)
var pages = []

pages.push({
  path: 'index.html',
  body: md.render(fs.readFileSync('./README.md', opts))
}, {
  path: 'projects/index.html',
  body: md.render(fs.readFileSync('./projects/README.md', opts))
})

pages.forEach(function (page) {
  fs.writeFile(page.path, header + page.body + footer, function (err) {
    if (err) return console.error(err)
    console.log('built', page.path)
  })
})
