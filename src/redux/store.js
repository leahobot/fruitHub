import {configureStore, combineReducers} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filtereReducer from "./slice/filterSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	product: productReducer,
	filter: filtereReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
