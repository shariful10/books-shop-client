import { cn } from "@/lib/utils";
import { TChildren } from "@/types";

type TContainerProps = {
	className?: string;
};

const Container = ({ children, className }: TChildren & TContainerProps) => {
	return (
		<div className={cn("w-full max-w-7xl mx-auto px-6 sm:px-0", className)}>
			{children}
		</div>
	);
};

export default Container;
