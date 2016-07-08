var app = require('./index')

var env = process.env.NODE_ENV || 'development'
var port = (env === 'production') ? process.env.PORT : 3000

console.log(`listening on port ${port}`)
app.listen(port)

