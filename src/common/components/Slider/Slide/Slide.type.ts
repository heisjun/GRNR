export type ISlide = {
    data: {
        id: number;
        accountNickName: string;
        pictureUrlList: [];
        category: string;
        textList: [];
        tagList: [];
        scrapCount: number;
        likeCount: number;
        commentCount: number;
        time: number;
    };
    index: number;
};
