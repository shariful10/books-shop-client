import { RootState } from "@/redux/store";
import { TBook } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface TCartProduct extends TBook {
	orderQuantity: number;
}

type TInitialState = {
	products: TCartProduct[];
	productId: string;
};

const initialState: TInitialState = {
	products: [],
	productId: "",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			console.log(action.payload, "action.payload");
			if (state.products.length === 0) {
				state.productId = action.payload._id;
			}

			const productToAdd = state.products.find(
				(product) => product._id === action.payload._id
			);

			if (productToAdd) {
				productToAdd.orderQuantity += 1;
				return;
			}

			state.products.push({ ...action.payload, orderQuantity: 1 });
		},
		incrementOrderQuantity: (state, action) => {
			const productToIncrement = state.products.find(
				(product) => product._id === action.payload
			);

			if (productToIncrement) {
				productToIncrement.orderQuantity += 1;
				return;
			}
		},
		decrementOrderQuantity: (state, action) => {
			const productToIncrement = state.products.find(
				(product) => product._id === action.payload
			);

			if (productToIncrement && productToIncrement.orderQuantity > 1) {
				productToIncrement.orderQuantity -= 1;
				return;
			}
		},
		removeProduct: (state, action) => {
			state.products = state.products.filter(
				(product) => product._id !== action.payload
			);
		},
	},
});

export const orderedProductsSelector = (state: RootState) => {
	return state.cart.products;
};

export const {
	addProduct,
	incrementOrderQuantity,
	decrementOrderQuantity,
	removeProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
