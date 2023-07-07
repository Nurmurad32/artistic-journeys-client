import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
// import useCart from "../../../hooks/useCart";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";


// TODO:  Provide Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    // const [cart] = useCart()
    // const total = cart.reduce((sum,item) => sum + item.price, 0)
    // const price = parseFloat(total.toFixed(2));

    const location = useLocation();
    // const pricefromurl = location?.state?.cls
    // location.state?.from?.pathname

    const cart = {
         title: location?.state?.title , 
         price: location?.state?.price, 
         cart_id: location?.state?.cart_id,
         classItemId : location?.state?.classItemId
    }
    console.log(location)
    return (
        <div>
            <Helmet>
                <title>Artistic Journeys || Payment</title>
            </Helmet>
            <SectionTitle heading={"Payment"}></SectionTitle>
            <h3 className="text-center">You Need to Pay: <span className="text-[#D05A32]">${location?.state?.price}</span> </h3>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={location?.state?.price}/>
            </Elements>
        </div>
    );
};

export default Payment;