import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type TDeleteModalProps = {
	itemName: string;
	name: string | null;
	isOpen: boolean;
	isLoading?: boolean;
	onConfirm: () => void;
	onOpenChange: (isOpen: boolean) => void;
};

const DeleteConfirmationModal = ({
	itemName,
	name,
	isOpen,
	onConfirm,
	isLoading,
	onOpenChange,
}: TDeleteModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete {itemName}</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete{" "}
						<span className="font-semibold text-red-500">{name}</span>? This
						action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="cursor-pointer"
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onConfirm();
							onOpenChange(false);
						}}
						className="cursor-pointer"
					>
						{isLoading ? "Deleting..." : "Confirm"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
