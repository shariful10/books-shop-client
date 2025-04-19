import { currencyFormatter } from "@/lib/currencyFormatter";
import {
	decrementOrderQuantity,
	incrementOrderQuantity,
	orderedProductsSelector,
	removeProduct,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
	const dispatch = useAppDispatch();
	const product = useAppSelector(orderedProductsSelector);

	const handleIncrementQuantity = (id: string) => {
		dispatch(incrementOrderQuantity(id));
	};

	const handleDecrementQuantity = (id: string) => {
		dispatch(decrementOrderQuantity(id));
	};

	const handleRemoveProduct = (id: string) => {
		dispatch(removeProduct(id));
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="relative cursor-pointer">
					<ShoppingCart className="mt-1" />
					<span className="absolute -top-1 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-sm font-semibold">
						{product?.length}
					</span>
				</div>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Cart</SheetTitle>
					{product?.length > 0 && (
						<SheetDescription>
							Your selected products are listed below.
						</SheetDescription>
					)}
				</SheetHeader>
				<div className="flex flex-col gap-4 px-5 overflow-y-scroll md:overflow-y-hidden">
					<div className="">
						{product?.length > 0 ? (
							product?.map((item) => (
								<div key={item?._id} className="flex gap-4 mb-4">
									<div className="w-1/3">
										<img
											src={item?.thumbnail}
											alt={item?.title}
											className="w-full"
										/>
									</div>
									<div className="w-2/3">
										<h2 className="text-lg font-semibold">{item?.title}</h2>
										<p className="text-sm text-gray-500">
											Category: {item?.category}
										</p>
										<p className="text-primary my-5">
											{currencyFormatter(item?.price)}
										</p>
										<div className="flex items-center gap-2">
											{/* <p className="text-gray-500 font-semibold">Quantity</p> */}
											<Button
												onClick={() =>
													handleDecrementQuantity(item?._id as string)
												}
												variant="outline"
												className="size-8 rounded-sm cursor-pointer"
											>
												<Minus />
											</Button>
											<p className="font-semibold text-xl p-2">
												{item?.orderQuantity}
											</p>
											<Button
												onClick={() =>
													handleIncrementQuantity(item?._id as string)
												}
												variant="outline"
												className="size-8 rounded-sm cursor-pointer"
											>
												<Plus />
											</Button>
											<Button
												onClick={() => handleRemoveProduct(item?._id as string)}
												variant="outline"
												className="size-8 rounded-sm cursor-pointer"
											>
												<Trash className="text-red-500/50" />
											</Button>
										</div>
									</div>
								</div>
							))
						) : (
							<p className="text-center">Your Cart is empty!</p>
						)}
					</div>
				</div>
				<SheetClose asChild>
					<Link to="/checkout" className="mx-5">
						<Button className="cursor-pointer w-full">
							Process to Checkout
						</Button>
					</Link>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
