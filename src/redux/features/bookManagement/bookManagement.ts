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
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `/books/${productId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Books"],
		}),
		addBook: builder.mutation({
			query: (data) => ({
				url: "/books",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllBooksQuery,
	useDeleteProductMutation,
	useAddBookMutation,
} = bookManagementApi;
