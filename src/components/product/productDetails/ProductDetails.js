import React, {useState, useEffect} from "react";
import styles from "./ProductDetails.module.scss";
import {Link, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase/config";
import {toast} from "react-toastify";
import Loader from "../../loader/Loader";

const ProductDetails = () => {
	const {id} = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const getProduct = async () => {
			setIsLoading(true);
			const docRef = doc(db, "fruitHub", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const item = {...docSnap.data(), id: id};
				setProduct(item);
				setIsLoading(false);
			} else {
				toast.error("Product not found");
				setIsLoading(false);
			}
		};
		getProduct();
	}, []);

	console.log(product);
	return (
		<section>
			<div className={`container ${styles.product}`}>
				<h2>Product Details</h2>
				<div>
					<Link to='/#products'>&larr; Back to Home Page</Link>
				</div>
				{product === null ? (
					isLoading && <Loader />
				) : (
					<div className={styles.details}>
						<div className={styles.img}>
							<img src={product.imageUrl} alt={product.name} />
						</div>
						<div className={styles.content}>
							<h2>{product.category}</h2>
							<h4>{product.name}</h4>
							<p className={styles.qty}>{product.qty}</p>
							<p className={styles.price}>{`$${product.price}`}</p>
							<p className={styles.desc}>{product.description}</p>
							<p>
								<b>SKU:</b> {product.id}
							</p>

							<div className={styles.count}>
								<button className='--btn'>-</button>
								<p>
									<b>1</b>
								</p>
								<button className='--btn'>+</button>
							</div>

							<button className={`--btn ${styles["details-btn"]}`}>
								Add to Cart
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductDetails;
