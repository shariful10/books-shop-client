import Container from "@/components/module/Container";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
	const navigate = useNavigate();

	const user = useAppSelector(selectCurrentUser);

	return (
		<div className="relative w-full border-b-2 border-b-primary">
			<Container className="flex justify-between items-center py-3 text-2xl font-bold relative">
				<Logo />
				<div className="hidden md:block space-x-4 text-base text-[#222222] font-medium">
					<Link to="/">Home</Link>
					<Link to="/about">About</Link>
					<Link to="/cart">Cart</Link>
				</div>
				<div className="flex items-center space-x-4">
					{user ? (
						<div className="flex items-center space-x-4">
							{user && <Dropdown />}
						</div>
					) : (
						<div className="space-x-4 hidden md:block">
							<Button
								onClick={() => navigate("/login")}
								className="cursor-pointer"
							>
								Login
							</Button>
							<Button
								onClick={() => navigate("/register")}
								className="cursor-pointer"
							>
								Sign Up
							</Button>
						</div>
					)}
					<div className="flex items-center space-x-3 justify-end">
						<MobileNavbar />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Navbar;
