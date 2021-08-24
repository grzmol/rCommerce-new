import express from "express";
import ImageModel from "../models/image";
let router = express.Router();

const ImageController = () => {

    router.post('/getImage', async (req, res) => {
        let users = await ImageModel.findOne({name: req.body.name });
        res.json({users: users});
    });

    router.post('/saveImage', async (req, res) => {
        let image = {
            name: req.body.name,
            desc: req.body.desc,
            imgBase64: req.body.imgBase64
        };
        let newImage = new ImageModel(image);
        await newImage.save(err => {
            if(err) throw err;

            res.json({success: true, newImage: newImage});
        })
    });
    return router;
}

export default ImageController;