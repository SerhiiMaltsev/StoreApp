import {loadStripe} from '@stripe/stripe-js'
import {Button} from '@mui/material'
 
//https://designcode.io/advanced-react-hooks-handbook-adding-stripejs-to-react
 
let stripePromise;
const getStripe = () => {
    console.log((process.env.REACT_APP_STRIPE_KEY));
    if(!stripePromise) {
        //`${process.env.PUBLISHABLE_KEY}`
        stripePromise = loadStripe('pk_test_51L82rSKKKVNA4VPmtWfvKPFu6Td5IrgZqsUy38GyK0z1gurnBWFNaJUFPMiG7eAnoyas5UIo9eV0H3uvHMkROFZ500mBnMbOEc');
    }
    return stripePromise;
}
 
const CheckoutForm = () => {
    const item = {
        price: "price_1L835mKKKVNA4VPmmrIgGugI",
        quantity: 1
    }
 
    const item2 = {
        price: "price_1L843qKKKVNA4VPmWGK0TgQG",
        quantity: 1
    }
   
    const checkoutOptions = {
        //represents the items in the user's cart
        lineItems: [item, item2],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/shoppingcart`
    }
 
    const redirectToCheckout = async () => {
        console.log("redirectToCheckout")
 
        const stripe = await getStripe();
        const {error} = await stripe.redirectToCheckout(checkoutOptions);
        console.log("Stripe checkout error", error);
    }
 
    return (
        <Button onClick = {redirectToCheckout}>Stripe!</Button>
    )
}
 
export default CheckoutForm;
