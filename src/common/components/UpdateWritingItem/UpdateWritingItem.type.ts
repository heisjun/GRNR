import { pictureDtoParams } from 'common/types';

export type IUpdateWritingItem = {
    type: string;
    index: number;
    setGetContent: any;
    onRemove?: any;
    getContent: pictureDtoParams[];
    beforeData: {
        pictureId: number;
        contentId: number;
        pictureUrl: string;
        explain: string;
        homePlace: string;
        tagList: {
            tagName: string;
        }[];
    };
};
