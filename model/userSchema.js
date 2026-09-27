 import mongoose from "mongoose";
 
  let userSchema=new mongoose.Schema({
    name:{type:String ,required:true},
    email:{type:String ,required:true , unique:true},
    phone:Number,
    password:{type:String ,required:true}
});

  let usermodel=mongoose.model('userdata',userSchema);

  export default usermodel;
  
