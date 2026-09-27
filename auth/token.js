import jwt from 'jsonwebtoken';


export let getToken=(email)=>{
    console.log(process.env.SECRET_KEY);
let token =jwt.sign({email},process.env.SECRET_KEY)
console.log(token);
return token;
}

export let verifyToken=(token)=>{
    console.log(process.env.SECRET_KEY);

    let verifyToken = jwt.verify(token,process.env.SECRET_KEY)
console.log(verifyToken);
return verifyToken;
}


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYW5AZ21haWwuY29tIiwiaWF0IjoxNzg5MDI
///to verify

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYW5AZ21haWwuY29tIiwiaWF0IjoxNzg5MDM3MjY2LCJleHAiOjE3OTc2NzcyNjZ9.5slYYIsXYkoryfBoEGGaE9LxwA_0duAkaRWAwLre5BY+
//  let tokenData=jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYW5AZ21haWwuY29tIiwiaWF0IjoxNzg5MDM3MjY2LCJleHAiOjE3OTc2NzcyNjZ9.5slYYIsXYkoryfBoEGGaE9LxwA_0duAkaRWAwLre5BY',process.env.SECRET_KEY)
// console.log(data)
// export default tokenData;