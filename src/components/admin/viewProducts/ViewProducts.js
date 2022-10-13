import React, {useEffect, Fragment} from "react";
import styles from "./ViewProduts.module.scss";
import Loader from "../../loader/Loader";
import {toast} from "react-toastify";
import {db, storage} from "../../../firebase/config";
import {deleteDoc, doc} from "firebase/firestore";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import {ref, deleteObject} from "firebase/storage";
import Notiflix from "notiflix";
import {useDispatch, useSelector} from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {STORE_PRODUCTS} from "../../../redux/slice/productSlice";
import {selectProducts} from "../../../redux/slice/productSlice";

const ViewProducts = () => {
	const dispatch = useDispatch();
	const {data, isLoading} = useFetchCollection("fruitHub");
	const products = useSelector(selectProducts);

	useEffect(() => {
		dispatch(
			STORE_PRODUCTS({
				products: data,
			}),
		);
	}, [dispatch, data]);

	const confirmDelete = (id, imageUrl) => {
		Notiflix.Confirm.show(
			"Delete Product?",
			"You are about to delete this product?",
			"Delete",
			"Cancel",
			function okCb() {
				deleteProduct(id, imageUrl);
			},
			function cancelCb() {},
			{
				width: "320px",
				borderRadius: "3px",
				titleColor: "#E85D04",
				okButtonBackground: "#E85D04",
				cssAnimationStyle: "zoom",
			},
		);
	};

	const deleteProduct = async (id, imageUrl) => {
		try {
			const docRef = doc(db, "fruitHub", id);
			await deleteDoc(docRef);

			const storageRef = ref(storage, imageUrl);
			await deleteObject(storageRef);
			toast("product deleted successfully");
		} catch (error) {
			toast.error("delete failed");
		}
	};

	return (
		<Fragment>
			{isLoading && <Loader />}
			{products && (
				<div className={styles.table}>
					<h3>All Products</h3>
					<table>
						<thead>
							<tr>
								<th>s/n</th>
								<th>Image</th>
								<th className={styles.tableName}>Name</th>
								<th>Quantity</th>
								<th>Category</th>
								<th>Price</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, index) => {
								const {id, name, price, qty, imageUrl, category} = product;
								return (
									<tr key={id}>
										<td>{index + 1}</td>
										<td>
											<img src={imageUrl} alt={name} className={styles.image} />
										</td>
										<td>{name}</td>
										<td>{qty}</td>
										<td>{category}</td>
										<td>{`$${price}`}</td>
										<td className={styles.icons}>
											<Link to={`/admin/add-products/${id}`}>
												<FaEdit color='#848E6B' />
											</Link>

											<FaTrashAlt
												color='#E85D04'
												id={styles.trash}
												onClick={() => confirmDelete(id, imageUrl)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</Fragment>
	);
};

export default ViewProducts;
