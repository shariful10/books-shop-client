import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/constants/categories";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
	useGetAllBooksQuery,
	useUpdateProductMutation,
} from "@/redux/features/bookManagement/bookManagement";
import { useGetMeQuery } from "@/redux/features/userManagement/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TUpdateProductProps = {
	isOpen: boolean;
	productId: string | null;
	onOpenChange: (isOpen: boolean) => void;
};

const UpdateProduct = ({
	isOpen,
	onOpenChange,
	productId,
}: TUpdateProductProps) => {
	const user = useAppSelector(selectCurrentUser);
	const { data: me, isFetching } = useGetMeQuery(user?.email);
	const author = me?.data;
	const [updateProduct, { isLoading }] = useUpdateProductMutation();

	const { data: books, isFetching: bIsFetching } =
		useGetAllBooksQuery(undefined);
	const product = books?.data!.find((book) => book._id === productId);

	const form = useForm();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const modifiedData = {
			productId,
			data: {
				price: Number(data.price),
				quantity: Number(data.quantity),
				...data,
			},
		};

		try {
			const res = await updateProduct(modifiedData).unwrap();
			console.log(res);
			if (res.success) {
				toast.success(res.message);
				onOpenChange(false);
			} else {
				toast.error(res.message);
			}
		} catch (err: any) {
			toast.error(err);
		}
	};

	if (isFetching) {
		return <Spinner />;
	}

	if (bIsFetching) {
		return <Spinner />;
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-fit overflow-y-scroll sm:overflow-y-hidden">
				<DialogHeader>
					<DialogTitle>Update Product</DialogTitle>
					<DialogDescription>
						Make changes to your product here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									form.handleSubmit(onSubmit)();
								}
							}}
						>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Product Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={field.value || product?.title}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="author"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Author</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={field.value || author?.name}
													readOnly
													disabled
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={field.value || product?.price}
													type="number"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select Product Category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{categories.map((category) => (
														<SelectItem key={category} value={category}>
															{category}
														</SelectItem>
													))}
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="quantity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Quantity</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={field.value || product?.quantity}
													type="number"
													placeholder="Product quantity"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="thumbnail"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Thumbnail</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={field.value || product?.thumbnail}
													placeholder="Paste URL here"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="my-5">
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													className="h-36 resize-none"
													{...field}
													value={field.value || product?.description}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button
								type="submit"
								className="mt-5 w-full cursor-pointer"
								disabled={isLoading}
							>
								{isLoading ? "Saving..." : "Save changes"}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateProduct;
