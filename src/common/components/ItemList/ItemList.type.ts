import {
    IItemParams,
    IMagazineParams,
    IArticleParams,
    IPictureParams,
    IPhotoParams,
    IDictionaryParams,
    IMyphotoParams,
} from 'common/types';
import React from 'react';

export type IItemList = {
    width: string;
    imgHeight: string;
    horizontalGap: number;
    verticalGap: number;
    cols: number;
    items:
        | IMagazineParams[]
        | IArticleParams[]
        | IPictureParams[]
        | IPhotoParams[]
        | IDictionaryParams[]
        | IMyphotoParams[];
    RenderComponent: React.FC<IItemParams>;
};
