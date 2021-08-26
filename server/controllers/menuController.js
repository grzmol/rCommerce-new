import express from "express";
import MenuItem from "../models/menuItem";
let router = express.Router();

const MenuController = () => {

    router.get('/', async (req, res) => {
        let menuItems = await MenuItem.find({});
        res.json({success: true, data: menuItems});
    });

    router.get('/:name', async (req, res) => {
        let menuItems = await MenuItem.findOne({name: req.params.name });
        res.json({success: true, data: menuItems});
    });

    router.post('/', async (req, res) => {
        let menuItem = {
            name: req.body.name,
            url: req.body.url
        };
        let newMenuItem = new MenuItem(menuItem);
        await newMenuItem.save(err => {
            if(err) throw err;

            res.json({success: true, newMenuItem: newMenuItem});
        })
    });
    return router;
}

export default MenuController;