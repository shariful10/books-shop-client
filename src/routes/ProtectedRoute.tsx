import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TChildren } from "@/types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: TChildren) => {
	const token = useAppSelector(useCurrentToken);

	if (!token) {
		return <Navigate to="/login" replace={true} />;
	}
	return children;
};

export default ProtectedRoute;
