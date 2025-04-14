import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MobileNavbar = () => {
	const navigate = useNavigate();
	const user = useAppSelector(selectCurrentUser);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="md:hidden">
					<Menu />
				</div>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="text-start">Logo</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col justify-center gap-4 pl-4">
						<Link to="/">Home</Link>
						<Link to="/about">About</Link>
						<Link to="/cart">Cart</Link>
					</div>
				</div>
				<div className="md:hidden p-4">
					{!user && (
						<div className="space-y-4 flex flex-col">
							<Button onClick={() => navigate("/login")}>Login</Button>
							<Button onClick={() => navigate("/register")}>Sign Up</Button>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNavbar;
