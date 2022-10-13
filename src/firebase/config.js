import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, collection} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {firebase_api_key, firebase_api_id} from "../env";

export const firebaseConfig = {
	apiKey: firebase_api_key,
	authDomain: "fruithub-e4fed.firebaseapp.com",
	projectId: "fruithub-e4fed",
	storageBucket: "fruithub-e4fed.appspot.com",
	messagingSenderId: "379645506668",
	appId: firebase_api_id,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const collectionRef = collection(db, "fruitHub");
export const auth = getAuth(app);
export const storage = getStorage();

export default app;
