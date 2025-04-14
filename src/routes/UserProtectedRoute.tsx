import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TChildren } from "@/types";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: TChildren) => {
	const user = useAppSelector(selectCurrentUser);

	if (!user) {
		return <Navigate to="/login" replace={true} />;
	}

	if (user?.role !== "user") {
		return <Navigate to="/" replace={true} />;
	}

	return children;
};

export default AdminProtectedRoute;
