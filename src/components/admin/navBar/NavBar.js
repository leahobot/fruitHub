import React from "react";
import styles from "./NavBar.module.scss";
import {FaUserCircle} from "react-icons/fa";
import {useSelector} from "react-redux";
import {selectUserName} from "../../../redux/slice/authSlice";
import {NavLink} from "react-router-dom";

const activeLink = ({isActive}) => {
	return isActive ? styles.active : "";
};

const NavBar = () => {
	const userName = useSelector(selectUserName);

	return (
		<div className={styles.navbar}>
			<div className={styles.user}>
				<FaUserCircle size={60} color='#fff' />
				<p>{userName}</p>
			</div>
			<nav>
				<ul>
					<li>
						<NavLink to='/admin/home' className={activeLink}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to='/admin/view-products' className={activeLink}>
							View All Products
						</NavLink>
					</li>
					<li>
						<NavLink to='/admin/add-products/add' className={activeLink}>
							Add Products
						</NavLink>
					</li>
					<li>
						<NavLink to='/admin/orders' className={activeLink}>
							Orders
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
