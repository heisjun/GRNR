import { IPictureParams } from 'common/types';

export type IPictureList = {
    width: string;
    height: string;
    gap: number;
    cols: number;
    items: IPictureParams[];
};
