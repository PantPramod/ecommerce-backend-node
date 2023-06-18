const express = require('express');
const stripe = require("stripe")("sk_test_51MP1wXSAvbbri2RxswMo1ZQ5uEWV6sqjtST6x7b3W8ny55gGTJeeWSiUL5N763XbSWXd9dUdhvmu9QJWwdp1VG5D00UOeGod17");

const router = express.Router()

router.get("/config", (req, res) => {
    res.send({
        publishableKey: "pk_test_51MP1wXSAvbbri2Rx0pHr0UZzMUhCEjkDwSYJMnnlF2UEewTGQ9rvDIXx9hG8OJEIqmMIjf3InHW9ZjSG6uQGFyZn00KY73rSdy",
    });
});

router.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "INR",
            amount,
            automatic_payment_methods: { enabled: true },
        });
        console.log(paymentIntent)
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        console.log(e)
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

module.exports = router