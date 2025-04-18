import { cn } from "@/lib/utils";

type TSectionTitleProps = {
	title: string;
	className?: string;
};

const SectionTitle = ({ title, className }: TSectionTitleProps) => {
	return (
		<div className={cn("text-center py-10", className)}>
			<h2 className="text-4xl font-bold text-[#222222]">{title}</h2>
		</div>
	);
};

export default SectionTitle;
