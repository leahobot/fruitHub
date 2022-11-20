import React from "react";
import styles from "./OrderHistory.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";

const Order = () => {
	const {data, isLoading} = useFetchCollection("orders");

	console.log(data);

	return <div>Order</div>;
};

export default Order;
