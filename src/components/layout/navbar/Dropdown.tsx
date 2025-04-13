import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nameFormatter } from "@/lib/nameFormatter";
// import { adminPaths, userPaths } from "@/data/sidebar.data";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/userManagement/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";

const Dropdown = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const user = useAppSelector(selectCurrentUser);
	const { data: me } = useGetMeQuery(user?.email);

	// let dropdownItems;

	// switch (me?.data?.role) {
	// 	case userRole.USER:
	// 		dropdownItems = userPaths;
	// 		break;
	// 	case userRole.ADMIN:
	// 		dropdownItems = adminPaths;
	// 		break;
	// 	case userRole.SUPER_ADMIN:
	// 		dropdownItems = adminPaths;
	// 		break;
	// 	default:
	// 		break;
	// }

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar
					onClick={() => setIsOpen(!isOpen)}
					className="border-2 border-primaryColor object-cover cursor-pointer"
				>
					<AvatarImage
						src={
							me?.data
								? me.data?.profileImg
								: "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
						}
						alt={me?.data?.name ?? ""}
					/>
					<AvatarFallback>
						{me?.data ? nameFormatter(me.data!.name) : "N/A"}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64 flex flex-col gap-3 p-3 absolute top-2 -left-6">
				<div className="border-b border-gray-300 pb-3">
					<h4>Name: {me?.data!.name}</h4>
					<p className="text-sm">Email {me?.data!.email}</p>
				</div>
				{/* {dropdownItems?.map((item, idx) => (
					<Link key={idx} to={item.url} className="">
						{item.title}
					</Link>
				))} */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Dropdown;
