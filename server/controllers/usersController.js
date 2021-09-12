import express from "express";
import UserModel from "../models/user";
let router = express.Router();

const UsersController = () => {
    router.get('/', async (req, res) => {
        let users = await UserModel.find();
        res.json(users);
    });



    router.post('/changeMail', async (req, res) => {
        let dataToChange = {
            email: req.body.email
        }
        let user = await UserModel.findOneAndUpdate({username: req.body.username}, dataToChange);
        res.json(user);
    });
    return router;
}

export default UsersController;