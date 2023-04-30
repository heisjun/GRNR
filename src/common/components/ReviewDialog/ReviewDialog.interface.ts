export interface IReviewDialogProps {
    open: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    resetBtn: () => void;
}
