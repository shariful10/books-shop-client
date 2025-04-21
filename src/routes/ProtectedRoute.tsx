import Spinner from "@/components/spinner/Spinner";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/userManagement/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TChildren } from "@/types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: TChildren) => {
	const user = useAppSelector(selectCurrentUser);

	const { isFetching } = useGetMeQuery(user?.email);

	if (isFetching) {
		return <Spinner />;
	}

	if (!user) {
		return <Navigate to="/login" replace={true} />;
	}

	return children;
};

export default ProtectedRoute;
