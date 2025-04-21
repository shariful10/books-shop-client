export type TOrder = {
	user: string;
	products: TOrderProduct[];
	totalAmount: number;
	paymentMethod: string;
};

export type TOrderProduct = {
	product: string;
	quantity: number;
	totalPrice: number;
};
