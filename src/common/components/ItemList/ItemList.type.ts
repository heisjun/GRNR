import {
    IItemParams,
    IArticleParams,
    IDictionariesParams,
    IMyphotoParams,
    IPhotoDetailsParams,
    IPhotoDetailsItems,
    IPhotosParams,
    IMagazinesParams,
    IMagazineDetailsItem,
    IpicData,
    IPopularPic,
    IDicData,
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
    setFunc?: any;
    items:
        | IMagazinesParams[]
        | IMagazineDetailsItem
        | IArticleParams[]
        | IDictionariesParams[]
        | IMyphotoParams[]
        | IItemParams[]
        | IQuestionDetailsParmas[]
        | IPhotoDetailsParams[]
        | IPhotosParams[]
        | IPhotoDetailsItems
        | IPopularPic[]
        | IDicData[]
        | IpicData[];
    RenderComponent: React.FC<any>;
};
