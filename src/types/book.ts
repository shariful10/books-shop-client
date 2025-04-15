import { TUser } from "./userManagement";

export type TBook = {
	_id: string;
	title: string;
	author: TUser;
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
