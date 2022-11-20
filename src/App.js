import React, {Fragment} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes, Route} from "react-router-dom";
import {
	Home,
	Admin,
	Contact,
	SignUp,
	Login,
	Reset,
	Cart,
	CheckoutDetails,
	CheckoutSuccess,
	Checkout,
	OrderHistory,
} from "./pages";
import {NavBar, Footer, ProductDetails} from "./components";
import AdminOnlyRoutes from "./components/adminOnlyRoutes/AdminOnlyRoutes";
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
					<Route
						path='/admin/*'
						element={
							<AdminOnlyRoutes>
								<Admin />
							</AdminOnlyRoutes>
						}
					/>
					<Route path='/product-details/:id' element={<ProductDetails />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signUp' element={<SignUp />} />
					<Route path='/reset' element={<Reset />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/checkout-details' element={<CheckoutDetails />} />
					<Route path='/checkout-success' element={<CheckoutSuccess />} />
					<Route path='/order-history' element={<OrderHistory />} />
				</Routes>
				<Footer />
			</div>
		</Fragment>
	);
}

export default App;
