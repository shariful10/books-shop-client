import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TUser } from "@/types";

const userManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/users",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TUser[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
			providesTags: ["Users"],
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
		deleteUser: builder.mutation({
			query: (userId) => ({
				url: `/users/${userId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
	}),
});

export const { useGetAllUsersQuery, useGetMeQuery, useDeleteUserMutation } =
	userManagementApi;
