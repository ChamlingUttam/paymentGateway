import express from "express"
import "dotenv/config"
import cors from "cors"
import Stripe from "stripe"

const PORT = 4000
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 
const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URI
}))

app.use(express.json())

app.post("/createCheckoutSession", async (req, res) => {
    try {
        const { product } = req.body //grabing form the frontend

        const session = await stripe.checkout.sessions.create({ 
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            images: [product.image], 
                        },
                        unit_amount: product.price * 100, 
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URI}/success`, 
            cancel_url: `${process.env.FRONTEND_URI}/cancel`,
        })

        res.json({ url: session.url })
    } catch (error) {
        console.error(error) 
        res.status(500).json({ message: error.message }) 
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})