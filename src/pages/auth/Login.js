import React, {Fragment, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Auth.module.scss";
import {FaGoogle, FaFacebookSquare} from "react-icons/fa";
import logo from "../../assets/largeLogo.png";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import {signInWithEmailAndPassword} from "firebase/auth";
import {
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import {useSelector} from "react-redux";
import {selectPreviousUrl} from "../../redux/slice/cartSlice";
import {auth} from "../../firebase/config";
import {toast} from "react-toastify";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const previousUrl = useSelector(selectPreviousUrl);

	const redirectUser = () => {
		if (previousUrl.includes("cart")) {
			return navigate("/cart");
		}
		navigate("/");
	};

	const loginUser = (e) => {
		e.preventDefault();

		setIsLoading(true);

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// const user = userCredential.user;
				setIsLoading(false);
				toast("Login Successful!");
				setEmail("");
				setPassword("");
				redirectUser();
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				setIsLoading(false);
				toast.error("Login Failed");
				setEmail("");
				setPassword("");
			});
	};

	const provider1 = new GoogleAuthProvider();
	const signInWithGoogle = () => {
		setIsLoading(true);

		signInWithPopup(auth, provider1)
			.then((result) => {
				// const user = result.user;
				setIsLoading(false);
				toast("Login Successful!!");
				setEmail("");
				setPassword("");
				navigate("/");
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				toast.error("Login Failed");
				setIsLoading(false);
				setEmail("");
				setPassword("");
			});
	};

	const provider2 = new FacebookAuthProvider();
	const signInWithFacebook = () => {
		setIsLoading(true);

		signInWithPopup(auth, provider2)
			.then((result) => {
				setIsLoading(false);
				toast("Login Successful!!");
				setEmail("");
				setPassword("");
				navigate("/");
				// const user = result.user;
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				setIsLoading(false);
				toast.error("Login Failed");
				setEmail("");
				setPassword("");
			});
	};

	return (
		<Fragment>
			{isLoading && <Loader />}
			<section className={`${styles.auth} container`}>
				<div className={styles.img}>
					<img src={logo} alt='brand-logo' />
				</div>
				<Card>
					<div className={styles.form}>
						<h2>Login</h2>

						<form onSubmit={loginUser}>
							<input
								type='email'
								placeholder='Email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type='password'
								placeholder='Password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button type='submit' className='--btn --btn-primary --btn-block'>
								Login
							</button>
							<div className={styles.links}>
								<Link to='/reset'>
									<p>Reset Password</p>
								</Link>
							</div>
							<p>--or--</p>
						</form>
						<button
							className={` ${styles["btn-links"]} --btn --btn-danger --btn-block`}
							onClick={signInWithGoogle}>
							<FaGoogle color='white' />
							Login with Google
						</button>
						<button
							className='--btn --btn-danger --btn-block'
							onClick={signInWithFacebook}>
							<FaFacebookSquare color='white' />
							Login with Facebook
						</button>
						<span className={styles.signUp}>
							Don't have an account? <Link to='/signUp'>Sign Up</Link>
						</span>
					</div>
				</Card>
			</section>
		</Fragment>
	);
};

export default Login;
