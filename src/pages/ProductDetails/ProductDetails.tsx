import { useParams } from "react-router-dom";

const ProductDetails = () => {
	const params = useParams();
	const { productId } = params;
	console.log(productId);
	return (
		<>
			<h1>This is ProductDetails component.</h1>
		</>
	);
};

export default ProductDetails;
