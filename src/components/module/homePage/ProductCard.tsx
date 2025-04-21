import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { addProduct, TCartProduct } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { TBook } from "@/types";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type TProductCardProps = {
	product: TCartProduct;
};

const ProductCard = ({ product }: TProductCardProps) => {
	const dispatch = useAppDispatch();

	const handleAddProduct = (product: TBook) => {
		try {
			dispatch(addProduct(product));
			toast.success("Product added to cart successfully!");
		} catch (err: any) {
			toast.error(err?.message);
		}
	};

	return (
		<div key={product?._id} className="border-2 rounded-md pt-1 pb-2">
			<img src={product?.thumbnail} alt={product?.title} />
			<div className="mb-2 px-5">
				<div className="flex justify-between items-center mb-5">
					<div className="font-semibold">
						<h2>{product?.title}</h2>
						<p>Category: {product?.category}</p>
					</div>
					<p className="font-semibold">{currencyFormatter(product?.price)}</p>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					{/* <Button className="cursor-pointer">Buy Now</Button> */}
					{product?.inStock ? (
						<Button
							className="cursor-pointer"
							onClick={() => handleAddProduct(product)}
						>
							Add to cart
						</Button>
					) : (
						<Button
							disabled
							className="cursor-not-allowed bg-red-400"
							onClick={() => handleAddProduct(product)}
						>
							Add to cart
						</Button>
					)}
					<Link
						to={`/products/${product?._id}`}
						className="flex justify-center items-center w-full"
					>
						<Button className="cursor-pointer w-full">View Details</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
