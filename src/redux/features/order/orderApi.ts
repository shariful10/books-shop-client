import { baseApi } from "@/redux/api/baseApi";
import { TOrder } from "@/types/order";

const orderManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order: TOrder) => ({
				url: "/orders",
				method: "POST",
				body: order,
			}),
		}),
	}),
});

export const { useCreateOrderMutation } = orderManagementApi;
