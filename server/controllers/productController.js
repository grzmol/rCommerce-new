import express from "express";
import ProductModel from "../models/product";
let router = express.Router();

const ProductController = () => {

    router.get('/', async (req, res) => {
        let products = await ProductModel.find(req.query.isFeatured ? {isFeatured: true} : {});
        res.json(products);
    });

    router.post('/delete', async (req, res) => {
        let products = await ProductModel.deleteMany({"_id": {$in: req.body.idsToRemove}});
        res.json(products);
    });

    router.get('/:productCode', async (req, res) => {
        let product = await ProductModel.findOne({name: req.params.productCode });
        res.json({success: true, data: product});
    });

    router.post('/', async (req, res) => {
        let product = {
            user: String,
            products: [{type: String}],
            totalPrice: Number,
            totalQuantity: Number,
            isActive: Boolean
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