import userModel from '../model/usermodel01.js'


// Get all users
export let getAllUsersService = async () => {

    try {

        let users = await userModel.find();

        return users;

    } catch (error) {

        console.log(error);
        throw error;

    }

};


// Get user by custom id
export let getUserByIdService = async (id) => {

    try {

        let user = await userModel.findOne({ id: id });

        return user;

    } catch (error) {

        console.log(error);
        throw error;

    }

};


// Add user
export let addUserService = async (userData) => {

    try {

        let user = await userModel.create(userData);

        return user;

    } catch (error) {

        console.log(error);
        throw error;

    }

};


// Update user
export let updateUserService = async (id, userData) => {

    try {

        let user = await userModel.findOneAndUpdate(
            { id: id },
            userData,
            { new: true }
        );

        return user;

    } catch (error) {

        console.log(error);
        throw error;

    }

};


// Delete user
export let deleteUserService = async (id) => {

    try {

        let user = await userModel.findOneAndDelete({ id: id });

        return user;

    } catch (error) {

        console.log(error);
        throw error;

    }

};