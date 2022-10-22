import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Card from "../../components/card/Card";
import styles from "./CheckoutDetails.module.scss";
import {CheckoutSummary} from "../../components";
import {CountryDropdown} from "react-country-region-selector";
import {
	SAVE_BILLING_ADDRESS,
	SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";

const CheckoutDetails = () => {
	const initialAddressState = {
		name: "",
		line1: "",
		line2: "",
		city: "",
		postal_code: "",
		country: "",
		phone: "",
	};

	const [shippingAddress, setShippingAddress] = useState({
		...initialAddressState,
	});
	const [billingAddress, setBillingAddress] = useState({
		...initialAddressState,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleShipping = (e) => {
		const {name, value} = e.target;
		setShippingAddress({
			...shippingAddress,
			[name]: value,
		});
	};

	const handleBilling = (e) => {
		const {name, value} = e.target;
		setBillingAddress({
			...billingAddress,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
		dispatch(SAVE_BILLING_ADDRESS(billingAddress));

		navigate("/checkout");
	};

	return (
		<section>
			<div className={`container ${styles.checkout}`}>
				<h2>Checkout Details</h2>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div>
						<Card cardClass={styles.card}>
							<h3>Shipping Address</h3>
							<label>Recipient Name</label>
							<input
								name='name'
								type='text'
								placeholder='Recipient Name'
								value={shippingAddress.name}
								required
								onChange={(e) => handleShipping(e)}
							/>
							<label>Address Line 1</label>
							<input
								name='line1'
								type='text'
								placeholder='Address Line 1'
								value={shippingAddress.line1}
								required
								onChange={(e) => handleShipping(e)}
							/>
							<label>Address Line 2</label>
							<input
								name='line2'
								type='text'
								placeholder='Address Line 2'
								value={shippingAddress.line2}
								onChange={(e) => handleShipping(e)}
							/>
							<label>City</label>
							<input
								name='city'
								type='text'
								placeholder='City'
								required
								value={shippingAddress.city}
								onChange={(e) => handleShipping(e)}
							/>
							<label>State</label>
							<input
								name='state'
								type='text'
								placeholder='State'
								required
								value={shippingAddress.state}
								onChange={(e) => handleShipping(e)}
							/>
							<label>Postal Code</label>
							<input
								name='postal_code'
								type='text'
								placeholder='Postal Code'
								required
								value={shippingAddress.postal_code}
								onChange={(e) => handleShipping(e)}
							/>

							<CountryDropdown
								className={styles.select}
								valueType='short'
								value={shippingAddress.country}
								onChange={(val) =>
									handleShipping({
										target: {
											name: "country",
											value: val,
										},
									})
								}
							/>

							<label>Phone</label>
							<input
								name='phone'
								type='text'
								placeholder='Phone'
								required
								value={shippingAddress.phone}
								onChange={(e) => handleShipping(e)}
							/>
						</Card>

						{/*Billing Address */}
						<Card cardClass={styles.card}>
							<h3>Billing Address</h3>
							<label>Recipient Name</label>
							<input
								name='name'
								type='text'
								placeholder='Recipient Name'
								value={billingAddress.name}
								required
								onChange={(e) => handleBilling(e)}
							/>
							<label>Address Line 1</label>
							<input
								name='line1'
								type='text'
								placeholder='Address Line 1'
								value={billingAddress.line1}
								required
								onChange={(e) => handleBilling(e)}
							/>
							<label>Address Line 2</label>
							<input
								name='line2'
								type='text'
								placeholder='Address Line 2'
								value={billingAddress.line2}
								onChange={(e) => handleBilling(e)}
							/>
							<label>City</label>
							<input
								name='city'
								type='text'
								placeholder='City'
								required
								value={billingAddress.city}
								onChange={(e) => handleBilling(e)}
							/>
							<label>State</label>
							<input
								name='state'
								type='text'
								placeholder='State'
								required
								value={billingAddress.state}
								onChange={(e) => handleBilling(e)}
							/>
							<label>Postal Code</label>
							<input
								name='postal_code'
								type='text'
								placeholder='Postal Code'
								required
								value={billingAddress.postal_code}
								onChange={(e) => handleBilling(e)}
							/>

							<CountryDropdown
								className={styles.select}
								valueType='short'
								value={billingAddress.country}
								onChange={(val) =>
									handleBilling({
										target: {
											name: "country",
											value: val,
										},
									})
								}
							/>

							<label>Phone</label>
							<input
								name='phone'
								type='text'
								placeholder='Phone'
								required
								value={billingAddress.phone}
								onChange={(e) => handleBilling(e)}
							/>

							<button type='submit' className='--btn --btn-primary'>
								Proceed to Checkout
							</button>
						</Card>
					</div>
					<div>
						<Card cardClass={styles.card}>
							<CheckoutSummary />
						</Card>
					</div>
				</form>
			</div>
		</section>
	);
};

export default CheckoutDetails;
