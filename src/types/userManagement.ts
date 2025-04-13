import { TAccessToken } from "./global";

export type TUser = {
	_id: string;
	name: string;
	email: string;
	role: string;
	profileImg?: string;
	created_at: string;
	updated_at: string;
	__v: number;
};

export type TUserResponse = {
	success: boolean;
	message: string;
	data: TUser;
	accessToken: TAccessToken;
};
