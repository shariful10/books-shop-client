import StarFillIcon from "@/assets/StarFillIcon";
import Container from "@/components/module/Container";
import SectionTitle from "@/components/module/homePage/SectionTitle";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { useGetAllBooksQuery } from "@/redux/features/bookManagement/bookManagement";
import { TBook } from "@/types/book";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductSection = () => {
	const { data: products } = useGetAllBooksQuery(undefined);
	console.log(products);

	return (
		<Container>
			<SectionTitle title="Feature Products" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{products?.data?.slice(0, 6).map((product: TBook) => (
					<div key={product?._id} className="border-2 rounded-md pt-1 pb-2">
						<img src={product?.thumbnail} alt={product?.title} />
						<div className="mb-2 px-5">
							<div className="flex justify-between items-center mb-5">
								<h2 className="font-semibold">{product?.title}</h2>
								<p className="font-semibold">
									{currencyFormatter(product?.price)}
								</p>
							</div>
							<div className="flex justify-between items-center gap-4">
								<Button className="cursor-pointer">Buy Now</Button>
								<Button className="cursor-pointer">
									<ShoppingCart />
								</Button>
								<p className="font-semibold flex items-center gap-1">
									<StarFillIcon />
									<span>N/A</span>
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<Link to="/products" className="flex justify-center items-center my-10">
				<Button className="cursor-pointer">View All</Button>
			</Link>
		</Container>
	);
};

export default ProductSection;
