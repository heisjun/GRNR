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

export type IQuestionCommentsParams = {
    inquiryId: number;
    commentQuantity: number;
    commentDtoList: {
        inquiryId: number;
        commentId: number;
        commentNicNameList: null;
        content: string;
        report: boolean;
        parentId: null;
        likeCount: number;
        accountNicName: string;
        commentChildDtoList: {
            parentId: number;
            commentId: number;
            content: string;
            report: boolean;
            accountNicName: string;
            likeCount: number;
            commentNicNameList: {
                commentId: number;
                nicNameTags: string;
            }[];
        }[];
    }[];
};

export type IPhotoDetailsParams = {
    pictureId?: number;
    pictureContentDtoList: {
        pictureId: number;
        contentId: number;
        pictureUrl: string;
        explain: string;
        homePlace: string;
        tagList: {
            pictureContentId: number;
            tagName: string;
        }[];
    }[];
    accountNickName?: string;
    scrapCount?: number;
    likeCount?: number;
    viewCount?: number;
};

export type IPhotoDetailsItems = {
    pictureId: number;
    contentId: number;
    pictureUrl: string;
    explain: string;
    homePlace: string;
    tagList: {
        pictureContentId: number;
        tagName: string;
    }[];
}[];

export type ITaggedPhoto = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: {
        pictureId: number;
        contentId: number;
        pictureUrl: string;
        explain: string;
        homePlace: string;
        tagList: {
            pictureContentId: number;
            tagName: string;
        }[];
    };
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

export type IMyphotoParams = {
    imgUr: string;
    like: number;
    comment: number;
    scrap: number;
};

export type IItemParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: IMagazineParams | IArticleParams | IPhotoParams | IDictionaryParams | IMyphotoParams | IQuestionDetailsParmas;
};

export type IPhotoItemParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: IPhotoDetailsParams;
};

export type IUploadPicData = {
    loc: string;
    hashtag?: string[];
    details: string;
    imgFile: any;
    realImg: any;
    realhashtag: { tagName: string }[];
};
