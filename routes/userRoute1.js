import express from "express";

import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} from "../controllers/userController1.js";


let user1Route = express.Router();


user1Route.get('/getAllUsers', getAllUsers);

user1Route.get('/getUserById', getUserById);

user1Route.post('/addUser', addUser);

user1Route.put('/updateUser', updateUser);

user1Route.delete('/deleteUser', deleteUser);


export default user1Route;