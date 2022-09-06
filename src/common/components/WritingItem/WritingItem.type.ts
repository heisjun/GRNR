import { IUploadPicData } from 'common/types';

export type IWritingItem = {
    type: string;
    index: number;
    setGetContent: any;
    onRemove?: any;
    getContent: IUploadPicData[];
};
