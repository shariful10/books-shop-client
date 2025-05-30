import Container from "@/components/module/Container";
import ProductCard from "@/components/module/homePage/ProductCard";
import SectionTop from "@/components/SectionTop";
import Spinner from "@/components/spinner/Spinner";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useGetAllBooksQuery } from "@/redux/features/bookManagement/bookManagement";
import { TCartProduct } from "@/redux/features/cart/cartSlice";
import { useState } from "react";

const Products = () => {
	const [price, setPrice] = useState(0);
	const { data: products, isFetching } = useGetAllBooksQuery(undefined);

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<Container>
			<SectionTop pageTitle="All Products" />
			<div className="flex justify-between items-center">
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4">Filter by price</h2>
					<div className="md:flex items-center justify-between text-sm">
						<span>BDT {0}</span>
						<span>BDT {5000}</span>
					</div>
					<Slider
						max={5000}
						step={1}
						onValueChange={(value) => {
							setPrice(value[0]);
						}}
						className="md:w-[200px] my-3"
					/>
					<p className="text-sm">Selected Price: BDT {price}</p>
				</div>
				<Input
					type="search"
					className="md:w-[250px]"
					placeholder="Search by title, category etc."
					onChange={(e) => console.log(e.target.value)}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				{products?.data?.map((product: TCartProduct) => (
					<ProductCard key={product?._id} product={product} />
				))}
			</div>
		</Container>
	);
};

export default Products;
