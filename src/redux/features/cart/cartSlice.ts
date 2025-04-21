import { RootState } from "@/redux/store";
import { TBook } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface TCartProduct extends TBook {
	orderQuantity: number;
	totalPrice: number;
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
		clearCart: (state) => {
			state.products = [];
		},
	},
});

export const orderedProductsSelector = (state: RootState) => {
	return state.cart.products;
};

// export const orderSelector = (state: RootState) => {
// 	return {
// 		products: state.cart.products.map((product) => ({
// 			product: product._id,
// 			quantity: product.orderQuantity,
// 		})),
// 		paymentMethod: "Online",
// 	};
// };

export const orderSelector = (state: RootState) => {
	const user = state.cart.products[0]?.author._id || "";

	const products = state.cart.products.map((product) => ({
		product: product._id,
		quantity: product.orderQuantity,
		totalPrice: product.price * product.orderQuantity,
	}));

	const totalAmount = state.cart.products.reduce((total, product) => {
		return total + product.price * product.orderQuantity;
	}, 0);

	return {
		user,
		products,
		totalAmount,
		paymentMethod: "Online",
	};
};

export const subTotalSelector = (state: RootState) => {
	return state.cart.products.reduce((acc, product) => {
		return acc + product.price * product.orderQuantity;
	}, 0);
};

export const {
	addProduct,
	incrementOrderQuantity,
	decrementOrderQuantity,
	removeProduct,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
