import { baseApi } from "@/redux/api/baseApi";

const bookManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllBooks: builder.query({
			query: () => ({
				url: "/books",
				method: "GET",
			}),
			providesTags: ["Books"],
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

export const { useGetAllBooksQuery, useDeleteUserMutation } = bookManagementApi;
