import DeleteConfirmationModal from "@/components/module/modal/DeleteConfirmationModal";
import BSTable from "@/components/module/table/BSTable";
import TablePagination from "@/components/module/table/TablePagination";
import Spinner from "@/components/spinner/Spinner";
import {
	useDeleteUserMutation,
	useGetAllUsersQuery,
} from "@/redux/features/userManagement/userManagementApi";
import { TUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UserManagement = () => {
	const [page, setPage] = useState<number>(1);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [isModalOpen, setModalOpen] = useState<boolean>(false);

	const { data: users, isFetching } = useGetAllUsersQuery([
		{ name: "limit", value: 6 },
		{ name: "page", value: page },
	]);
	const [deleteUser, { isLoading }] = useDeleteUserMutation();

	const user = users?.data!.find((user: TUser) => user._id === selectedId);

	const handleDelete = (userId: string) => {
		setModalOpen(true);
		setSelectedId(userId);
	};

	const handleDeleteConfirm = async () => {
		console.log(selectedId);
		try {
			if (selectedId) {
				const res = await deleteUser(selectedId).unwrap();

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

	const columns: ColumnDef<TUser>[] = [
		{
			accessorKey: "name",
			header: "Name",
			cell: ({ row }) => (
				<div className="flex items-center space-x-2">
					<img
						src={
							row.original.profileImg
								? row.original.profileImg
								: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg"
						}
						alt={row.original.name}
						className="size-8 rounded-full"
					/>
					<span className="truncate">{row.original.name}</span>
				</div>
			),
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => <span>{row.original.email}</span>,
		},
		{
			accessorKey: "role",
			header: "Role",
			cell: ({ row }) => <span>{row.original.role}</span>,
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
				<h1 className="text-xl font-bold">Manage Users</h1>
			</div>
			<BSTable columns={columns} data={users?.data || []} />
			<TablePagination
				page={page}
				setPage={setPage}
				totalPage={users?.meta?.totalPage as number}
			/>
			<DeleteConfirmationModal
				name={user?.name}
				itemName="User"
				isOpen={isModalOpen}
				isLoading={isLoading}
				onOpenChange={setModalOpen}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};

export default UserManagement;
