import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
	const date = new Date().getFullYear();

	return <div className={styles.footer}>© {date} All Rights Reserved</div>;
};

export default Footer;
