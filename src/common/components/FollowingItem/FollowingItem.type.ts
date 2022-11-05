export type IFollowingItem = {
    data: {
        id: number;
        accountNickName: string;
        accountProfileUrl: string;
        pictureUrlList: [];
        category: string;
        text: string;
        tagList: [];
        scrapCount: number;
        likeCount: number;
        commentCount: number;
        time: number;
    };
};
