import App from "@/App";
import AboutUs from "@/pages/AboutUsPage/AboutUs";
import Products from "@/pages/AllProductPage/Products";
import Cart from "@/pages/CartPage/Cart";
import Home from "@/pages/HomePage/Home";
import Login from "@/pages/LoginPage/Login";
import Register from "@/pages/RegisterPage/Register";

import Dashboard from "@/components/layout/dashboard/Dashboard";
import OrderManagement from "@/pages/Dashboard/OrderManagement";
import ProductManagement from "@/pages/Dashboard/ProductManagement";
import ProfileManagement from "@/pages/Dashboard/ProfileManagement";
import { createBrowserRouter } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";
import UserProtectedRoute from "./UserProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/products",
				element: <Products />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/about",
				element: <AboutUs />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/user/dashboard",
		element: (
			<UserProtectedRoute>
				<Dashboard />
			</UserProtectedRoute>
		),
		children: [
			{
				path: "profile-management",
				element: <ProfileManagement />,
				// },
				// {
				// 	path: "product-management",
				// 	element: <ProductManagement />,
				// },
				// {
				// 	path: "order-management",
				// 	element: <OrderManagement />,
			},
		],
	},
	{
		path: "/admin/dashboard",
		element: (
			<AdminProtectedRoute>
				<Dashboard />
			</AdminProtectedRoute>
		),
		children: [
			{
				path: "profile-management",
				element: <ProfileManagement />,
			},
			{
				path: "product-management",
				element: <ProductManagement />,
			},
			{
				path: "order-management",
				element: <OrderManagement />,
			},
		],
	},
]);

export default router;
