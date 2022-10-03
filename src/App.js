import React, {Fragment} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes, Route} from "react-router-dom";
import {Home, Admin, Contact, SignUp, Login, Reset} from "./pages";
import {NavBar, Footer} from "./components";
import "./App.scss";

function App() {
	return (
		<Fragment>
			<ToastContainer />
			<div>
				<NavBar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/admin' element={<Admin />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signUp' element={<SignUp />} />
					<Route path='/reset' element={<Reset />} />
				</Routes>
				<Footer />
			</div>
		</Fragment>
	);
}

export default App;
