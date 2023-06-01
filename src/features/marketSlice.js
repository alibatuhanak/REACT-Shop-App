import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../data";
import { toast } from "react-toastify";

const initialState = {
	allFoods: [],
	likedItems: [],
	cartItems: [],
	option: 1,
	query: "",
	totalCredits: 999,
	totalAmount: 0,
	isPending: false,
	isError: false,
};

export const foodFetch = createAsyncThunk("shop/foodFetch", async (body, { rejectWithValue }) => {
	try {
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const marketSlice = createSlice({
	initialState,
	name: "shop",
	reducers: {
		search: (state, { payload }) => {
			state.query = payload;
		},
		addLikedItem: (state, action) => {
			const newLikedItem = action.payload;
			const existingLikedItem = state.likedItems.find(x => x.id === newLikedItem.id);

			if (!existingLikedItem) {
				state.likedItems.push({
					id: newLikedItem.id,
					img: newLikedItem.img,
					name: newLikedItem.name,
					price: newLikedItem.price,
					kg: newLikedItem.kg,
				});
			} else {
				const filteringLikedItem = state.likedItems.filter(item => item.id !== newLikedItem.id);
				state.likedItems = filteringLikedItem;
			}
		},
		deleteAllLikedItems: state => {
			if (state.likedItems.length !== 0) {
				toast("All favorites deleted successfully.", {
					position: "top-center",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				state.likedItems = [];
			}
		},
		addCartItem: (state, action) => {
			const newCartItem = action.payload;
			const existingCartItem = state.cartItems.find(x => x.id === newCartItem.id);
			if (!existingCartItem) {
				state.cartItems.push({
					id: newCartItem.id,
					img: newCartItem.img,
					name: newCartItem.name,
					price: newCartItem.price,
					kg: newCartItem.kg,
					qty: 1,
				});
				state.totalAmount += parseFloat(newCartItem.price);
			} else {
				const updateQty = state.cartItems.map(x => (x.id === existingCartItem.id ? { ...x, qty: ++existingCartItem.qty } : { ...x }));
				state.totalAmount += parseFloat(existingCartItem.price);
				state.cartItems = updateQty;
			}
		},
		buyNow: state => {
			if (state.totalAmount > state.totalCredits) {
				toast("You need more credits to buy.", {
					position: "top-center",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			} else if (state.cartItems.length !== 0) {
				toast("🤑Thanks for purchased it.", {
					position: "top-center",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				state.totalCredits -= state.totalAmount;
				state.totalAmount = 0;
				state.cartItems = [];
			}
		},
		deleteAllCartItems: state => {
			if (state.cartItems.length !== 0) {
				toast("All items deleted successfuly.", {
					position: "top-center",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				state.cartItems = [];
				state.totalAmount = 0;
			}
		},
		deleteCartItem: (state, action) => {
			const item = action.payload;
			const existingItem = state.cartItems.find(x => x.id === item.id);

			if (existingItem.qty === 1) {
				state.cartItems = state.cartItems.filter(x => x.id !== item.id);
			} else {
				const reduceQty = state.cartItems.map(x => (x.id === existingItem.id ? { ...x, qty: --existingItem.qty } : { ...x }));
				state.cartItems = reduceQty;
			}
			state.totalAmount -= parseFloat(existingItem.price);
		},
		changeCategory: (state, action) => {
			const category = action.payload;
			if (category === "Vegetables") {
				state.allFoods = data;
				state.option = 2;
				state.allFoods = state.allFoods.filter(x => x.tag === "Vegetables");
			} else if (category === "Fruits") {
				state.allFoods = data;
				state.option = 3;
				state.allFoods = state.allFoods.filter(x => x.tag === "Fruits");
			} else if (category === "Drinks") {
				state.allFoods = data;
				state.option = 4;
				state.allFoods = state.allFoods.filter(x => x.tag === "Drinks");
			} else if (category === "Desserts") {
				state.allFoods = data;
				state.option = 5;
				state.allFoods = state.allFoods.filter(x => x.tag === "Dessert");
			} else if (category === "Meats") {
				state.allFoods = data;
				state.option = 6;
				state.allFoods = state.allFoods.filter(x => x.tag === "Meat and fish");
			} else if (category === "Others") {
				state.allFoods = data;
				state.option = 7;
				const s = data.filter(x => x.tag === "Snacks");
				const b = data.filter(x => x.tag === "Breads");
				const p = data.filter(x => x.tag === "Pasta");
				const j = data.filter(x => x.tag === "Japanese Foods");
				const br = data.filter(x => x.tag === "Breakfast");
				state.allFoods = [...s, ...b, ...p, ...j, ...br];
			} else {
				state.allFoods = data;
				state.option = 1;
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(foodFetch.pending, state => {
				state.isPending = true;
				state.isError = false;
			})
			.addCase(foodFetch.fulfilled, (state, { payload }) => {
				state.allFoods = payload;
				state.isPending = false;
				state.isError = false;
			})
			.addCase(foodFetch.rejected, state => {
				state.allFoods = [];
				state.isError = true;
				state.isPending = false;
			});
	},
});

export const { addLikedItem, addCartItem, deleteCartItem, changeCategory, deleteAllCartItems, deleteAllLikedItems, buyNow, search } = marketSlice.actions;

export default marketSlice.reducer;
