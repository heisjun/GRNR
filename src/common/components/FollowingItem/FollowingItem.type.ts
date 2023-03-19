import { IFollowingsParams } from 'common/types';

export type IFollowingItem = {
    data: {
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
        commentCount: number;
        myLike: boolean;
        myScrap: boolean;
        time: number;
        createTime: string;
        viewCount: number;
    };
    setFunc: any;
    items: IFollowingsParams[];
};
