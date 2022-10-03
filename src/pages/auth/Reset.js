import React, {Fragment, useState} from "react";
import styles from "./Auth.module.scss";
import {Link} from "react-router-dom";
import logo from "../../assets/largeLogo.png";
import {Card, Loader} from "../../components";
import {auth} from "../../firebase/config";
import {sendPasswordResetEmail} from "firebase/auth";
import {toast} from "react-toastify";

const Reset = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const resetPassword = (e) => {
		e.preventDefault();

		setIsLoading(true);

		sendPasswordResetEmail(auth, email)
			.then(() => {
				setIsLoading(false);
				toast("Check email for password reset");
				setEmail("");
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				setIsLoading(false);
				toast.error("User not Found");
				setEmail("");
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
						<h2>Reset Password</h2>

						<form onSubmit={resetPassword}>
							<input
								type='email'
								placeholder='Email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<button type='submit' className='--btn --btn-primary --btn-block'>
								Reset
							</button>
							<div className={styles.links}>
								<p>
									<Link to='/login'>-Login</Link>
								</p>
								<p>
									<Link to='/signUp'>-Sign Up</Link>
								</p>
							</div>
						</form>
					</div>
				</Card>
			</section>
		</Fragment>
	);
};

export default Reset;
