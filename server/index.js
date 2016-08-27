var express = require('express')
var compression = require('compression')
//var bodyParser = require('body-parser')
var path = require('path')
var formidable = require('formidable')
var parser = require('mtg-tourney-parser')

var store = {
  pairings: []
}

var app = express()
//app.use(bodyParser.json())
app.use(compression())
app.use(express.static(path.join(__dirname, '../public')))

//app.get('/upload', function(req,res) {
  //res.render('upload.html')
//})

app.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm()

  form.on('file', function(name, file) {
    if (file.type !== 'application/pdf') {
      res.redirect('/upload.html')
      return
    }

    parser(file.path, function(err, data) {
      if (err) {
        res.send(`Error: please upload a valid pdf\n\n ${err}`)
        return
      }

      store.pairings = data
      res.redirect('/')
    })
  })

  form.parse(req, function(err, fields, files) {
    console.log('files', files) // this parse is necessary to activate the form.on
  })
})

app.get('/data', function(req, res) {
  console.log('serving data')
  res.json(store)
})

module.exports = app

