import mongoose from "mongoose";

import usermodel from '../model/userSchema.js';



//to update user phone number 1st we are findoing user by email and then update one  

// Student.updateOne(
//     { email: "Rahul@" },
//     { $set: { phone: 21 } }
// );

export let updateUser =async (useremail,userNewNum)=>{

    try {
       let user = await usermodel.updateOne({email:useremail}
        , { $set: { phone: userNewNum } }
       );
    
 
       return user;
    } catch (error) {
        
        console.log(error);
        return error;
    }
}


export let findUser =async (useremail)=>{

    try {
       let user = await usermodel.findOne({email:useremail});
    // let user = await useremail;
  console.log("user findone");
       return user;
    } catch (error) {
        console.log(error);
    }
}


export let createuser=async (userinfo)=>{
   
    let user = new usermodel(userinfo);
    try {
        await user.save();
     
        console.log('Employee created successfully');
        return true;
    } catch (error) {
        console.log('error while creating record');
        return false;
    }
};  
// createEmp();
