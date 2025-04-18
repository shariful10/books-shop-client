import { Package, SquareTerminal, User, Users } from "lucide-react";

export const adminData = {
	navMain: [
		{
			title: "Profile Management",
			url: "/admin/dashboard/profile-management",
			icon: User,
		},
		{
			title: "User Management",
			url: "/admin/dashboard/user-management",
			icon: Users,
		},
		{
			title: "Product Management",
			url: "#",
			icon: Package,
			items: [
				{
					title: "Add Product",
					url: "/admin/dashboard/add-product",
				},
				{
					title: "Product Management",
					url: "/admin/dashboard/product-management",
				},
			],
		},
		{
			title: "Order Management",
			url: "#",
			icon: SquareTerminal,
			items: [
				{
					title: "Order Management",
					url: "/admin/dashboard/order-management",
				},
			],
		},
	],
};

export const userData = {
	navMain: [
		{
			title: "Profile Management",
			url: "/user/dashboard/profile-management",
			icon: User,
		},
		{
			title: "Order Management",
			url: "/user/dashboard/order-management",
			icon: SquareTerminal,
		},
	],
};
