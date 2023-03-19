export type ISlider = {
    item: {
        pictureId: number;
        accountNickName: string;
        category: string;
        pictureContentDtoList: {
            pictureId: number;
            contentId: number;
            pictureUrl: string;
            video: boolean;
            explain: string;
            homePlace: string;
            tagList: {
                pictureContentId: number;
                tagName: string;
            }[];
        }[];
        scrapCount: number;
        likeCount: number;
        commentCount: number;
        viewCount: number;
        time: number;
    };
};
