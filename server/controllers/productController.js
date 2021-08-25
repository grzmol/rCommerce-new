import express from "express";
import ProductModel from "../models/product";
let router = express.Router();

const ProductController = () => {

    router.get('/:productCode', async (req, res) => {
        let product = await ProductModel.findOne({name: req.params.productCode });
        res.json(...product);
    });

    router.post('/saveImage', async (req, res) => {
        let product = {
            name: req.body.name,
            productCode: req.body.productCode,
            shortDesc: req.body.shortDesc,
            longDesc: req.body.longDesc,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image
        };
        let newProduct = new ProductModel(product);
        await newProduct.save(err => {
            if(err) throw err;
            res.json({success: true, newProduct: newProduct});
        });
    });
    return router;
}

export default ProductController;