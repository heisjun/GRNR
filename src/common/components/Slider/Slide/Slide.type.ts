export type ISlide = {
    data: {
        pictureId: number;
        accountNickName: string;
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
        time: number;
    };
    index: number;
};
