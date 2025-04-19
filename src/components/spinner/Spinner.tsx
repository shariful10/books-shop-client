import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import "./spinner.css";

const Spinner = ({ className }: ComponentProps<"div">) => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div
				className={cn(
					"inline-block size-10 animate-spin rounded-full border-4 border-solid border-gray-300 border-t-primary",
					className
				)}
			/>
		</div>
	);
};

export default Spinner;
