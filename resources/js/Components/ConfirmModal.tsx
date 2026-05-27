import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    taskTitle?: string;
    confirmLabel?: string;
    confirmVariant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    processing?: boolean;
}

export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title,
    message,
    taskTitle,
    confirmLabel = "Confirm",
    confirmVariant = "destructive",
    processing = false,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="space-y-1 pt-1">
                        <span>{message}</span>
                        {taskTitle && (
                            <span className="block font-semibold text-foreground mt-1">
                                "{taskTitle}"
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>
                {/* <DialogFooter className="gap-2 sm:gap-0"> */}
                <DialogFooter className="flex justify-center gap-3 sm:justify-center">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={confirmVariant}
                        onClick={onConfirm}
                        disabled={processing}
                    >
                        {processing && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
