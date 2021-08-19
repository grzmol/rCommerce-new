import express from "express";
import FileUploadMiddleware from "../middlewares/fileUpload";
import ImageModel from '../models/image';
import fs from 'fs';
import path from 'path';


let router = express.Router();
let fileUpload = new FileUploadMiddleware();
const UploadController = () => {


    router.get('/', (req, res) => {
        ImageModel.find({}, (err, items) => {
            if (err) {
                console.log(err);
                res.json({success: false, error: err});
            }
            else {
                res.json({success: true, data: items});
            }
        });
    });

    router.post('/', fileUpload.single('image'), (req, res, next) => {

        let obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        ImageModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
                res.json({success: false, error: err});
            }
            else {
                // item.save();
                res.json({success: true, data: item});
            }
        });
    });

    return router;
}

export default UploadController;

