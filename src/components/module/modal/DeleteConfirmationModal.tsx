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
	name: string | null;
	isOpen: boolean;
	isLoading?: boolean;
	onConfirm: () => void;
	onOpenChange: (isOpen: boolean) => void;
};

const DeleteConfirmationModal = ({
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
					<DialogTitle>Delete Item</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete{" "}
						<span className="font-semibold text-red-500">{name}</span>? This
						action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onConfirm();
							onOpenChange(false);
						}}
					>
						{isLoading ? "Deleting..." : "Confirm"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
