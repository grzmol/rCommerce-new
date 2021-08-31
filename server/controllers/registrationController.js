import express from "express";
import UserModel from "../models/user";
let router = express.Router();

const RegistrationController = () => {


    router.post('/', (req, res) => {
        let user = {
            username: req.body.username,
            password: req.body.password,
            email : req.body.email,
            isAdmin: false
        };


        let newUser = new UserModel(user);
        newUser.save(err => {
            if(err) throw err;

            res.json({success: true, newUser: newUser});
        })
    });

    return router;
}

export default RegistrationController;