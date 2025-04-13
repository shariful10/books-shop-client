import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),
		register: builder.mutation({
			query: (body) => ({
				url: "/users/create-user",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
