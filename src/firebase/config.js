import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

export const firebaseConfig = {
	apiKey: "AIzaSyAc4au4AxfNbEE4XVCguQlr-5zV-0ylZII",
	authDomain: "fruithub-e4fed.firebaseapp.com",
	projectId: "fruithub-e4fed",
	storageBucket: "fruithub-e4fed.appspot.com",
	messagingSenderId: "379645506668",
	appId: "1:379645506668:web:a7301b9fcfe07131ced449",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const store = getStorage(app);

export default app;
