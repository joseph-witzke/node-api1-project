// Imports
const express = require('express')
const Users = require('./users/model')

//Instance of Express App
const server = express()

//Global Middleware
server.use(express.json())

//Endpoints
server.get('/api/users', (req, res) => {
    Users.find()
     .then(users => {
         res.json(users)
     })
     .catch(err => {
         res.status(500).json({ message: "The users information could not be retrieved",
         error: err.message,
        })
     })
})







//Exposing the server to other modules
module.exports = server; // EXPORT YOUR SERVER instead of {}
