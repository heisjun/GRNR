export interface IReviewType {
    content: IReviewListType[];
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
