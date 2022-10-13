import React, {useState, useEffect} from "react";
import styles from "./Product.module.scss";
import {IoFilter} from "react-icons/io5";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {useSelector, useDispatch} from "react-redux";
import {STORE_PRODUCTS, GET_PRICE_RANGE} from "../../redux/slice/productSlice";
import {selectProducts} from "../../redux/slice/productSlice";
import Loader from "../loader/Loader";

const Product = () => {
	const dispatch = useDispatch();
	const {data, isLoading} = useFetchCollection("fruitHub");
	const products = useSelector(selectProducts);
	const [showFilter, setShowFilter] = useState(false);

	useEffect(() => {
		dispatch(
			STORE_PRODUCTS({
				products: data,
			}),
		);

		dispatch(GET_PRICE_RANGE({products: data}));
	}, [dispatch, data]);

	return (
		<section>
			{isLoading && <Loader />}
			<div className={`container ${styles.product}`}>
				<aside
					className={
						showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
					}>
					<ProductFilter />
				</aside>
				<div className={styles.content}>
					<ProductList products={products} />
					<div
						className={styles.icon}
						onClick={() => setShowFilter((previous) => !previous)}>
						<IoFilter size={30} color='#FFBA08' />
						<p>
							<b style={{color: "#64685A"}}>
								{showFilter ? "Hide Filter" : "Show Filter"}
							</b>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Product;
