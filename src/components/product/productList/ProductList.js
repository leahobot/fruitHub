import React, {Fragment, useState, useEffect} from "react";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import {useSelector, useDispatch} from "react-redux";
import {
	selectFilteredProducts,
	FILTER_BY_SEARCH,
	SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";
import styles from "./ProductList.module.scss";
import {BsFillGridFill} from "react-icons/bs";
import {FaListAlt} from "react-icons/fa";

const ProductList = ({products}) => {
	const [grid, setGrid] = useState(true);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("latest");
	const filteredProducts = useSelector(selectFilteredProducts);
	const dispatch = useDispatch();

	//Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [productPerPage] = useState(9);

	//Get Current Products
	const indexOfLastProduct = currentPage * productPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	);

	useEffect(() => {
		dispatch(
			FILTER_BY_SEARCH({
				products,
				search,
			}),
		);

		dispatch(SORT_PRODUCTS({products, sort}));
	}, [dispatch, products, search, sort]);

	return (
		<div className={styles["product-list"]} id='product'>
			<div className={styles.top}>
				<div className={styles.icons}>
					<BsFillGridFill
						size={22}
						color='#FFBA08'
						onClick={() => setGrid(true)}
					/>
					<FaListAlt size={24} color='#778062' onClick={() => setGrid(false)} />
					<p>
						<b>{filteredProducts.length}</b> Products found.
					</p>
				</div>
				<div>
					<Search value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>
				<div className={styles.sort}>
					<label>Sort by:</label>
					<select value={sort} onChange={(e) => setSort(e.target.value)}>
						<option value='latest'>Latest</option>
						<option value='lowest-price'>Lowest Price</option>
						<option value='highest-price'>Highest Price</option>
						<option value='a-z'>A - Z</option>
						<option value='z-a'>Z - A</option>
					</select>
				</div>
			</div>
			<div className={grid ? `${styles.grid}` : `${styles.list}`}>
				{products.length === 0 ? (
					<p>No product found.</p>
				) : (
					<Fragment>
						{currentProducts.map((product) => {
							return (
								<div key={product.id}>
									<ProductItem {...product} grid={grid} product={product} />
								</div>
							);
						})}
					</Fragment>
				)}
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					productPerPage={productPerPage}
					totalProducts={filteredProducts.length}
				/>
			</div>
		</div>
	);
};

export default ProductList;
