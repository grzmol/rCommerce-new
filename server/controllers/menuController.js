import express from "express";
import MenuItem from "../models/menuItem";
import ProductModel from "../models/product";
let router = express.Router();

const MenuController = () => {

    router.get('/', async (req, res) => {
        let menuItems = await MenuItem.find({});
        res.json(menuItems);
    });

    router.post('/delete', async (req, res) => {
        let menuItems = await MenuItem.deleteMany({"_id": {$in: req.body.idsToRemove}});
        res.json(menuItems);
    });

    router.post('/update', async (req, res) => {
        let itemToUpdate = {
            _id: req.body._id,
            name: req.body.name,
            displayNameEN: req.body.displayNameEN,
            displayNamePL: req.body.displayNamePL,
            url: req.body.url
        };

        console.log('xx menuItem', itemToUpdate)
        let updatedItem = await MenuItem.findOneAndUpdate({_id: itemToUpdate._id}, itemToUpdate);
        res.json(updatedItem);
    });

    router.get('/:name', async (req, res) => {
        let menuItems = await MenuItem.findOne({name: req.params.name });
        res.json({menuItems});
    });

    router.post('/', async (req, res) => {
        let menuItem = {
            name: req.body.name,
            displayNamePL: req.body.displayNamePL,
            displayNameEN: req.body.displayNameEN,
            url: req.body.url
        };
        let newMenuItem = new MenuItem(menuItem);
        await newMenuItem.save(err => {
            if(err) throw err;

            res.json(newMenuItem);
        })
    });
    return router;
}

export default MenuController;