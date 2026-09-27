import bcrypt from 'bcrypt'



export let encryptPassword = async (password)=>{
    try {
        let hashPassword= await bcrypt.hash(password,10);
console.log(hashPassword);
return hashPassword
        
    } catch (error) {
        console.log(error);
        return error
    }
}




export let checkPass = async(realPassword,cryptedPassword)=>{
try {
    let status =await bcrypt.compare(realPassword,cryptedPassword)
    console.log("bcryptpasswordis"+status);
return status;
} catch (error) {
    console.log(error);
    return false;
}
}


//'saher@123','$2b$10$XV9yWcsQHXfEjjYHJFSmwuyKS8bt6zP5ly5fM2/6CCQF9a8RYOXoy