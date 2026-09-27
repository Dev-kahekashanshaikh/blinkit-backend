import jwt from 'jsonwebtoken'

// let secretKey='jkjhlhhhjaa'

// let token=jwt.sign({email:'khan@gmail.com'},secretKey,{expiresIn:"100d"})
// console.log(token)

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYW5AZ21haWwuY29tIiwiaWF0IjoxNzg5MDI
///to verify

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYW5AZ21haWwuY29tIiwiaWF0IjoxNzg5MDM3MjY2LCJleHAiOjE3OTc2NzcyNjZ9.5slYYIsXYkoryfBoEGGaE9LxwA_0duAkaRWAwLre5BY+
// let data=jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYW5AZ21haWwuY29tIiwiaWF0IjoxNzg5MDM3MjY2LCJleHAiOjE3OTc2NzcyNjZ9.5slYYIsXYkoryfBoEGGaE9LxwA_0duAkaRWAwLre5BY',secretKey)
// console.log(data) ;


let secretKey = 'jhbfhjdbfh23';

// let token=jwt.sign({
//    name:"kahekashanSaher"
// },secretKey);


let decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2FoZWthc2hhblNhaGVyIiwiaWF0IjoxNzg5MDQxNTIxfQ.fP6AI2RN1g-SmfhGcoCqzq-dfTXh1kcVRuUVdG6QsXA',secretKey)







console.log(decoded);