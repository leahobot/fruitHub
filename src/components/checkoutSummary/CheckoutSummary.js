import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
	selectCartItems,
	selectCartTotalAmount,
	selectCartTotalQty,
} from "../../redux/slice/cartSlice";
import Card from "../card/Card";
import styles from "./CheckoutSummary.module.scss";

const CheckoutSummary = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotalAmount = useSelector(selectCartTotalAmount);
	const cartTotalQty = useSelector(selectCartTotalQty);

	return (
		<div>
			<h3>Checkout Summary</h3>
			<div>
				{cartItems.lenght === 0 ? (
					<Fragment>
						<p>No item in your cart.</p>
						<button className='--btn'>
							<Link to='/#products'>Back To Shop</Link>
						</button>
					</Fragment>
				) : (
					<div>
						<p>
							Cart item(s): <b>{cartTotalQty}</b>
						</p>
						<div className={styles.text}>
							<h4>Subtotal:</h4>
							<h3>{cartTotalAmount.toFixed(2)}</h3>
						</div>
						{cartItems.map((item) => {
							const {id, name, price, cartQty} = item;
							return (
								<Card key={id} cardClass={styles.card}>
									<h4>Product: {name}</h4>
									<p>Quantity: {cartQty}</p>
									<p>Unit price: {price}</p>
									<p>Total: {price * cartQty}</p>
								</Card>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default CheckoutSummary;
