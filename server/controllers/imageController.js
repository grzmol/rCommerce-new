import express from "express";
import ImageModel from "../models/image";
let router = express.Router();

const ImageController = () => {

    router.get('/', async (req, res) => {
        let filers = req.query.type ? { type: req.query.type } : {};
        let image = await ImageModel.find(filers);
        res.json(image);
    });


    router.get('/:name', async (req, res) => {
        let image = await ImageModel.findOne({name: req.params.name });
        res.json(image);
    });

    router.post('/delete', async (req, res) => {
        let images = await ImageModel.deleteMany({"_id": {$in: req.body.idsToRemove}});
        res.json(images);
    });

    router.post('/', async (req, res) => {
        let image = {
            name: req.body.name,
            desc: req.body.desc,
            imgBase64: req.body.imgBase64,
            type: req.body.type,
            productCode: req.body.product
        };
        let newImage = new ImageModel(image);
        await newImage.save(err => {
            if(err) throw err;
            res.json({success: true, newImage: newImage});
        });
    });
    return router;
}

export default ImageController;