import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectEmail} from "../../redux/slice/authSlice";
import {admin_email} from "../../env";

const AdminOnlyRoutes = ({children}) => {
	const userEmail = useSelector(selectEmail);

	if (userEmail === admin_email) {
		return children;
	} else {
		return (
			<section style={{height: "80vh"}}>
				<div className='container'>
					<h2>Permision Denied</h2>
					<p>Bad Route</p>
					<br />
					<Link to='/'>
						<button className='admin-btn'>&larr; Go to Home</button>
					</Link>
				</div>
			</section>
		);
	}
};

export const AdminOnlyLink = ({children}) => {
	const userEmail = useSelector(selectEmail);

	if (userEmail === admin_email) {
		return children;
	} else {
		return null;
	}
};

export default AdminOnlyRoutes;
