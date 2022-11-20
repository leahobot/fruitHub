import React, {Fragment, useState} from "react";
import logo from "../../assets/largeLogo.png";
import Loader from "../../components/loader/Loader";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/config";
import styles from "./Auth.module.scss";
import {Link, useNavigate} from "react-router-dom";
import Card from "../../components/card/Card";
import {toast} from "react-toastify";

const SignUp = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [conPassword, setConPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const registerUser = (e) => {
		e.preventDefault();
		if (password !== conPassword) {
			toast.error("Password does not match");
		}

		setIsLoading(true);

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// const user = userCredential.user;

				setIsLoading(false);
				toast("Sign Up Successful!!");
				setEmail("");
				setPassword("");
				setConPassword("");

				navigate("/login");
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				toast.error("Sign Up Unsuccessful");
				setIsLoading(false);
				setEmail("");
				setPassword("");
				setConPassword("");
			});
	};

	return (
		<Fragment>
			{isLoading && <Loader />}
			<section className={`${styles.auth} container`}>
				<Card>
					<div className={styles.form}>
						<h2>Sign Up</h2>
						<form onSubmit={registerUser}>
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
							<input
								type='password'
								placeholder='Confirm Password'
								required
								value={conPassword}
								onChange={(e) => setConPassword(e.target.value)}
							/>
							<button type='submit' className='--btn --btn-primary --btn-block'>
								Sign Up
							</button>
						</form>
						<span className={styles.signUp}>
							Already have an account? <Link to='/login'>Login</Link>
						</span>
					</div>
				</Card>
				<div className={styles.img}>
					<img src={logo} alt='brand-logo' />
				</div>
			</section>
		</Fragment>
	);
};

export default SignUp;
