export type IFollowingItem = {
    data: {
        id: number;
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
};
