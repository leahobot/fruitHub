import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {db} from "../firebase/config";

const useFetchCollection = (collectionName) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getCollection = () => {
		setIsLoading(true);
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, orderBy("createdAt", "desc"));
			onSnapshot(q, (snapshot) => {
				const allData = snapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setData(allData);
				setIsLoading(false);
			});
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getCollection();
	}, []);

	return {data, isLoading};
};

export default useFetchCollection;
