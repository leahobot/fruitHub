import React, {useState, useEffect} from "react";
import styles from "./NavBar.module.scss";
import logo from "../../logo.png";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import {signOut, onAuthStateChanged} from "firebase/auth";
import {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} from "../../redux/slice/authSlice";
import {auth} from "../../firebase/config";
import {toast} from "react-toastify";
import {
	CALCULATE_TOTALQTY,
	selectCartTotalQty,
} from "../../redux/slice/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {ShowOnLogin, ShowOnLogout} from "../hideLinks/HideLinks";
import {AdminOnlyLink} from "../adminOnlyRoutes/AdminOnlyRoutes";

const NavBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [displayMenu, setDisplayMenu] = useState(false);
	const [displayUser, setDisplayUser] = useState("");
	const [scrollPage, setScrollPage] = useState(false);
	const cartTotalQty = useSelector(selectCartTotalQty);

	const fixNavBar = () => {
		if (window.scrollY > 50) {
			setScrollPage(true);
		} else {
			setScrollPage(false);
		}
	};
	window.addEventListener("scroll", fixNavBar);

	const activeLink = ({isActive}) =>
		isActive ? `${styles["active-color"]}` : "";

	const cartIcon = (
		<NavLink className={activeLink} to='/cart'>
			Cart
			<span>
				<FaShoppingCart />
				<p>{cartTotalQty}</p>
			</span>
		</NavLink>
	);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				if (user.displayName == null) {
					const emailArray = [...user.email];
					const convertEmail = emailArray.slice(0, emailArray.indexOf("@"));
					const userName =
						convertEmail[0].toUpperCase() + convertEmail.slice(1).join("");
					setDisplayUser(userName);
				} else {
					setDisplayUser(user.displayName);
				}

				dispatch(
					SET_ACTIVE_USER({
						email: user.email,
						userName: user.displayName ? user.displayName : displayUser,
						userId: uid,
					}),
				);
			} else {
				setDisplayUser("");
				dispatch(REMOVE_ACTIVE_USER());
			}
		});

		dispatch(CALCULATE_TOTALQTY());
	}, [dispatch, displayUser]);

	const logoutUser = () => {
		signOut(auth)
			.then(() => {
				toast("Logout Successful!");
				navigate("/");
			})
			.catch((error) => {
				toast.error("Logout Failed");
			});
	};

	return (
		<nav className={scrollPage ? `${styles.fixed}` : null}>
			<div className={styles.nav}>
				<div className={styles["logo-container"]}>
					<Link to='/'>
						<img src={logo} alt='brand-logo' />
					</Link>
				</div>
				<div
					className={
						displayMenu
							? `${styles["nav-wrapper"]} ${styles["display-nav"]}`
							: `${styles["nav-wrapper"]} ${styles["hide-nav"]}}`
					}>
					<div
						className={
							displayMenu
								? `${styles["wrapper"]} ${styles["show-wrapper"]}`
								: `${styles["wrapper"]}`
						}
						onClick={() => setDisplayMenu(false)}
					/>
					<ul onClick={() => setDisplayMenu(false)}>
						<li className={styles["logo-mobile"]}>
							<Link to='/'>
								<img src={logo} alt='brand-logo' />
							</Link>
							<FaTimes
								color='fff'
								size={22}
								onClick={() => setDisplayMenu(false)}
							/>
						</li>
						<li>
							<AdminOnlyLink>
								<Link to='/admin/home'>
									<button className='admin-btn'>Admin</button>
								</Link>
							</AdminOnlyLink>
						</li>
						<li>
							<NavLink to='/' className={activeLink}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' className={activeLink}>
								Contact Us
							</NavLink>
						</li>
					</ul>

					<div
						className={styles.navigation}
						onClick={() => setDisplayMenu(false)}>
						<ShowOnLogout>
							<NavLink to='/login' className={activeLink}>
								Login
							</NavLink>
						</ShowOnLogout>

						<ShowOnLogin>
							<a href='#profile' style={{color: "#FFBA08"}}>
								<FaUserCircle size={16} />
								Hi, {displayUser}
							</a>

							<NavLink to='/order' className={activeLink}>
								My Orders
							</NavLink>

							<NavLink to='/' onClick={logoutUser}>
								Logout
							</NavLink>
						</ShowOnLogin>

						{cartIcon}
					</div>
				</div>
			</div>

			<div className={styles["icon-container"]}>
				{cartIcon}
				<HiOutlineMenuAlt3
					size={28}
					onClick={() => setDisplayMenu((previous) => !previous)}
					className={styles["menu-icon"]}
				/>
			</div>
		</nav>
	);
};

export default NavBar;

// <ShowOnLogout>
// 	<NavLink to='/signup' className={activeLink}>
// 		Sign Up
// 	</NavLink>
// </ShowOnLogout>;
