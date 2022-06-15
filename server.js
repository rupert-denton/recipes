const express = require('express')
const server = express()

const bodyParser = require('body-parser')

server.use(express.json())
server.use(bodyParser.json())
server.use('/api/recipes', require('./routes'))

module.exports = server
