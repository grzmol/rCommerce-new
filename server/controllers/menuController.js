import express from "express";
import MenuItem from "../models/menuItem";
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