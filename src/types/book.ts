import { TUser } from "./userManagement";

export type TBook = {
	_id: string;
	title: string;
	author: TUser;
	price: number;
	category: string;
	quantity: number;
	inStock: boolean;
	thumbnail: string;
	createdAt?: string;
	updatedAt?: string;
	description: string;
	__v?: number;
};
