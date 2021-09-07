import express from "express";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51JX5LzDZgxqo7V6tCS8ugHAGMm2kDBVfWkFrvTbJ4QLiNEWmXl8EkGptylkG7GB7PXMfuzaQzHxQ2mLiy27YAleq00meSV6aQ1', {});
let router = express.Router();


const StripeController = () => {
    router.post('/process', async (req, res) => {
        try {
            const charge = await stripe.charges.create({
                amount: Number(req.body.amount) * 100,
                currency: "pln",
                source: req.body.cardToken,
                receipt_email: req.body.email,
                description: `Stripe Charge Of Amount ${req.body.amount} for One Time Payment`,
            });

            return res.status(200).send({
                charge: charge
            })

        }catch(error){
            return res.status(400).send({Error: error.raw.message});
        }

    })

    return router;
}

export default StripeController;