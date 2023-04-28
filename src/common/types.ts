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
    plantContentFeedDtoList: {
        plantDicId: number;
        plantDicPicId: number;
        plantPicUrl: string;
        user_name: string;
    }[];
    plantName: string;
    scientificName: string;
    classification: string;
    classification_leaf: string;
    classification_flower: string;
    classification_fruit: string;
    classification_succulent: string;
    toxicityHarmless: string;
    toxicitySeriousness: string;
    toxicitySlight: string;
    toxicityIngestion: string;
    toxicitySkin: string;
    cat: string;
    dog: string;
    difficulty: string;
    growSpeed: string;
    korClass: string;
    enClass: string;
    korOrder: string;
    enOrder: string;
    korFamily: string;
    enFamily: string;
    distribution: string;
    description_detail: string;
    flowerLanguage: string;
    plantGuideSpace: string;
    plantGuideWater: string;
    plantGuideFertilizer: string;
    plantGuidePest: string;
    faqLevel: string;
    faqWater: string;
    faqLightPlace: string;
    faqTemperature: string;
    faqHumidity: string;
    faqToxicity: string;
    faqFertilizer: string;
    faqPest: string;
    pestName: string;
    pestExplanation: string;
    pestSymptom: string;
    pestTherapy: string;
    pestUrl: string;
    plantContentPestFeedDtoList: {
        pestName: string;
        pestExplanation: string;
        pestSymptom: string;
        pestTherapy: string;
        pestUrl: string;
    }[];
    reviewQuantity: number;
    evaluationSum: number;
    fiveAccount: number;
    fourAccount: number;
    threeAccount: number;
    twoAccount: number;
    oneAccount: number;
};

export type IFollowingsParams = {
    pictureId: number;
    accountId: number;
    accountNickName: string;
    accountProfileUrl: string;
    pictureContentDtoList: {
        pictureId: number;
        contentId: number;
        pictureUrl: string;
        explain: string;
        homePlace: string;
        video: boolean;
        tagList: {
            pictureContentId: number;
            tagName: string;
        }[];
    }[];
    category: string;
    scrapCount: number;
    likeCount: number;
    viewCount: number;
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
    video: boolean;
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
    /*  accountNickName?: string;
    accountProfileUrl?: string;
    accountId?: number;
    commentCount: number;
    firstContent: {
        explain: string;
        pictureId: number;
        pictureUrl: string;
        video: boolean;
    };
    myLike: boolean;
    myScrap: boolean;
    likeCount: number;
    pictureId: number;
    scrapCount: number;
    viewCount?: number;
    time: number; */
    pictureId: number;
    pictureContentUrl: string;
    pictureContentExplain: string;
    likeCount: number;
    scrapCount: number;
    commentCount: number;
    video: boolean;
    myLike: boolean;
    myScrap: boolean;
    accountId: number;
    accountNickName: string;
    accountProfileUrl: string;
    viewCount: number;
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
        video: boolean;
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

//수정예정
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
    toxicityHarmless: string;
    toxicitySeriousness: string;
    toxicitySlight: string;
    toxicityIngestion: string;
    toxicitySkin: string;
    cat: string;
    dog: string;
    difficulty: string;
    growSpeed: string;
};

export type IMyphotoParams = {
    myScrap: boolean;
    myLike: boolean;
    pictureId: number;
    pictureContentUrl: string;
    likeCount: number;
    commentCount: number;
    scrapCount: number;
    viewCount: number;
    video: boolean;
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
    pictureContentUrl: string;
    myLike: boolean;
    myScrap: boolean;
    likeCount: number;
    scrapCount: number;
    commentCount: number;
    video: boolean;
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
    items: IpicData[];
    setFunc: any;
};

export type IPopularPic = {
    accountNickName: string;
    accountProfileUrl: string;
    pictureId: number;
    pictureContentUrl: string;
    pictureContentExplain: string;
    video: boolean;
    /*  firstContent: {
        explain: string;
        pictureUrl: string;
        video: boolean;
    }; */
};

export type ITodaysPhotoParams = {
    width: string;
    height?: string;
    paddingBottom?: string;
    item: IPopularPic;
};
