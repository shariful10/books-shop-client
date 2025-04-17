import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type TTablePaginationProps = {
	page: number;
	totalPage: number;
	setPage: Dispatch<SetStateAction<number>>;
};

const TablePagination = ({
	page,
	setPage,
	totalPage,
}: TTablePaginationProps) => {
	const handlePrev = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleNext = () => {
		if (page < totalPage) {
			setPage(page + 1);
		}
	};

	return (
		<div className="flex justify-center items-center gap-2 my-5">
			<Button
				onClick={handlePrev}
				disabled={page === 1}
				variant="outline"
				size="sm"
				className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer"
			>
				<ArrowLeft />
			</Button>
			{[...Array(totalPage)].map((_, idx) => (
				<Button
					onClick={() => {
						setPage(idx + 1);
					}}
					key={idx}
					variant={page === idx + 1 ? "default" : "outline"}
					size="sm"
					className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer"
				>
					{idx + 1}
				</Button>
			))}
			<Button
				onClick={handleNext}
				disabled={page === totalPage}
				variant="outline"
				size="sm"
				className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer"
			>
				<ArrowRight />
			</Button>
		</div>
	);
};

export default TablePagination;
