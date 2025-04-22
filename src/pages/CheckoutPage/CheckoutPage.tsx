import Container from "@/components/module/Container";
import BSTable from "@/components/module/table/BSTable";
import SectionTop from "@/components/SectionTop";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
	clearCart,
	decrementOrderQuantity,
	incrementOrderQuantity,
	orderedProductsSelector,
	orderSelector,
	removeProduct,
	subTotalSelector,
	TCartProduct,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ColumnDef } from "@tanstack/react-table";
import { Minus, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

const CheckoutPage = () => {
	const dispatch = useAppDispatch();
	const order = useAppSelector(orderSelector);
	const subTotal = useAppSelector(subTotalSelector);
	const products = useAppSelector(orderedProductsSelector);
	const [createOrder, { isLoading }] = useCreateOrderMutation();

	const handleIncrementQuantity = (id: string) => {
		dispatch(incrementOrderQuantity(id));
	};

	const handleDecrementQuantity = (id: string) => {
		dispatch(decrementOrderQuantity(id));
	};

	const handleRemoveProduct = (id: string) => {
		dispatch(removeProduct(id));
	};

	const handleOrder = async () => {
		const orderLoading = toast.loading("Order is being placed");

		try {
			if (products.length === 0) {
				throw new Error("Cart is empty, what are you trying to order ??");
			}

			const res = await createOrder(order);
			console.log(res?.data?.data);

			if (res?.data!.success) {
				toast.success(res?.data!.message, { id: orderLoading });
				dispatch(clearCart());
				window.location.href = res?.data?.data?.paymentUrl || "/";
			}

			if (!res?.data!.success) {
				toast.error(res?.data!.message, { id: orderLoading });
			}
		} catch (err: any) {
			toast.error(err.message, { id: orderLoading });
		}
	};

	const columns: ColumnDef<TCartProduct>[] = [
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => (
				<div className="flex items-center space-x-2">
					<img
						src={
							row.original.thumbnail
								? row.original.thumbnail
								: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg"
						}
						alt={row.original.title}
						className="size-8 rounded-md"
					/>
					<span className="truncate">{row.original.title}</span>
				</div>
			),
		},

		{
			accessorKey: "orderQuantity",
			header: "Order Quantity",
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<Button
						onClick={() => handleDecrementQuantity(row.original._id)}
						variant="outline"
						className="size-8 rounded-sm cursor-pointer"
					>
						<Minus />
					</Button>
					<p className="font-semibold text-xl p-2">
						{row.original.orderQuantity}
					</p>
					<Button
						onClick={() => handleIncrementQuantity(row.original._id)}
						variant="outline"
						className="size-8 rounded-sm cursor-pointer"
					>
						<Plus />
					</Button>
					<Button
						onClick={() => handleRemoveProduct(row.original._id)}
						variant="outline"
						className="size-8 rounded-sm cursor-pointer"
					>
						<Trash className="text-red-500/50" />
					</Button>
				</div>
			),
		},
		{
			accessorKey: "price",
			header: "Price",
			cell: ({ row }) => (
				<span>
					{row.original.price} x {row.original.orderQuantity}
				</span>
			),
		},
		{
			accessorKey: "totalPice",
			header: "Total Price",
			cell: ({ row }) => (
				<span>{row.original.price * row.original.orderQuantity}</span>
			),
		},
		{
			accessorKey: "action",
			header: "Action",
			cell: ({ row }) => (
				<div className="flex items-center space-x-3">
					<button
						className="text-gray-500 hover:text-red-500 cursor-pointer"
						title="Delete"
						onClick={() => handleRemoveProduct(row.original._id)}
					>
						<Trash className="w-5 h-5" />
					</button>
				</div>
			),
		},
	];

	return (
		<Container>
			<SectionTop pageTitle="Checkout" />
			<div className="grid md:grid-cols-3 gap-4 my-10">
				<div className="col-span-2">
					<BSTable columns={columns} data={products || []} />
				</div>
				<div className="col-span-1 border rounded-2xl mt-5">
					<div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
						<h1 className="text-2xl font-bold">Payment Details</h1>
						<div className="space-y-2 mt-4">
							<div className="flex justify-between">
								<p className="text-gray-500 ">Subtotal</p>
								<p className="font-semibold">{currencyFormatter(subTotal)}</p>
							</div>
							{/* <div className="flex justify-between">
								<p className="text-gray-500 ">Discount</p>
								<p className="font-semibold">{currencyFormatter(0)}</p>
							</div>
							<div className="flex justify-between">
								<p className="text-gray-500 ">Shipment Cost</p>
								<p className="font-semibold">{currencyFormatter(0)}</p>
							</div> */}
						</div>
						<div className="flex justify-between mt-10 mb-5">
							<p className="text-gray-500 ">Grand Total</p>
							<p className="font-semibold">{currencyFormatter(subTotal)}</p>
						</div>
						<Button
							onClick={handleOrder}
							disabled={isLoading}
							className="w-full text-xl font-semibold py-5 cursor-pointer"
						>
							{isLoading ? "Placing Order..." : "Place Order"}
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default CheckoutPage;
