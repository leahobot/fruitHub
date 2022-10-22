import React, {Fragment, useEffect} from "react";
import styles from "./Cart.module.scss";
import {useSelector} from "react-redux";
import {
	selectCartItems,
	selectCartTotalAmount,
	selectCartTotalQty,
	ADD_TO_CART,
	DECRESASE_CART,
	REMOVE_FROM_CART,
	CLEAR_CART,
	CALCULATE_SUBTOTAL,
	CALCULATE_TOTALQTY,
	SAVE_URL,
} from "../../redux/slice/cartSlice";
import {selectIsLoggedIn} from "../../redux/slice/authSlice";
import {Link, useNavigate} from "react-router-dom";
import {BsTrash} from "react-icons/bs";
import Card from "../../components/card/Card";
import {useDispatch} from "react-redux";

const Cart = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotalAmount = useSelector(selectCartTotalAmount);
	const cartTotalQty = useSelector(selectCartTotalQty);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const increaseCart = (item) => {
		dispatch(ADD_TO_CART(item));
	};

	const decreaseCart = (item) => {
		dispatch(DECRESASE_CART(item));
	};

	const removeFromCart = (item) => {
		dispatch(REMOVE_FROM_CART(item));
	};

	const clearCart = () => {
		dispatch(CLEAR_CART());
	};

	useEffect(() => {
		dispatch(CALCULATE_SUBTOTAL());

		dispatch(CALCULATE_TOTALQTY());

		dispatch(SAVE_URL(""));
	}, [cartItems, dispatch]);

	const url = window.location.href;

	const checkout = () => {
		if (isLoggedIn) {
			navigate("/checkout-details");
		} else {
			dispatch(SAVE_URL(url));
			navigate("/login");
		}
	};

	return (
		<section>
			<div className={`container ${styles.table}`}>
				<h2>Shopping Cart</h2>
				{cartItems.length === 0 ? (
					<Fragment>
						<p>Your cart is Empty</p>
						<br />
						<div>
							<Link to='/#products'>&larr; Continue Shopping</Link>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<table>
							<thead>
								<tr>
									<th>s/n</th>
									<th>Product</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Total</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item, index) => {
									const {id, name, price, imageUrl, cartQty} = item;
									return (
										<tr key={id}>
											<td>{index + 1}</td>
											<td>
												<p>
													<b>{name}</b>
												</p>
												<img
													src={imageUrl}
													alt={name}
													style={{
														width: "80px",
														height: "50px",
														objectFit: "cover",
														borderRadius: "5px",
													}}
												/>
											</td>
											<td>{`$${price}`}</td>
											<td>
												<div className={styles.count}>
													<button
														className='--btn'
														onClick={() => decreaseCart(item)}>
														-
													</button>
													<p>
														<b>{cartQty}</b>
													</p>
													<button
														className='--btn'
														onClick={() => increaseCart(item)}>
														+
													</button>
												</div>
											</td>
											<td>{(price * cartQty).toFixed(2)}</td>
											<td className={styles.icons}>
												{
													<BsTrash
														size={18}
														color='red'
														onClick={() => removeFromCart(item)}
													/>
												}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<div className={styles.summary}>
							<button className='--btn --btn-dagner' onClick={clearCart}>
								Clear Cart
							</button>
							<div className={styles.checkout}>
								<div>
									<Link to='/#products'>&larr; Continue Shopping</Link>
								</div>
								<br />
								<Card cardClass={styles.card}>
									<p>
										Cart Item(s): <b>{cartTotalQty}</b>
									</p>
									<div className={styles.text}>
										<h4>Subtotal:</h4>
										<h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
									</div>
									<p>Tax and Shipping calculated st checkout</p>
									<button
										className='--btn --btn-primary --btn-block'
										onClick={checkout}>
										Checkout
									</button>
								</Card>
							</div>
						</div>
					</Fragment>
				)}
			</div>
		</section>
	);
};

export default Cart;
