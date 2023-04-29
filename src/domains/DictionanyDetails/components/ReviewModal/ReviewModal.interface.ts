import { IDictionaryDetailsParams } from 'common/types';

export interface IReviewModalProps {
    open: boolean;
    onClose: () => void;
    data: IDictionaryDetailsParams;
    requestReview: () => void;
}
