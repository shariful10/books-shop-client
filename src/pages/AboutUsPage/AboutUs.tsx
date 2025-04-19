import Container from "@/components/module/Container";
import SectionTop from "@/components/SectionTop";

const AboutUs = () => {
	return (
		<Container>
			<SectionTop pageTitle="About Us" />
			<h2 className="text-3xl font-semibold mt-4">About Koparion</h2>
			<p className="text-gray-600 my-4">
				Welcome to Koparion, your go-to destination for books that inspire,
				educate, and entertain. Our mission is to create a haven for book lovers
				by offering a diverse collection of titles across various genres.
				Whether you're searching for the latest bestsellers, timeless classics,
				or hidden gems, Koparion is here to bring stories to your fingertips.
			</p>
			<div className="mb-2 mt-2">
				<h4 className="text-xl font-semibold">Our Story</h4>
				<p className="text-gray-600 mt-2">
					Koparion was founded with a simple yet powerful vision: to build a
					bookshop that connects readers with the books they love. We believe in
					the magic of storytelling and the impact books have on shaping
					perspectives, igniting imagination, and fostering knowledge.
				</p>
			</div>
			<div className="mb-2 mt-2">
				<h4 className="text-xl font-semibold">Join Our Community</h4>
				<p className="text-gray-600 mt-2">
					At Koparion, we believe books bring people together. Follow us on
					social media and stay updated with book recommendations, reading
					challenges, and exclusive offers.
				</p>
			</div>
			<p className="text-gray-600 my-4">
				Thank you for choosing Koparion—where every book finds its reader!
			</p>
		</Container>
	);
};

export default AboutUs;
