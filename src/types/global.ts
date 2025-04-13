import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { Key, ReactNode } from "react";

export type TNavbarItems = {
	url: string;
	title: string;
};

export type TChildren = {
	children: ReactNode;
};

export type TError = {
	data: {
		message: string;
		stack: string;
		success: boolean;
	};
	status: number;
};

export type TMeta = {
	limit: number;
	page: number;
	total: number;
	totalPage: number;
};

export type TResponse<T> = {
	data?: T;
	error?: TError;
	meta?: TMeta;
	success: boolean;
	message: string;
	token?: null | string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
	name: string;
	value: boolean | Key;
};

export type TMessage = {
	message: string;
};

export type TAccessToken = {
	accessToken?: null | string;
};
