import { createuser, findUser, updateUser } from '../services/userService.js'
import { encryptPassword, checkPass } from '../utiles/bcrypt.js'
import { getToken, verifyToken } from '../auth/token.js'


export let getProfile = async (req, res) => {

    try {
        let email = req.params.email;

        let token = req.headers.authorization.split(" ")[1];

        let userverify = verifyToken(token);

        let user = await findUser(email);
        
        console.log('in controller');
        console.log(user);
        if (email == userverify.email) {
            res.status(200).json({
                name: user.name,
                email: user.email,
                phone: user.phone
            })
        }
        else {
            res.status(400).json({
                message: "verification failed"
            })

        }

        res.send(req.headers.authorization.split(" ")[1])
    } catch (error) {
        res.send(error)
        console.log(error);
    }

}







// 3) /user/updatemobile email,updatedmobile post 
//    message mobile number updated successfully
export let changeMobNum = async (req, res) => {
    try {
        //we will check the eamil n psw for update then allow to update
        let { email, password, phone } = req.body;

        let user1 = await findUser(email) //find user by email and update new num

        console.log(user1); //user object's all keys will get here

        let status = await checkPass(password, user1.password); //checking pswd for validation




        if (status) {
            let user = await updateUser(email, phone) //find user by email and update new num


            res.status(200).json({ message: "mobile number updated successfully" })
        }
        else {
            res.status(400).json({ message: "login failed wrong email or password" });
        }


    }
    catch (error) {
        console.log(error);

        res.send(error)
    }


}

//2)/user/profile/:email  get response {email,mobile,name}
export let showProfile = async (req, res) => {
    try {

        //pahele email and password check karenge phir show karenge 
        //uske liye db me crate user k baad check krna hoga k email pass sahi hai 
        //db model me findOne fun use karenege

        let { email, password } = req.body;
        let user1 = await findUser(email);
        console.log(user1); //user object all keys will get here

        let status = await checkPass(password, user1.password); //checking pswd for validation


        if (status) {

            res.status(200).json({ message: "user profile: " + "," + "Name: " + user1.name + "," + "email :" + user1.email + ", " + "phonenumber: " + user1.phone });
        }
        else {
            res.status(400).json({ message: "login failed" });
        }



        //await res.send(req.params.email, req.params.phone, req.params.name);//show krna hai 
        // console.log("user updated");
    } catch (error) {
        console.log(error);
    }
}

export let userLogin = async (req, res) => {

    try {
        // res.send(req.body);
        let { email, password } = req.body;
        console.log(email, password);
        // let user1 = await findUser(email)
        let user1 = await findUser(email);
        console.log(user1);
        let status = await checkPass(password, user1.password);

        if (status) {
            let token = getToken(email)
            res.status(200).json({
                message: "password matched successfully"
                , token
            });
        }
        else {
            res.status(400).json({ message: "login failed" });
        }
    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: error });
        res.send(error);
    }
}

export let createAccount = async (req, res) => {

    try {


        // let data = await res.send("hello route")

        let userPassword = req.body.password;
        console.log(userPassword);
        let encryptedPassword = await encryptPassword(userPassword);
        console.log(encryptedPassword);

        let status = await createuser(
            {
                "name": req.body.name,
                "phone": req.body.phone,
                "email": req.body.email,
                "password": encryptedPassword
            }
        );
        //calling fun of model
        //   let status = await createuser(req.body);
        //   res.send("run" + status);


        console.log(status);
        if (status) {
            res.status(200).json({ message: "user created" })
        }
        else {
            res.status(400).json({ message: "error while creating user" })

        }


    } catch (error) {
        console.log(error);

    }
}




