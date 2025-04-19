import Container from "@/components/module/Container";
import ProductCard from "@/components/module/homePage/ProductCard";
import Spinner from "@/components/spinner/Spinner";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useGetAllBooksQuery } from "@/redux/features/bookManagement/bookManagement";
import { TBook } from "@/types";
import { useState } from "react";

const Products = () => {
	const [price, setPrice] = useState(0);
	const { data: products, isFetching } = useGetAllBooksQuery(undefined);

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<Container>
			<div className="flex justify-center items-center text-white bg-primary h-[300px] rounded-2xl my-10">
				<h1 className="text-2xl font-bold">All Products</h1>
			</div>
			<div className="flex justify-between items-center">
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4">Filter by price</h2>
					<div className="md:flex items-center justify-between text-sm mb-2">
						<span>{0}</span>
						<span>{5000}</span>
					</div>
					<Slider
						max={5000}
						step={1}
						onValueChange={(value) => {
							setPrice(value[0]);
						}}
						className="md:w-[200px]"
					/>
					<p className="text-sm mt-2">Selected Price: {price}</p>
				</div>
				<Input
					type="search"
					className="md:w-[250px]"
					placeholder="Search by title, category etc."
					onChange={(e) => console.log(e.target.value)}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				{products?.data?.map((product: TBook) => (
					<ProductCard key={product?._id} product={product} />
				))}
			</div>
		</Container>
	);
};

export default Products;
