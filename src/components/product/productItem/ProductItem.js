import React from "react";
import {Link} from "react-router-dom";
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import {useDispatch} from "react-redux";
import {ADD_TO_CART, CALCULATE_TOTALQTY} from "../../../redux/slice/cartSlice";

const ProductItem = ({
	grid,
	product,
	id,
	name,
	qty,
	price,
	imageUrl,
	description,
}) => {
	const dispatch = useDispatch();

	const shortenText = (text, n) => {
		if (text.length > n) {
			const shortenedText = text.slice(0, n).concat("...");
			return shortenedText;
		}
		return text;
	};

	const addToCart = (product) => {
		dispatch(ADD_TO_CART(product));
		dispatch(CALCULATE_TOTALQTY());
	};

	return (
		<Card>
			<div className={grid ? `${styles.grid}` : `${styles.list}`}>
				<Link to={`/product-details/${id}`}>
					<div className={styles.img}>
						<img src={imageUrl} alt={name} />
					</div>
				</Link>
				<div className={styles.content}>
					<div className={styles.details}>
						<h3>{`$${price}`}</h3>
						<h4>{shortenText(name, 18)}</h4>
						<p>{qty}</p>
					</div>
					{!grid && (
						<p className={styles.desc}>{shortenText(description, 200)}</p>
					)}

					<button className='--btn' onClick={() => addToCart(product)}>
						Add to Cart
					</button>
				</div>
			</div>
		</Card>
	);
};

export default ProductItem;
