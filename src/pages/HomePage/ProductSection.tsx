import Container from "@/components/module/Container";
import ProductCard from "@/components/module/homePage/ProductCard";
import SectionTitle from "@/components/module/homePage/SectionTitle";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { useGetAllBooksQuery } from "@/redux/features/bookManagement/bookManagement";
import { TCartProduct } from "@/redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

const ProductSection = () => {
	const { data: products, isFetching } = useGetAllBooksQuery(undefined);

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<Container>
			<SectionTitle title="Feature Products" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{products?.data?.slice(0, 6).map((product: TCartProduct) => (
					<ProductCard key={product?._id} product={product} />
				))}
			</div>
			<Link to="/products" className="flex justify-center items-center my-10">
				<Button className="cursor-pointer">View All</Button>
			</Link>
		</Container>
	);
};

export default ProductSection;
