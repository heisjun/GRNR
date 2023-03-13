export type IPhotoBanner = {
    data?: {
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
    }[];
};
