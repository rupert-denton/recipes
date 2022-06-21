const express = require('express')
const server = express()
const path = require('path')

const bodyParser = require('body-parser')

server.use(express.json())
server.use(bodyParser.json())
server.use('/api/recipes', require('./routes'))
// xpress.static(path_join(__dirname, '/client/build'))

server.get('/', function (req, res) {
  res.sendFile(path.join('/build/index.html'))
})

module.exports = server
