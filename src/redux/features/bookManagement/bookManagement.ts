import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";
import { TBook } from "@/types/book";

const bookManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllBooks: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/books",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TBook[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
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
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {
	useGetAllBooksQuery,
	useDeleteProductMutation,
	useAddBookMutation,
} = bookManagementApi;
