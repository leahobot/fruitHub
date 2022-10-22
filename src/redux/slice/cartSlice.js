import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
	cartItems: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],
	cartTotalQty: 0,
	cartTotalAmount: 0,
	previousUrl: "",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		ADD_TO_CART(state, action) {
			const productIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id,
			);

			if (productIndex >= 0) {
				//Item already exists in the cart
				//Increase the cart Qty of that item
				state.cartItems[productIndex].cartQty += 1;
				toast(`${action.payload.name} increased by one`, {
					position: "top-left",
				});
			} else {
				//Item doesn't exists in the cart
				//Add item to the cart
				const tempProduct = {...action.payload, cartQty: 1};
				state.cartItems.push(tempProduct);
				toast(`${action.payload.name} added to cart`, {position: "top-left"});
			}

			//set cart to local storage
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		DECRESASE_CART(state, action) {
			const productIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id,
			);

			if (state.cartItems[productIndex].cartQty > 1) {
				state.cartItems[productIndex].cartQty -= 1;
				toast.info(`${action.payload.name} decreased by one`, {
					position: "top-left",
				});
			} else if (state.cartItems[productIndex].cartQty === 1) {
				const newCartItem = state.cartItems.filter(
					(item) => item.id !== action.payload.id,
				);
				state.cartItems = newCartItem;
				toast.error(`${action.payload.name} removed from cart`, {
					position: "top-left",
				});
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		REMOVE_FROM_CART(state, action) {
			const newCartItem = state.cartItems.filter(
				(item) => item.id !== action.payload.id,
			);
			state.cartItems = newCartItem;
			toast.error(`${action.payload.name} removed from cart`, {
				position: "top-left",
			});
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		CLEAR_CART(state, action) {
			state.cartItems = [];

			toast.error("Cart Cleared", {
				position: "top-left",
			});
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		CALCULATE_SUBTOTAL(state, action) {
			const array = [];
			state.cartItems.map((item) => {
				const {price, cartQty} = item;
				const cartItemAmount = price * cartQty;
				return array.push(cartItemAmount);
			});

			const totalAmount = array.reduce((a, b) => a + b, 0);

			state.cartTotalAmount = totalAmount;
		},

		CALCULATE_TOTALQTY(state, action) {
			const array = [];
			state.cartItems.map((item) => {
				const {cartQty} = item;
				return array.push(cartQty);
			});

			const totalQty = array.reduce((a, b) => a + b, 0);

			state.cartTotalQty = totalQty;
		},

		SAVE_URL(state, action) {
			state.previousUrl = action.payload;
		},
	},
});

export const {
	ADD_TO_CART,
	DECRESASE_CART,
	REMOVE_FROM_CART,
	CLEAR_CART,
	CALCULATE_SUBTOTAL,
	CALCULATE_TOTALQTY,
	SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartTotalQty = (state) => state.cart.cartTotalQty;

export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export const selectPreviousUrl = (state) => state.cart.previousUrl;

export default cartSlice.reducer;
