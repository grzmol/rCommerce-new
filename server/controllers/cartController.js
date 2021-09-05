import express from "express";
import CartModel from "../models/cart";
import ProductModel from "../models/product";
import _ from "lodash";
let router = express.Router();

const CartController = () => {
    router.post('/', async (req, res) => {
        let userCart = await CartModel.findOne({user: req.body.user, isActive: true});
        res.json(userCart);
    });

    router.post('/addItem', async(req, res) => {
        let userCart = await CartModel.findOne({user: req.body.user, isActive: true});
        let productToAdd = await ProductModel.findOne({_id: req.body.product});
        let currCartItems = userCart.cartItems;

        if(userCart && productToAdd){
            let existingItemForProduct = _.filter(currCartItems, item => {
                return String(item.product) === String(productToAdd._id);
            })[0] || {};

            if(!_.isEmpty(existingItemForProduct)){
                existingItemForProduct.quantity += Number(req.body.quantity);
                existingItemForProduct.itemPrice = existingItemForProduct.quantity * productToAdd.price;
            }else{
                let newCartItem = {
                    product: productToAdd._id,
                    quantity: Number(req.body.quantity),
                    itemPrice: productToAdd.price
                }
                userCart.cartItems.push(newCartItem);
            }
            let totalCartPrice = 0;
            let totalCartQty = 0;
            _.each(userCart.cartItems, cartItem => {
                totalCartPrice += cartItem.itemPrice;
                totalCartQty += cartItem.quantity;
            });
            userCart.totalPrice = totalCartPrice;
            userCart.totalQuantity = totalCartQty;

            let updatedCart = await CartModel.findOneAndUpdate({_id: userCart._id}, userCart);
            res.json(updatedCart);
        }else{
            res.json({});
        }
    });


    router.post('/closeCart', async (req, res) => {
        let cart = await CartModel.findOneAndUpdate({_id: req.params.id }, {isActive: false});
        res.json(cart);
    });

    router.post('/new', async (req, res) => {
        let cart = {
            user: req.body.user,
            products: [],
            totalPrice: 0,
            totalQuantity: 0,
            isActive: true
        };
        let newCart = new CartModel(cart);
        await newCart.save(err => {
            if(err) throw err;
            res.json(newCart);
        });
    });
    return router;
}

export default CartController;