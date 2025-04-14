import DeleteConfirmationModal from "@/components/module/modal/DeleteConfirmationModal";
import BSTable from "@/components/module/table/BSTable";
import Spinner from "@/components/spinner/Spinner";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { cn } from "@/lib/utils";
import { useGetAllBooksQuery } from "@/redux/features/bookManagement/bookManagement";
import { TUser } from "@/types";
import { TBook } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";

const ProductManagement = () => {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [isModalOpen, setModalOpen] = useState<boolean>(false);

	const { data: books, isFetching } = useGetAllBooksQuery(undefined);

	const book = books?.data.find((user: TUser) => user._id === selectedId);

	const handleDelete = (userId: string) => {
		setModalOpen(true);
		setSelectedId(userId);
	};

	const isLoading = false;

	const handleDeleteConfirm = async () => {
		console.log(selectedId);
		try {
			// if (selectedId) {
			// 	const res = await deleteUser(selectedId).unwrap();
			// 	if (res.success) {
			// 		toast.success(res.message);
			// 		setModalOpen(false);
			// 	} else {
			// 		toast.error(res.message);
			// 	}
			// }
		} catch (err: any) {
			console.error(err?.message);
		}
	};

	if (isFetching) {
		return <Spinner />;
	}

	const columns: ColumnDef<TBook>[] = [
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => (
				<div className="flex items-center space-x-2">
					<img
						src={
							row.original.thumbnail
								? row.original.thumbnail
								: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg"
						}
						alt={row.original.title}
						className="size-8 rounded-full border border-primary"
					/>
					<span className="truncate">{row.original.title}</span>
				</div>
			),
		},
		{
			accessorKey: "author",
			header: "Author",
			cell: ({ row }) => <span>{row.original.author}</span>,
		},
		{
			accessorKey: "category",
			header: "Category",
			cell: ({ row }) => <span>{row.original.category}</span>,
		},
		{
			accessorKey: "quantity",
			header: "Quantity",
			cell: ({ row }) => <span>{row.original.quantity}</span>,
		},
		{
			accessorKey: "isStock",
			header: "In Stock",
			cell: ({ row }) => (
				<span
					className={cn(
						"px-1 rounded text-xs font-semibold",
						row.original.inStock
							? "text-green-500 bg-green-200 border border-green-500"
							: "text-red-500 bg-red-200 border border-red-500"
					)}
				>
					{row.original.inStock ? "In Stock" : "Out of Stock"}
				</span>
			),
		},
		{
			accessorKey: "price",
			header: "Price",
			cell: ({ row }) => <span>{currencyFormatter(row.original.price)}</span>,
		},
		{
			accessorKey: "action",
			header: "Action",
			cell: ({ row }) => (
				<div className="flex items-center space-x-3">
					<button
						className="text-gray-500 hover:text-red-500 cursor-pointer"
						title="Delete"
						onClick={() => handleDelete(row.original._id)}
					>
						<Trash className="w-5 h-5" />
					</button>
				</div>
			),
		},
	];

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold">Manage Products</h1>
			</div>
			<BSTable columns={columns} data={books?.data || []} />
			{/* <TablePagination totalPages={meta?.totalPage} /> */}
			<DeleteConfirmationModal
				name={book?.title}
				itemName="Product"
				isOpen={isModalOpen}
				isLoading={isLoading}
				onOpenChange={setModalOpen}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};

export default ProductManagement;
