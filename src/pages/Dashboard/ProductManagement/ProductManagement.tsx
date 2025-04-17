import DeleteConfirmationModal from "@/components/module/modal/DeleteConfirmationModal";
import BSTable from "@/components/module/table/BSTable";
import TablePagination from "@/components/module/table/TablePagination";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { cn } from "@/lib/utils";
import {
	useDeleteProductMutation,
	useGetAllBooksQuery,
} from "@/redux/features/bookManagement/bookManagement";
import { TBook } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductManagement = () => {
	const [page, setPage] = useState<number>(1);
	// const [params, setParams] = useState<TQueryParam[]>([]);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [isModalOpen, setModalOpen] = useState<boolean>(false);

	const { data: books, isFetching } = useGetAllBooksQuery([
		{ name: "limit", value: 6 },
		{ name: "page", value: page },
		// ...params,
	]);

	const [deleteProduct, { isLoading }] = useDeleteProductMutation();

	const book = books?.data!.find((book: TBook) => book._id === selectedId);

	const handleDelete = (userId: string) => {
		setModalOpen(true);
		setSelectedId(userId);
	};

	const handleDeleteConfirm = async () => {
		try {
			if (selectedId) {
				const res = await deleteProduct(selectedId).unwrap();
				if (res.success) {
					toast.success(res.message);
					setModalOpen(false);
				} else {
					toast.error(res.message);
				}
			}
		} catch (err: any) {
			toast.error(err?.message);
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
								: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
						}
						alt={row.original.title}
						className="size-8 rounded-md"
					/>
					<span className="truncate">{row.original.title}</span>
				</div>
			),
		},
		{
			accessorKey: "author",
			header: "Author",
			cell: ({ row }) => <span>{row.original.author?.name}</span>,
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
				<Link to="/admin/dashboard/add-product">
					<Button className="cursor-pointer">
						<span>Add Product</span>
						<Plus />
					</Button>
				</Link>
			</div>
			<BSTable columns={columns} data={books?.data || []} />
			<TablePagination
				page={page}
				setPage={setPage}
				totalPage={books?.meta?.totalPage as number}
			/>
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
