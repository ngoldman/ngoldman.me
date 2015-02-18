var union = require('union')
var ecstatic = require('ecstatic')
var director = require('director')
var router = new director.http.Router()
var port = process.env.PORT || 3000
var server = union.createServer({
  before: [
    ecstatic({
      root: __dirname,
      baseDir: '/',
      cache: 3600,
      showDir: false,
      autoIndex: true,
      defaultExt: 'html',
      gzip: false
    }),
    function (req, res) {
      var found = router.dispatch(req, res)
      if (!found) {
        res.emit('next')
      }
    }
  ]
})

server.listen(port)
console.log('ngoldman.me listening on ' + port)
