import express from "express";
import ProductModel from "../models/product";
import CartModel from "../models/cart";
let router = express.Router();

const ProductController = () => {

    router.get('/', async (req, res) => {
        let products = await ProductModel.find(req.query.isFeatured ? {isFeatured: true} : {});
        res.json(products);
    });

    router.get('/search', async (req, res) => {
        let products = await ProductModel.find({name: { $regex: req.query.query || '', $options: "i" }});
        res.json(products);
    });


    router.post('/delete', async (req, res) => {
        let products = await ProductModel.deleteMany({"_id": {$in: req.body.idsToRemove}});
        res.json(products);
    });

    router.get('/:productCode', async (req, res) => {
        let product = await ProductModel.findOne({productCode: req.params.productCode });
        res.json( { product } );
    });


    router.get('/getByCategory/:category', async (req, res) => {
        let regex = new RegExp(["^", req.params.category, "$"].join(""), "i");
        let products = await ProductModel.find({category:  regex});
        res.json(products);
    });

    router.post('/getMany', async (req, res) => {
        let products = await ProductModel.find({_id: {$in: req.body.productIds} });
        res.json(products);
    });

    router.post('/', async (req, res) => {
        let product = {
            name: req.body.name,
            productCode: req.body.productCode,
            desc: req.body.desc,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            isFeatured: req.body.isFeatured,
            shortDesc: req.body.shortDesc
        };
        let newProduct = new ProductModel(product);
        await newProduct.save(err => {
            if(err) throw err;
            res.json(newProduct);
        });
    });

    router.post('/update', async (req, res) => {
        let product = {
            _id: req.body._id,
            name: req.body.name,
            productCode: req.body.productCode,
            desc: req.body.desc,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            isFeatured: req.body.isFeatured,
            shortDesc: req.body.shortDesc
        };


        let updatedProduct = await ProductModel.findOneAndUpdate({_id: product._id}, product);
        res.json(updatedProduct);
    });


    return router;
}

export default ProductController;