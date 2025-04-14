import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userRole } from "@/constants";
import { adminPaths, userPaths } from "@/data/pathItems";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Dropdown = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);

	const role = user?.role ?? userRole.USER;

	let items;

	switch (role) {
		case userRole.USER:
			items = userPaths;
			break;
		case userRole.ADMIN:
			items = adminPaths;
			break;
		case userRole.SUPER_ADMIN:
			items = adminPaths;
			break;
		default:
			break;
	}

	const handleLogout = () => {
		dispatch(logOut());
		navigate("/login");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="border-2 border-primary object-cover cursor-pointer">
					<AvatarImage
						src={
							user?.profileImg
								? user?.profileImg
								: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg"
						}
						alt={user?.name ?? ""}
					/>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="absolute -left-28 md:-left-5 md:w-56">
				<DropdownMenuLabel>
					<div>
						<h4>Name: {user!.name}</h4>
						<p className="text-sm">Email: {user!.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{items?.map((item) => (
					<DropdownMenuItem key={item.title} asChild className="">
						<Link to={item.url} className="whitespace-nowrap cursor-pointer">
							{item.title}
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className="cursor-pointer hover:text-red-500"
				>
					<LogOut className="size-4 hover:text-red-500" />
					<span>Log Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Dropdown;
