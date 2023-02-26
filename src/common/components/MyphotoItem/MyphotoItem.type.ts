import { IMyphotoParams } from 'common/types';

export type IMyphotoItem = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: IMyphotoParams;
    items: IMyphotoParams[];
    setFunc: any;
};
