import Container from "@/components/module/Container";
import { Button } from "@/components/ui/button";
import {
	selectCurrentUser,
	useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/userManagement/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { Link, useNavigate } from "react-router-dom";
import BtnLogout from "./BtnLogout";
import Dropdown from "./Dropdown";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
	const navigate = useNavigate();
	const token = useAppSelector(useCurrentToken);

	const user = useAppSelector(selectCurrentUser);
	const { data: me } = useGetMeQuery(user?.email);

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
					{token ? (
						<div className="flex items-center space-x-4">
							{me && <Dropdown />}
							<BtnLogout />
						</div>
					) : (
						<div className="space-x-4 hidden md:block">
							<Button onClick={() => navigate("/login")}>Login</Button>
							<Button onClick={() => navigate("/register")}>Sign Up</Button>
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
