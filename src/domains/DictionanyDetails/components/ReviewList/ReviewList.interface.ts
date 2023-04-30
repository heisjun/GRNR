import { IDictionaryDetailsParams } from 'common/types';
import { IReviewListType } from '../types/reviewType';

export interface IReviewListProps {
    data?: IReviewListType;
    getReviewData: () => void;
    fetchData: () => void;
    details: IDictionaryDetailsParams;
}
