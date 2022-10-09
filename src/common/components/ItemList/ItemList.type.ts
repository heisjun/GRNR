import {
    IItemParams,
    IMagazineParams,
    IArticleParams,
    IDictionaryParams,
    IMyphotoParams,
    IPhotoDetailsParams,
    IPhotoDetailsItems,
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
        | IDictionaryParams[]
        | IMyphotoParams[]
        | IItemParams[]
        | IQuestionDetailsParmas[]
        | IPhotoDetailsParams[]
        | IPhotoDetailsItems;
    RenderComponent: React.FC<any>;
};
