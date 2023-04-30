import { IDictionaryDetailsParams } from 'common/types';
import { IReviewListType } from '../types/reviewType';

export interface IReviewModalProps {
    open: boolean;
    onClose: () => void;
    data: IDictionaryDetailsParams;
    requestReview: () => void;
    reviewData?: IReviewListType;
}
