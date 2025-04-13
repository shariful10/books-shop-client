import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import React from "react";
import { useNavigate } from "react-router-dom";

type TBtnLogoutProps = {
	className?: string;
};

const BtnLogout: React.FC<TBtnLogoutProps> = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logOut());
		navigate("/login");
	};

	return (
		<Button
			className={cn(
				"hidden md:block text-white hover:text-primary bg-primary hover:bg-transparent border border-primaryColor px-4 py-2 rounded-md duration-500",
				className
			)}
			onClick={handleLogout}
		>
			Logout
		</Button>
	);
};

export default BtnLogout;
