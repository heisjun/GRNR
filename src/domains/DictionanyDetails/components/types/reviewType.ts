export interface IReviewType {
    plantDicId: number;
    reviewQuantity: number;
    evaluationSum: number;
    fiveAccount: number;
    fourAccount: number;
    threeAccount: number;
    twoAccount: number;
    oneAccount: number;
    reviewListList: IReviewListType[];
}

export interface IReviewListType {
    reviewId: number;
    reviewUrl: string;
    evaluation: number;
    accountName: string;
    reviewText: string;
    accountPicture: string;
    createDate: string;
    tagContentList: string[];
}
