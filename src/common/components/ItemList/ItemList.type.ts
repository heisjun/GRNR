import {
    IItemParams,
    IMagazineParams,
    IArticleParams,
    IDictionariesParams,
    IMyphotoParams,
    IPhotoDetailsParams,
    IPhotoDetailsItems,
    IPhotosParams,
} from 'common/types';
import React from 'react';

export type IQuestionDetailsParmas = {
    accountNicName: string;
    content: string;
    inquiryId: number;
    picList: {
        inquiryId: number;
        pictureUrl: string;
    }[];
    tagList: {
        inquiryId: number;
        tagName: string;
    }[];
    time: string;
    title: string;
    viewQuantity: number;
};

export type IItemList = {
    width: string;
    imgHeight: string;
    horizontalGap: number;
    verticalGap: number;
    cols: number;
    items:
        | IMagazineParams[]
        | IArticleParams[]
        | IDictionariesParams[]
        | IMyphotoParams[]
        | IItemParams[]
        | IQuestionDetailsParmas[]
        | IPhotoDetailsParams[]
        | IPhotosParams[]
        | IPhotoDetailsItems;
    RenderComponent: React.FC<any>;
};
