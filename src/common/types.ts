export type IPictureParams = {
    picUrl?: string;
    writer?: string;
    avtUrl?: string;
};

export type IArticleParams = {
    title?: string;
    writer?: string;
    avtUrl?: string;
    picUrl?: string;
};

export type IMagazineParams = {
    title?: string;
    picUrl?: string;
};

export type IPhotoParams = {
    avtUrl?: string;
    writer?: string;
    details?: string;
};

export type IDictionaryParams = {
    title?: string;
    urlToImage?: string;
};

export type IItemParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: IPictureParams & IArticleParams & IMagazineParams & IPhotoParams & IDictionaryParams;
};

export type IUploadPicData = {
    loc: string;
    hashtag?: string[];
    details: string;
    imgFile: any;
};
