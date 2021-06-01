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

server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const newUser = await Users.insert(req.body)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: err.message,
        })
    }
})

server.put('/api/users', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        if (!updatedUser) {
            res.status(404).json({
                message: `"The user with the specified ID ${id} does not exist"`
            })
        } else {
            const updatedUser = await Users.update(id, body)
            res.status(200).json(updatedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified",
            error: err.message,
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params
    Users.remove(id)
        .then(deleted => {
            if (!deleted) {
                res.status(404).json({
                    message: `"The user with the specified ID ${id} does not exist"`
                })
            } else {
                res.json(deleted)
            }
        })
        .catch (err => {
            res.status(500).json({
                message: "The user could not be removed",
                error: err.message,
            })
        })
})






//Exposing the server to other modules
module.exports = server; // EXPORT YOUR SERVER instead of {}
