import bcrypt from 'bcrypt'



let encryptPassword = async ()=>{
    try {
        let hashPassword= await bcrypt.hash("saher@123",10);
console.log(hashPassword);
        
    } catch (error) {
        console.log(error);
    }
}
encryptPassword();




let checkPass = async()=>{
try {
    let status =await bcrypt.compare('saher@123','$2b$10$XV9yWcsQHXfEjjYHJFSmwuyKS8bt6zP5ly5fM2/6CCQF9a8RYOXoy')
    console.log(status);

} catch (error) {
    console.log(error);
}
}

checkPass()