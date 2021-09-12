import express from "express";
import Category from "../models/category";
let router = express.Router();

const CategoryController = () => {

    router.get('/', async (req, res) => {
        let category = await Category.find({});
        res.json(category);
    });

    router.post('/delete', async (req, res) => {
        let category = await Category.deleteMany({"_id": {$in: req.body.idsToRemove}});
        res.json(category);
    });
    router.get('/:name', async (req, res) => {
        let category = await Category.findOne({name: req.params.name });
        res.json({category});
    });

    router.post('/', async (req, res) => {
        let category = {
            name: req.body.name,
            displayNamePL: req.body.displayNamePL,
            displayNameEN: req.body.displayNameEN,
            desc: req.body.desc
        };
        let newCategory = new Category(category);
        await newCategory.save(err => {
            if(err) throw err;

            res.json(newCategory);
        })
    });

    router.post('/update', async (req, res) => {
        let category = {
            _id: req.body._id,
            name: req.body.name,
            displayNamePL: req.body.displayNamePL,
            displayNameEN: req.body.displayNameEN,
            desc: req.body.desc
        };


        let updatedCategory = await Category.findOneAndUpdate({_id: category._id}, category);
        res.json(updatedCategory);
    });
    return router;
}

export default CategoryController;