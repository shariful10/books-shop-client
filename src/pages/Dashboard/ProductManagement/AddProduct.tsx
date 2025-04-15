import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
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
import { useAddBookMutation } from "@/redux/features/bookManagement/bookManagement";
import { useGetMeQuery } from "@/redux/features/userManagement/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddProduct = () => {
	const navigate = useNavigate();
	const user = useAppSelector(selectCurrentUser);
	const { data: me, isFetching } = useGetMeQuery(user?.email);

	const [addBook, { isLoading }] = useAddBookMutation();
	const author = me?.data;

	const form = useForm({
		defaultValues: {
			title: "",
			author: "",
			price: 0,
			category: "",
			thumbnail: "",
			description: "",
			quantity: 0,
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const modifiedData = {
			...data,
			price: Number(data.price),
			quantity: Number(data.quantity),
			author: author?._id,
			inStock: true,
		};

		try {
			const res = await addBook(modifiedData).unwrap();

			if (res.success) {
				toast.success(res.message);
				form.reset();
				navigate("/admin/dashboard/product-management");
			} else {
				toast.error(res.message);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<div className="flex justify-center items-center">
			<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
				<div className="flex items-center space-x-4 mb-5">
					<h1 className="text-xl font-bold">Add Product</h1>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product Name</FormLabel>
										<FormControl>
											<Input {...field} value={field.value || ""} />
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
												value={field.value || ""}
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
												value={field.value || ""}
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
												value={field.value || ""}
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
												value={field.value || ""}
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
							{isLoading ? "Adding Product....." : "Add Product"}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default AddProduct;
