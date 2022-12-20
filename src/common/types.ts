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

export type ICommentsParams = {
    inquiryId: number;
    commentQuantity: number;
    commentDtoList: {
        inquiryId: number;
        commentId: number;
        myLike: boolean;
        commentNicNameList: null;
        content: string;
        report: boolean;
        parentId: null;
        likeCount: number;
        accountId: number;
        accountNicName: string;
        accountProfileUrl: string;
        commentChildDtoList: {
            parentId: number;
            commentId: number;
            myLike: boolean;
            content: string;
            report: boolean;
            accountNicName: string;
            accountId: number;
            accountProfileUrl: string;
            likeCount: number;
            commentNicNameList: {
                commentId: number;
                nicNameTags: string;
            }[];
        }[];
    }[];
};

export type ItestComments = {
    inquiryId: number;
    commentId: number;
    myLike: boolean;
    commentNicNameList: null;
    content: string;
    report: boolean;
    parentId: null;
    likeCount: number;
    accountNicName: string;
    accountId: number;
    accountProfileUrl: string;
    commentChildDtoList: {
        parentId: number;
        commentId: number;
        myLike: boolean;
        content: string;
        report: boolean;
        accountNicName: string;
        accountId: number;
        accountProfileUrl: string;
        likeCount: number;
        /*   commentNicNameList: {
            commentId: number;
            nicNameTags: string;
        }[]; */
        commentNicNameList: null;
    }[];
};

export type IDictionaryDetailsParams = {
    plantDicId: number;
    pictureList: string[];
    plantName: string;
    scientificName: string;
    toxicity: string;
    cat: boolean;
    dog: boolean;
    classification: string;
    korClass: string;
    enClass: string;
    korOrder: string;
    enOrder: string;
    korFamily: string;
    enFamily: string;
    classification_leaf: boolean;
    classification_flower: boolean;
    classification_fruit: boolean;
    classification_succulent: boolean;
    shape_shrub: boolean;
    shape_upright: boolean;
    shape_creeper: boolean;
    shape_grass: boolean;
    shape_rosette: boolean;
    shape_succulent: boolean;
    distribution: string;
    winter_temp_min: string;
    moderate_temp_min: string;
    moderate_temp_max: string;
    moderate_humidity_min: string;
    moderate_humidity_max: string;
    full_sun: string;
    half_sun: string;
    full_shade: string;
    half_shade: string;
    direct_sunlight: string;
    inside_min: string;
    inside_max: string;
    difficulty: string;
    growSpeed: string;
    leafSize: string;
    watering_spring: string;
    watering_summer: string;
    watering_autumn: string;
    watering_winter: string;
    description_detail: string;
    flowerLanguage: string;
};

export type IFollowingsParams = {
    id: number;
    accountId: number;
    accountNickName: string;
    accountProfileUrl: string;
    pictureUrlList: [];
    category: string;
    textList: [];
    tagList: [];
    scrapCount: number;
    likeCount: number;
    commentCount: number;
    myLike: boolean;
    myScrap: boolean;
    time: number;
    createTime: string;
};
export type IPhotoDetailsParams = {
    pictureId: number;
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
    myLike: boolean;
    myScrap: boolean;
    myFollow: boolean;
    accountNickName?: string;
    classification: string;
    scrapCount: number;
    likeCount: number;
    viewCount: number;
    accountId: number;
    selfInfo: string;
    accountProfileUrl: string;
};

export type pictureDtoParams = {
    pictureId: number;
    contentId: number;
    pictureUrl: string;
    explain: string;
    homePlace: string;
    classification: string;
    tagList: {
        pictureContentId: number;
        tagName: string;
    }[];
};

export type IPhotosParams = {
    accountNickName?: string;
    accountProfileUrl?: string;
    accountId?: number;
    commentCount: number;
    firstContent: {
        contentId: number;
        explain: string;
        homePlace: string;
        pictureId: number;
        pictureUrl: string;
        tagList: {
            pictureContentId: number;
            tagName: string;
        }[];
    };
    myLike: boolean;
    myScrap: boolean;
    likeCount: number;
    pictureId?: number;
    scrapCount: number;
    viewCount?: number;
    time: number;
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

export type IMagazinesParams = {
    magazineId: number;
    title: string;
    coverPictureUrl: string;
    accountNickName: string;
    scrapCount: number;
    likeCount: number;
    viewCount: number;
    time: number;
};

export type IMagazineItemParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: IMagazinesParams;
};

export type IMagazineDetailsParams = {
    magazineId: number;
    coverPictureUrl: string;
    region: string;
    gardenCareer: string;
    homePlace: string;
    direction: string;
    pet: string;
    theme: string;
    title: string;
    text: string;
    magazineContentDtoList: {
        magazineId: number;
        contentId: number;
        pictureId: number;
        pictureUrl: string;
        tagDtoList: null;
        explain: string;
    }[];
    accountNickName: string;
    scrapCount: number;
    likeCount: number;
    viewCount: number;
};

export type IMagazineDetailsItem = {
    magazineId: number;
    contentId: number;
    pictureId: number;
    pictureUrl: string;
    tagDtoList: null;
    explain: string;
}[];

export type IPhotoParams = {
    avtUrl?: string;
    writer?: string;
    details?: string;
};

export type IDictionariesParams = {
    plantDicId: number;
    plantName: string;
    scientificName: string;
    classification_leaf: string;
    classification_flower: string;
    classification_fruit: string;
    classification_succulent: string;
    description_detail: string;
    flowerLanguage: string;
    plantPicUrl: string;
    myScrap: boolean;
};

export type IMyphotoParams = {
    pictureId: number;
    pictureUrl: string;
    likeCount: number;
    commentCount: number;
    scrapCount: number;
    viewCount: number;
};

export type IItemParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item:
        | IMagazinesParams
        | IArticleParams
        | IPhotoParams
        | IDictionariesParams
        | IMyphotoParams
        | IQuestionDetailsParmas;
};

export type IPhotoItemParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    setFunc: any;
    items: IPhotosParams[];
    item: IPhotosParams;
};

export type IDictionaryItem = {
    width: string;
    height?: string;
    paddingBottom?: string;
    setFunc: any;
    items: IDictionariesParams[];
    item: IDictionariesParams;
};

export type IUploadPicData = {
    loc: string;
    hashtag?: string[];
    details: string;
    imgFile: any;
    realImg: any;
    realhashtag: { tagName: string }[];
};

export type IpicData = {
    pictureId: number;
    pictureUrl: string;
    myLike: boolean;
    myScrap: boolean;
    likeCount: number;
    scrapCount: number;
    commentCount: number;
};

export type IDicData = {
    dictionaryId: number;
    pictureUrl: string;
    korName: string;
    engName: string;
};

export type IMyfeedItemParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: IpicData;
};

export type IPopularPic = {
    imgSrc: string;
};

export type ITodaysPhotoParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: IPopularPic;
};
