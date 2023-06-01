import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "./features/marketSlice";

export const store = configureStore({
	reducer: {
		shop: marketReducer,
	},
});
