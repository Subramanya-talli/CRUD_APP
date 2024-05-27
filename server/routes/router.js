const express = require('express')
const route = express.Router()
const services = require('../services/render')

const {createUser, getUsers, updateUser, deleteUser} = require('../controller/controllers.js')

/*
* @description Root Route
* @method GET /
*/ 
route.get('/', services.homeRoutes);

/*
* @description Add User
* @method GET /add-user
*/ 
route.get('/add-user', services.userRoute);


/*
* @description Update User
* @method GET /update_user
*/ 
route.get('/update_user', services.updateUserRoute);


//API
route.post('/api/user', createUser)
route.get('/api/users', getUsers)
route.put('/api/users/:id', updateUser)
route.delete('/api/users/:id', deleteUser)


module.exports = route;