import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const TablePagination = ({ totalPages }: { totalPages: number }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	const handlePrev = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className="flex justify-center items-center gap-2 my-5">
			<Button
				onClick={handlePrev}
				disabled={currentPage === 1}
				variant="outline"
				size="sm"
				className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer"
			>
				<ArrowLeft />
			</Button>
			{[...Array(totalPages)].map((_, index) => (
				<Button
					onClick={() => {
						setCurrentPage(index + 1);
					}}
					key={index}
					variant={currentPage === index + 1 ? "default" : "outline"}
					size="sm"
					className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer"
				>
					{index + 1}
				</Button>
			))}
			<Button
				onClick={handleNext}
				disabled={currentPage === totalPages}
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
