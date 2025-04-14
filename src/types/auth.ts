import { TUser } from "./userManagement";

export type TLoggedUser = {
	name: string;
	email: string;
	role: string;
	iat: number;
	exp: number;
	profileImg?: string;
};

export type TAuthState = {
	user: null | TLoggedUser | TUser;
	token: null | string;
};
