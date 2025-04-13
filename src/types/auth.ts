import { TUser } from "./userManagement";

export type TLoggedUser = {
	email: string;
	role: string;
	iat: number;
	exp: number;
};

export type TAuthState = {
	user: null | TLoggedUser | TUser;
	token: null | string;
};
