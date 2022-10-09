import React from "react";
import styles from "./Admin.module.scss";
import {Routes, Route} from "react-router-dom";
import NavBar from "../../components/admin/navBar/NavBar";
import Home from "../../components/admin/home/Home";
import AddProducts from "../../components/admin/addProducts/AddProducts";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import Orders from "../../components/admin/orders/Orders";

const Admin = () => {
	return (
		<div className={styles.admin}>
			<div className={styles.navbar}>
				<NavBar />
			</div>
			<div className={styles.content}>
				<Routes>
					<Route path='home' element={<Home />} />
					<Route path='view-products' element={<ViewProducts />} />
					<Route path='add-products' element={<AddProducts />} />
					<Route path='orders' element={<Orders />} />
				</Routes>
			</div>
		</div>
	);
};

export default Admin;
