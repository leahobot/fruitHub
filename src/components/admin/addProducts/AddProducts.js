import React, {useState} from "react";
import styles from "./AddProducts.module.scss";
import Card from "../../card/Card";
import {toast} from "react-toastify";
import {
	ref,
	getStorage,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import {storage, db} from "../../../firebase/config";

const categories = [
	{
		id: 1,
		name: "Exotic Fresh Fruits",
	},
	{
		id: 1,
		name: "Exotic Dry Fruits",
	},
	{
		id: 1,
		name: "Exotic Cut Fruits",
	},
	{
		id: 1,
		name: "Exotic Fresh Veggies",
	},
	{
		id: 1,
		name: "Exotic Herbs",
	},
	{
		id: 1,
		name: "Exotic Seasonal Fruits",
	},
];

const AddProducts = () => {
	const fruitDetails = {
		fruitName: "",
		imageUrl: "",
		price: 0,
		category: "",
		description: "",
	};

	const [fruit, setFruit] = useState(fruitDetails);
	const [uploadProgress, setUploadProgress] = useState(0);

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
				toast.error("Upload Failed");
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFruit({...fruitDetails, imageUrl: downloadURL});
					toast("Upload Successful");
				});
			},
		);
	};

	const addFruit = (e) => {
		e.preventDefault();

		try {
		} catch (error) {}

		// setFruit(fruitDetails);
	};

	return (
		<div className={styles.product}>
			<h3>Add New Product</h3>
			<Card className={styles.card}>
				<form onSubmit={(e) => addFruit(e)}>
					<label>Fruit Name</label>
					<input
						type='text'
						placeholder='Fruit Name'
						name='fruitName'
						value={fruit.fruitName}
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
						<option value='' disabled>
							--Choose Fruit Category--
						</option>
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
					<button type='submit' className='--btn --btn-primary'>
						Save
					</button>
				</form>
			</Card>
		</div>
	);
};

export default AddProducts;
