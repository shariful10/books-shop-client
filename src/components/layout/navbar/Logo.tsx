import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Logo = ({ className }: { className?: string }) => {
	return (
		<>
			<Link to="/">
				<img
					src="https://demo.towerthemes.com/tt_koparion/image/catalog/logo/logo.png"
					alt=""
					className={cn("", className)}
				/>
			</Link>
		</>
	);
};

export default Logo;
