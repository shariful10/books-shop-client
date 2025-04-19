import App from "@/App";
import Dashboard from "@/components/layout/dashboard/Dashboard";
import AboutUs from "@/pages/AboutUsPage/AboutUs";
import Products from "@/pages/AllProductPage/Products";
import Cart from "@/pages/CartPage/Cart";
import AddProduct from "@/pages/Dashboard/Admin/AddProduct";
import OrderManagement from "@/pages/Dashboard/Admin/OrderManagement";
import ProductManagement from "@/pages/Dashboard/Admin/ProductManagement/ProductManagement";
import UserManagement from "@/pages/Dashboard/Admin/UserManagement";
import ProfileManagement from "@/pages/Dashboard/ProfileManagement";
import UserOrderManagement from "@/pages/Dashboard/User/UserOrderManagement";
import Home from "@/pages/HomePage/Home";
import Login from "@/pages/LoginPage/Login";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import Register from "@/pages/RegisterPage/Register";
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
				path: "/products/:productId",
				element: <ProductDetails />,
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
			},
			{
				path: "order-management",
				element: <UserOrderManagement />,
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
				path: "user-management",
				element: <UserManagement />,
			},
			{
				path: "product-management",
				element: <ProductManagement />,
			},
			{
				path: "add-product",
				element: <AddProduct />,
			},
			{
				path: "order-management",
				element: <OrderManagement />,
			},
		],
	},
]);

export default router;
