import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import styles from "./TopBanner.module.css";

const TopBanner = () => {
	const navigate = useNavigate();

	return (
		<div className={`${styles.banner} text-white`}>
			<div className="bg-[#00000037] h-[300px] md:h-[600px] flex flex-col justify-center">
				<div className="ml-20 space-y-4">
					<h3 className="text-3xl md:text-[40px] leading-6 md:leading-10 font-bold">
						We can help get your
					</h3>
					<h1 className="text-[44px] md:text-[80px] leading-[44px] md:leading-[80px] font-bold">
						Books in Order
					</h1>
					<div className="mt-8">
						<Button
							onClick={() => navigate("/products")}
							className="text-base md:text-xl bg-[#f07c29] hover:bg-[#222222] border border-[#f07c29] hover:border-[#222222] rounded-md px-6 py-5 md:py-6 cursor-pointer"
						>
							Shop Now
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopBanner;
