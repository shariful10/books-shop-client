import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";
import { TCartProduct } from "../cart/cartSlice";

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
			transformResponse: (response: TResponseRedux<TCartProduct[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
			providesTags: ["Books"],
		}),
		getSingleBook: builder.query({
			query: (productId) => {
				return {
					url: `/books/${productId}`,
					method: "GET",
				};
			},
			transformResponse: (response: TResponseRedux<TCartProduct>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
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
		updateProduct: builder.mutation({
			query: (args) => ({
				url: `/books/${args.productId}`,
				method: "PUT",
				body: args.data,
			}),
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {
	useAddBookMutation,
	useGetAllBooksQuery,
	useGetSingleBookQuery,
	useDeleteProductMutation,
	useUpdateProductMutation,
} = bookManagementApi;
