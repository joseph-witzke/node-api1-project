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

server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(404).json({ 
            message: "The user with the specified ID does not exist",
            error: err.message,
        })
    }
    
})







//Exposing the server to other modules
module.exports = server; // EXPORT YOUR SERVER instead of {}
