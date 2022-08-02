import { IItemParams, IMagazineParams, IArticleParams, IPictureParams } from 'common/types';
import React from 'react';

export type IItemList = {
    width: string;
    imgHeight: string;
    horizontalGap: number;
    verticalGap: number;
    cols: number;
    items: IMagazineParams[] | IArticleParams[] | IPictureParams[];
    RenderComponent: React.FC<IItemParams>;
};
