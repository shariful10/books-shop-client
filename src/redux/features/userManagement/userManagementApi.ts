import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux, TUser } from "@/types";

const userManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query({
			query: () => ({
				url: "/users",
				method: "GET",
			}),
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
