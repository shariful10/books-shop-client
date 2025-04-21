import Container from "@/components/module/Container";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { NavLink, useNavigate } from "react-router-dom";
import Cart from "../Cart";
import Dropdown from "./Dropdown";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
	const navigate = useNavigate();

	const user = useAppSelector(selectCurrentUser);
	console.log(user);

	return (
		<div className="w-full border-b-2 border-b-primary sticky top-0 z-50 bg-background">
			<Container className="flex justify-between items-center py-3 text-2xl font-bold relative">
				<Logo className="w-auto h-10" />
				<div className="hidden md:block space-x-4 text-base text-[#222222] font-medium">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "text-primary font-bold" : "hover:text-primary"
						}
					>
						Home
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) =>
							isActive ? "text-primary font-bold" : "hover:text-primary"
						}
					>
						About
					</NavLink>
					<NavLink
						to="/products"
						className={({ isActive }) =>
							isActive ? "text-primary font-bold" : "hover:text-primary"
						}
					>
						All Products
					</NavLink>
				</div>
				<div className="flex items-center space-x-4">
					{user ? (
						<div className="flex items-center space-x-4">
							<Cart />
							<Dropdown />
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
