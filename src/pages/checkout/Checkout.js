import React, {useState, useEffect, Fragment} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {CheckoutForm} from "../../components";
import {useSelector, useDispatch} from "react-redux";
import {
	selectCartItems,
	selectCartTotalAmount,
	CALCULATE_SUBTOTAL,
	CALCULATE_TOTALQTY,
} from "../../redux/slice/cartSlice";
import {selectEmail} from "../../redux/slice/authSlice";
import {
	selectBillingAddress,
	selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import {toast} from "react-toastify";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

const Checkout = () => {
	const [message, setMessage] = useState("Initializing Checkout...");
	const [clientSecret, setClientSecret] = useState("");

	const cartItems = useSelector(selectCartItems);
	const totalAmount = useSelector(selectCartTotalAmount);
	const customerEmail = useSelector(selectEmail);
	const shippingAddress = useSelector(selectShippingAddress);
	const billingAddress = useSelector(selectBillingAddress);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(CALCULATE_SUBTOTAL());
		dispatch(CALCULATE_TOTALQTY());
	}, [dispatch, cartItems]);

	const description = `FruitHub payment: email: ${customerEmail}, Amount : ${totalAmount}`;

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("https://localhost:4242/create-payment-intent/", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				items: cartItems,
				userEmail: customerEmail,
				shipping: shippingAddress,
				billing: billingAddress,
				description,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json;
				}
				return res.json().then((json) => Promise.reject(json));
			})
			.then((data) => {
				setClientSecret(data.clientSecret);
			})
			.catch((error) => {
				setMessage("Failed to initialize checkout");
				toast.error(error.message);
			});
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<Fragment>
			<section>
				<div className='container'>{!clientSecret && <h3>{message}</h3>}</div>
			</section>

			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</Fragment>
	);
};

export default Checkout;
