import {
    getAllUsersService,
    getUserByIdService,
    addUserService,
    updateUserService,
    deleteUserService
} from "../services/userService01.js";


// GET ALL USERS FROM DB
export let getAllUsers = async (req, res) => {

    try {

        let users = await getAllUsersService();

        res.send(users);

    } catch (error) {

        res.send(error);

    }

};


// GET USER BY ID 
export let getUserById = async (req, res) => {

    try {

        let id = req.query.id;

        let user = await getUserByIdService(id);

        res.send(user);

    } catch (error) {

        res.send(error);

    }

};


// ADD USER INTO DB
export let addUser = async (req, res) => {

    try {

        let userData = req.body;

        let user = await addUserService(userData);

        res.send(user);

    } catch (error) {

        res.send(error);

    }

};


// UPDATE USER
export let updateUser = async (req, res) => {

    try {

        let id = req.body.id;

        let userData = req.body;

        let user = await updateUserService(id, userData);

        res.send(user);

    } catch (error) {

        res.send(error);

    }

};


// DELETE USER FROM DATABASE
export let deleteUser = async (req, res) => {

    try {

        let id = req.body.id;

        let user = await deleteUserService(id);

        res.send(user);

    } catch (error) {

        res.send(error);

    }

};