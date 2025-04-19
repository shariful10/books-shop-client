import Container from "@/components/module/Container";
import SectionTop from "@/components/SectionTop";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { useGetSingleBookQuery } from "@/redux/features/bookManagement/bookManagement";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
	const params = useParams();
	const { productId } = params;
	const { data: product, isFetching } = useGetSingleBookQuery(productId);

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<Container>
			<SectionTop pageTitle="Product Details" />
			<div className="md:flex gap-6 py-10">
				<div className="w-full md:w-1/2 border-2 rounded-md pb-2 pt-8 flex justify-center items-center">
					<img
						src={product?.data?.thumbnail}
						alt={product?.data?.title}
						className="w-[300px] h-[400px] object-cover rounded-md hover:scale-105 transition-all duration-300 ease-in-out"
					/>
				</div>
				<div className="w-full md:w-1/2">
					<h2 className="text-2xl font-semibold">{product?.data?.title}</h2>
					<p>Category: {product?.data?.category}</p>
					<p className="text-2xl text-primary my-5 font-semibold">
						{currencyFormatter(product?.data?.price as number)}
					</p>
					<p>
						Availability:{" "}
						{product?.data?.inStock === true ? "In Stock" : "Out of Stock"}
					</p>
					<div className="border border-b my-5" />
					<div className="hidden md:block w-[1px] bg-gray-300"></div>
					<p>{product?.data?.description}</p>
					{/* <div className="flex justify-between items-center gap-4">
						<div className="flex items-center gap-2">
							<p className="text-gray-500 font-semibold">Quantity</p>
							<Button
								onClick={() =>
									handleDecrementQuantity(product?.data?._id as string)
								}
								variant="outline"
								className="size-8 rounded-sm cursor-pointer"
							>
								<Minus />
							</Button>
							<p className="font-semibold text-xl p-2">
								{product?.data?.orderQuantity}
							</p>
							<Button
								onClick={() =>
									handleIncrementQuantity(product?.data?._id as string)
								}
								variant="outline"
								className="size-8 rounded-sm cursor-pointer"
							>
								<Plus />
							</Button>
							<Button
								onClick={() =>
									handleRemoveProduct(product?.data?._id as string)
								}
								variant="outline"
								className="size-8 rounded-sm cursor-pointer"
							>
								<Trash className="text-red-500/50" />
							</Button>
						</div>
						<Button className="cursor-pointer mt-5">Buy Now</Button>
						<Button className="cursor-pointer mt-5">Add to cart</Button>
					</div> */}
					<div className="grid grid-cols-2 gap-4">
						<Button className="cursor-pointer mt-5">Buy Now</Button>
						<Button className="cursor-pointer mt-5">Add to cart</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ProductDetails;
