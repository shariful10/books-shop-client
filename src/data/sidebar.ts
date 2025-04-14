import { Package, SquareTerminal, User, Users } from "lucide-react";

export const adminData = {
	navMain: [
		// {
		// 	title: "Dashboard",
		// 	url: "/admin/dashboard",
		// 	icon: SquareTerminal,
		// 	isActive: true,
		// },
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
					title: "Product Management",
					url: "/admin/dashboard/order-management",
				},
			],
		},
	],
	// navSecondary: [
	// 	{
	// 		title: "Support",
	// 		url: "#",
	// 		icon: LifeBuoy,
	// 	},
	// 	{
	// 		title: "Feedback",
	// 		url: "#",
	// 		icon: Send,
	// 	},
	// ],
};

export const userData = {
	navMain: [
		{
			title: "Profile Management",
			url: "/user/dashboard/profile-management",
			icon: User,
		},
		// {
		// 	title: "Shop",
		// 	url: "#",
		// 	icon: Bot,
		// 	items: [
		// 		{
		// 			title: "Manage Products",
		// 			url: "/user/shop/products",
		// 		},
		// 	],
		// },
	],
	// navSecondary: [
	// 	{
	// 		title: "Support",
	// 		url: "#",
	// 		icon: LifeBuoy,
	// 	},
	// 	{
	// 		title: "Feedback",
	// 		url: "#",
	// 		icon: Send,
	// 	},
	// ],
};
