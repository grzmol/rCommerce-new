import express from "express";
import Order from "../models/order";
import CartModel from "../models/cart";
let router = express.Router();

const OrderController = () => {

    router.get('/', async (req, res) => {
        let orders = await Order.find({});
        res.json(orders);
    });

    router.post('/', async (req, res) => {
        let orders = await Order.find({user: req.body.user});
        res.json(orders);
    });
    router.get('/getOne/:id', async (req, res) => {

        let order = await Order.findOne({_id: req.params.id});
        res.json(order);
    });

    router.post('/place', async (req, res) => {
        let userCart = await CartModel.findOne({user: req.body.user, isActive: true});
        let currCartItems = userCart.cartItems;

        let order = {
            user: req.body.user,
            orderItems: currCartItems,
            totalPrice: userCart.totalPrice,
            totalQuantity: userCart.totalQuantity,
            orderAddress: {
                name: req.body.name,
                email: req.body.email,
                lastName: req.body.lastName,
                addressline1: req.body.addressline1,
                addressline2: req.body.addressline2,
                city: req.body.city,
                postalCode: req.body.postalCode,
                country: req.body.country
            },
            status: 'Placed',
            date: new Date()
        };


        let newOrder = new Order(order);
        await newOrder.save(async (err) => {
            if(err) throw err;

            userCart.isActive = false;
            userCart.order = newOrder._id;

            await CartModel.findOneAndUpdate({_id: userCart._id}, userCart);
            res.json(newOrder);
        })
    });
    return router;
}

export default OrderController;