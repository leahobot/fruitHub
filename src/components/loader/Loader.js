import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import styles from "./Loader.module.scss";
import loader from "../../assets/loader.gif";

const Loader = () => {
	const [domReady, setDomReady] = useState(false);

	useEffect(() => {
		setDomReady(true);
	}, []);

	return domReady
		? ReactDOM.createPortal(
				<div className={styles.wrapper}>
					<div className={styles.loader}>
						<img src={loader} alt='loading-icon' />
					</div>
				</div>,
				document.getElementById("loader"),
		  )
		: null;
};

export default Loader;
