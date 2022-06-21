const express = require('express')
const server = express()

const bodyParser = require('body-parser')

server.use(express.json())
server.use(bodyParser.json())
server.use('/api/recipes', require('./routes'))
server.get('/', function (req, res) {
  res.sendFile(path.resolve('build/index.html'))
})

module.exports = server
