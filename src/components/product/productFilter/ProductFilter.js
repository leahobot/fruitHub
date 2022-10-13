import React, {useState, useEffect} from "react";
import styles from "./ProductFilter.module.scss";
import {useSelector, useDispatch} from "react-redux";
import {
	selectProducts,
	selectMaxPrice,
	selectMinPrice,
} from "../../../redux/slice/productSlice";
import {
	FITER_BY_CATEGORY,
	FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
	const [category, setCategory] = useState("All");
	const dispatch = useDispatch();
	const [price, setPrice] = useState(20000);
	const minPrice = useSelector(selectMinPrice);
	const maxPrice = useSelector(selectMaxPrice);

	const products = useSelector(selectProducts);
	const allCategories = [
		"All",
		...new Set(products.map((product) => product.category)),
	];

	const filteredProducts = (item) => {
		setCategory(item);

		dispatch(FITER_BY_CATEGORY({products, category: item}));
	};

	const clearFilters = () => {
		setCategory("All");
		setPrice(maxPrice);
	};

	useEffect(() => {
		dispatch(FILTER_BY_PRICE({products, price}));
	}, [dispatch, products, price]);

	return (
		<div className={styles.filter}>
			<h4>Categories</h4>
			<div className={styles.category}>
				{allCategories.map((item, index) => (
					<button
						key={index}
						type='button'
						className={category === item ? `${styles.active}` : null}
						onClick={() => filteredProducts(item)}>
						&#8250;{item}
					</button>
				))}

				<div className={styles.brand}>
					<h4>Price</h4>
					<p>{`$${price}`}</p>
					<div className={styles.price}>
						<input
							name='price'
							type='range'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							min={minPrice}
							max={maxPrice}
						/>
					</div>
					<br />
					<button
						className={`--btn ${styles["btn-filter"]}`}
						onClick={clearFilters}>
						Clear Filter
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
