import Container from "@/components/module/Container";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="bg-primary text-white">
			<Container>
				<div className="md:flex justify-between gap-4 py-10">
					<div className="space-y-4 mb-4 md:mb-0">
						<h4 className="text-xl font-semibold">About Us</h4>
						<p className="text-white w-full md:w-[300px]">
							Welcome to Koparion, your destination for books that inspire,
							educate, and entertain. From bestsellers to timeless classics, we
							bring stories to your fingertips, creating a haven for book
							lovers.
						</p>
					</div>
					<div className="space-y-4 mb-4 md:mb-0">
						<h4 className="text-xl font-semibold">Quick Links</h4>
						<div className="flex flex-col gap-2">
							<Link to="/" className="text-white">
								Home
							</Link>
							<Link to="/about" className="text-white">
								About
							</Link>
							<Link to="/all-products" className="text-white">
								All Products
							</Link>
						</div>
					</div>
					<div className="space-y-4 mb-4 md:mb-0">
						<h4 className="text-xl font-semibold">Contact Us</h4>
						<div className="flex flex-col gap-2">
							<p className="text-white">Email: support@koparion.com</p>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-white">Phone: +1 (123) 456-7890</p>
						</div>
					</div>
				</div>
				<div className="mt-4 border-t border-gray-300 py-4">
					<p className="text-center text-white font-medium">
						&copy; {new Date().getFullYear()} Koparion. All rights reserved.
					</p>
				</div>
			</Container>
		</div>
	);
};

export default Footer;
