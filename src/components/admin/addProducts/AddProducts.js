import React, {Fragment, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./AddProducts.module.scss";
import Card from "../../card/Card";
import {toast} from "react-toastify";
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import {storage, collectionRef} from "../../../firebase/config";
import {addDoc, setDoc, doc, Timestamp} from "firebase/firestore";
import Loader from "../../loader/Loader";
import {db} from "../../../firebase/config";
import {useSelector} from "react-redux";
import {selectProducts} from "../../../redux/slice/productSlice";

const categories = [
	{
		id: 1,
		name: "Exotic Fresh Fruits",
	},
	{
		id: 2,
		name: "Exotic Dry Fruits",
	},
	{
		id: 3,
		name: "Exotic Cut Fruits",
	},
	{
		id: 4,
		name: "Exotic Fresh Veggies",
	},
	{
		id: 5,
		name: "Exotic Herbs",
	},
	{
		id: 6,
		name: "Exotic Seasonal Fruits",
	},
];

const fruitDetails = {
	name: "",
	qty: "",
	imageUrl: "",
	price: 0,
	category: "",
	description: "",
};

const AddProducts = () => {
	const {id} = useParams();

	const products = useSelector(selectProducts);
	const productEdit = products.find((item) => item.id === id);

	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const detectForm = (id, addItem, editItem) => {
		if (id === "add") {
			return addItem;
		}
		return editItem;
	};

	const [fruit, setFruit] = useState(() => {
		const fruitState = detectForm(id, {...fruitDetails}, productEdit);
		return fruitState;
	});

	const handleInput = (e) => {
		const {name, value} = e.target;
		setFruit({...fruit, [name]: value});
	};

	const handleImage = (e) => {
		const file = e.target.files[0];

		const storageRef = ref(storage, `fruitHub/${Date.now()}${file.name}`);

		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
			},
			(error) => {
				toast.error("Image Upload Failed");
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFruit({...fruitDetails, imageUrl: downloadURL});
					toast("Image Upload Successful");
				});
			},
		);
	};

	const addProduct = (e) => {
		e.preventDefault();

		setIsLoading(true);
		try {
			addDoc(collectionRef, {
				createdAt: Timestamp.now().toDate(),
				name: fruit.name,
				qty: fruit.qty,
				imageUrl: fruit.imageUrl,
				price: Number(fruit.price),
				category: fruit.category,
				description: fruit.description,
			});

			setIsLoading(false);
			setUploadProgress(0);
			setFruit({...fruitDetails});
			toast("Product uploaded seccessfully");
		} catch (error) {
			setIsLoading(false);
			setUploadProgress(0);
			toast.error("Product Upload failed");
		}
	};

	const editProduct = (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (fruit.imageUrl !== productEdit.imageUrl) {
			const storageRef = ref(storage, productEdit.imageUrl);
			deleteObject(storageRef);
		}
		try {
			setDoc(doc(db, "fruitHub", id), {
				createdAt: productEdit.createdAt,
				name: fruit.name,
				qty: fruit.qty,
				imageUrl: fruit.imageUrl,
				price: Number(fruit.price),
				category: fruit.category,
				description: fruit.description,
				editedAt: Timestamp.now().toDate(),
			});
			setIsLoading(false);
			setUploadProgress(0);
			setFruit({...fruitDetails});
			toast("Product Edited Successfully");
		} catch (error) {
			setIsLoading(false);
			setUploadProgress(0);
			toast.error("Edit failed");
		}
	};

	return (
		<Fragment>
			{isLoading && <Loader />}

			<div className={styles.product}>
				<h3>{detectForm(id, "Add New Product", "Edit Product")}</h3>
				<Card className={styles.card}>
					<form onSubmit={detectForm(id, addProduct, editProduct)}>
						<input
							type='text'
							placeholder='Fruit Name'
							name='name'
							value={fruit.name}
							onChange={(e) => handleInput(e)}
							required
						/>

						<input
							type='text'
							placeholder='Quantity'
							name='qty'
							value={fruit.qty}
							onChange={(e) => handleInput(e)}
							required
						/>
						<label>Fruit Image</label>
						<Card>
							<div className={styles.group}>
								{uploadProgress === 0 ? null : (
									<div className={styles.progress}>
										<div
											className={styles["progress-bar"]}
											style={{width: `${Math.round(uploadProgress)}%`}}>
											{uploadProgress < 100
												? `uploading... ${Math.round(uploadProgress)}%`
												: `${uploadProgress}%`}
										</div>
									</div>
								)}
								<input
									type='file'
									name='image'
									accept='image/*'
									onChange={(e) => handleImage(e)}
								/>
								{fruit.imageUrl === "" ? null : (
									<input
										type='text'
										name='imageUrl'
										placeholder='FruitImage'
										value={fruit.imageUrl}
										disabled
										required
									/>
								)}
							</div>
						</Card>
						<label>Price</label>
						<input
							type='number'
							placeholder='Price'
							name='price'
							value={fruit.price}
							onChange={(e) => handleInput(e)}
							required
						/>
						<label>Fruit Category</label>
						<select
							name='category'
							required
							value={fruit.category}
							onChange={(e) => handleInput(e)}>
							<option value=''>--Choose Fruit Category--</option>
							{categories.map((category, index) => (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
						<label>Fruit Description</label>
						<textarea
							name='description'
							value={fruit.description}
							onChange={(e) => handleInput(e)}
							cols='30'
							rows='10'
							required
						/>
						<button type='submit' className='btn --btn --btn-primary'>
							Save
						</button>
					</form>
				</Card>
			</div>
		</Fragment>
	);
};

export default AddProducts;
