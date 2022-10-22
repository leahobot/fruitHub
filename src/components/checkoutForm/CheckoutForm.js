import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectEmail, selectUserId} from "../../redux/slice/authSlice";
import {
	selectCartItems,
	selectCartTotalAmount,
	CLEAR_CART,
} from "../../redux/slice/cartSlice";
import {selectShippingAddress} from "../../redux/slice/checkoutSlice";
import styles from "./CheckoutForm.module.scss";
import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import Card from "../card/Card";
import Loader from "../loader/Loader";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import {toast} from "react-toastify";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userId = useSelector(selectUserId);
	const userEmail = useSelector(selectEmail);
	const cartItems = useSelector(selectCartItems);
	const cartTotalAmount = useSelector(selectCartTotalAmount);
	const shippingAddress = useSelector(selectShippingAddress);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret",
		);

		if (!clientSecret) {
			return;
		}
	}, [stripe]);

	const saveOrder = () => {};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setMessage(null);

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const confirmPayment = await stripe
			.confirmPayment({
				elements,
				confirmParams: {
					// Make sure to change this to your payment completion page
					return_url: "http://localhost:3000/checkout-success",
				},
				redirect_url: "if_required",
			})
			.then((result) => {
				//ok-paymentIntent, //bad-error
				if (result.error) {
					toast.error(result.error.message);
					setMessage(result.error.message);
					return;
				}
				if (result.paymentIntent) {
					if (result.paymentIntent.status === "succeeded") {
						setIsLoading(false);
						toast("Payment Successful");
						saveOrder();
					}
				}
			});

		setIsLoading(false);
	};

	return (
		<section>
			<div className={`container ${styles.checkout}`}>
				<h2>Checkout</h2>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div>
						<Card cardClass={styles.card}>
							<CheckoutSummary />
						</Card>
					</div>
					<div>
						<Card cardClass={`${styles.card} ${styles.pay}`}>
							<h3>Stripe Checkout</h3>
							<PaymentElement id={styles["payment-element"]} />
							<button
								disabled={isLoading || !stripe || !elements}
								id='submit'
								className={styles.button}>
								<span id='button-text'>
									{isLoading ? <Loader /> : "Pay now"}
								</span>
							</button>

							{/* Show any error or success messages */}
							{message && <div id={styles["payment-message"]}>{message}</div>}
						</Card>
					</div>
				</form>
			</div>
		</section>
	);
};

export default CheckoutForm;
