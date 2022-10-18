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

export type IDictionaryDetailsParams = {
    plantDicId: number;
    pictureList: [];
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
    accountNickName?: string;
    scrapCount: number;
    likeCount: number;
    viewCount: number;
};

export type pictureDtoParams = {
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

export type IPhotosParams = {
    accountNickName?: string;
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
    likeCount?: number;
    pictureId?: number;
    scrapCount?: number;
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

export type IMagazineParams = {
    title?: string;
    picUrl?: string;
};

export type IPhotoParams = {
    avtUrl?: string;
    writer?: string;
    details?: string;
};

export type IDictionariesParams = {
    plantDicId: number;
    plantName: string;
    plantPicUrl: string;
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
    item:
        | IMagazineParams
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
    item: IPhotosParams;
};

export type IDictionaryItem = {
    width: string;
    height?: string;
    paddingBottom?: string;
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
