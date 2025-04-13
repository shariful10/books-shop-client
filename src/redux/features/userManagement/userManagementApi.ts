import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux, TUser } from "@/types";

const userManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query({
			query: () => ({
				url: "/users",
				method: "GET",
			}),
		}),
		getMe: builder.query({
			query: (email) => ({
				url: `/users/me/${email}`,
				method: "GET",
			}),
			transformResponse: (response: TResponseRedux<TUser>) => {
				return {
					data: response.data,
				};
			},
		}),
	}),
});

export const { useGetAllUsersQuery, useGetMeQuery } = userManagementApi;
