import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	products: [],
	minPrice: null,
	maxPrice: null,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		STORE_PRODUCTS: (state, action) => {
			state.products = action.payload.products;
		},

		GET_PRICE_RANGE(state, action) {
			const {products} = action.payload;
			const priceArray = [];

			products.map((product) => {
				const price = product.price;
				return priceArray.push(price);
			});

			const max = Math.max(...priceArray);
			const min = Math.min(...priceArray);

			state.minPrice = min;
			state.maxPrice = max;
		},
	},
});

export const {STORE_PRODUCTS, GET_PRICE_RANGE} = productSlice.actions;

export const selectProducts = (state) => state.product.products;

export const selectMinPrice = (state) => state.product.minPrice;

export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
