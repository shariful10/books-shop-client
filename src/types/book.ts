export type TBook = {
	_id: string;
	title: string;
	author: string;
	price: number;
	category: string;
	description: string;
	quantity: number;
	inStock: boolean;
	thumbnail: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};
