import mongoose from "mongoose";


 let connectDB =async (dburl,dbname)=>{
try {
        await mongoose.connect(dburl +'/'+ dbname);
        console.log("connected to the server");

} catch (error) {
    console.log(error);
    console.log("error while connecting");
}
}

export default connectDB;
 //function will call in index
 //'mongodb://0.0.0.0:27017/dbtest'