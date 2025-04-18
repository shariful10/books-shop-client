import { cn } from "@/lib/utils";
import "./spinner.css";

type TSpinnerProps = {
	height?: string;
	className?: string;
};

const Spinner = ({ height, className }: TSpinnerProps) => {
	return (
		<div
			className={`flex flex-col justify-center items-center ${
				height ? height : "h-screen"
			}`}
		>
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
