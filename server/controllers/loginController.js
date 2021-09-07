import express from "express";
import UserModel from "../models/user";
import jwt from 'jsonwebtoken';
let router = express.Router();

const LoginController = (app) => {
    router.post("/", async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let user = await UserModel.findOne({ username: username });
        if (!user) {
            res.json({
                success: false,
                message: "Authentication failed. User not found."
            });
        } else if (user) {
            user.comparePassword(password, (err, isMatch) => {
                if(!err && isMatch){
                    const payload = {
                        isAdmin: user.isAdmin,
                        username: user.username,
                        email: user.email
                    };
                    let token = jwt.sign(payload, app.get("superSecret"), {
                        expiresIn : 60 * 60 * 24 // expires in 24 hours
                    });
    
                    res.json({
                        success: true,
                        message: "Enjoy your token!",
                        token: token
                    });
                }else{   
                    res.json({
                        success: false,
                        message: "Authentication failed. Wrong password."
                    });
                }
            })
        
        }
    });

    return router;
}

export default LoginController;