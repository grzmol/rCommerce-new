import express from "express";
import ProductModel from "../models/product";
let router = express.Router();

const ProductController = () => {

    router.get('/', async (req, res) => {
        let products = await ProductModel.find({});
        res.json(products);
    });

    router.get('/:productCode', async (req, res) => {
        let product = await ProductModel.findOne({name: req.params.productCode });
        res.json({success: true, data: product});
    });

    router.post('/', async (req, res) => {
        let product = {
            name: req.body.name,
            productCode: req.body.productCode,
            desc: req.body.desc,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image
        };
        let newProduct = new ProductModel(product);
        await newProduct.save(err => {
            if(err) throw err;
            res.json(newProduct);
        });
    });
    return router;
}

export default ProductController;