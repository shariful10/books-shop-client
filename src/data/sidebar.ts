import { Bot, Package, SquareTerminal } from "lucide-react";

export const adminData = {
	navMain: [
		{
			title: "Dashboard",
			url: "/admin/dashboard",
			icon: SquareTerminal,
			isActive: true,
		},
		{
			title: "Product Management",
			url: "#",
			icon: Package,
			items: [
				{
					title: "Product Management",
					url: "/admin/dashboard/product-management",
				},
			],
		},
		{
			title: "Order Management",
			url: "#",
			icon: Bot,
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
			title: "Dashboard",
			url: "/user/dashboard",
			icon: SquareTerminal,
			isActive: true,
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
