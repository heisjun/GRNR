export type IPhotoBanner = {
    data?: {
        accountNickName: string;
        accountProfileUrl: string;
        pictureId: number;
        firstContent: {
            explain: string;
            pictureUrl: string;
            video: boolean;
        };
    }[];
};
