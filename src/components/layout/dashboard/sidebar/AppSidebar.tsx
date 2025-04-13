import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { userRole } from "@/constants";
import { adminData, userData } from "@/data/sidebar";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import Logo from "../../navbar/Logo";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

// This is sample data.
// const adminData = {
// 	navMain: [
// 		{
// 			title: "Dashboard",
// 			url: "/user/dashboard",
// 			icon: SquareTerminal,
// 			isActive: true,
// 		},
// 		{
// 			title: "wehfhui champion",
// 			url: "#",
// 			icon: Bot,
// 			items: [
// 				{
// 					title: "Manage Products",
// 					url: "/user/shop/products",
// 				},
// 				{
// 					title: "Manage Categories",
// 					url: "/user/shop/category",
// 				},
// 				{
// 					title: "Manage Brands",
// 					url: "/user/shop/brand",
// 				},
// 				{
// 					title: "Manage Coupon",
// 					url: "/user/shop/coupon",
// 				},
// 			],
// 		},
// 		// {
// 		// 	title: "Settings",
// 		// 	url: "#",
// 		// 	icon: Settings,
// 		// 	items: [
// 		// 		{
// 		// 			title: "Profile",
// 		// 			url: "/profile",
// 		// 		},
// 		// 	],
// 		// },
// 	],
// 	navSecondary: [
// 		{
// 			title: "Support",
// 			url: "#",
// 			icon: LifeBuoy,
// 		},
// 		{
// 			title: "Feedback",
// 			url: "#",
// 			icon: Send,
// 		},
// 	],
// };

// const userData = {
// 	navMain: [
// 		{
// 			title: "Dashboard",
// 			url: "/user/dashboard",
// 			icon: SquareTerminal,
// 			isActive: true,
// 		},
// 		{
// 			title: "Shop",
// 			url: "#",
// 			icon: Bot,
// 			items: [
// 				{
// 					title: "Manage Products",
// 					url: "/user/shop/products",
// 				},
// 				{
// 					title: "Manage Categories",
// 					url: "/user/shop/category",
// 				},
// 				{
// 					title: "Manage Brands",
// 					url: "/user/shop/brand",
// 				},
// 				{
// 					title: "Manage Coupon",
// 					url: "/user/shop/coupon",
// 				},
// 			],
// 		},
// 		{
// 			title: "Settings",
// 			url: "#",
// 			icon: Settings,
// 			items: [
// 				{
// 					title: "Profile",
// 					url: "/profile",
// 				},
// 			],
// 		},
// 	],
// 	navSecondary: [
// 		{
// 			title: "Support",
// 			url: "#",
// 			icon: LifeBuoy,
// 		},
// 		{
// 			title: "Feedback",
// 			url: "#",
// 			icon: Send,
// 		},
// 	],
// };

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
	const role = "admin";
	let data;

	switch (role) {
		case userRole.USER:
			data = userData;
			break;
		case userRole.ADMIN:
			data = adminData;
			break;
		case userRole.SUPER_ADMIN:
			data = adminData;
			break;
		default:
			break;
	}
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/">
								<div className="flex items-end justify-center">
									<Logo />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<h2 className="text-xl font-bold">NextMart</h2>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data!.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
