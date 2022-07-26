import { IArticleParams } from 'common/types';

export type IArticleList = {
    width: string;
    picHeight: string;
    gap: number;
    cols: number;
    items: IArticleParams[];
};
