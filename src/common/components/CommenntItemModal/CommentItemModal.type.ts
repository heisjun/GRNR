import { ItestComments } from 'common/types';

export type ICommentItem = {
    commentsList?: {
        inquiryId: number;
        commentQuantity: number;
        commentDtoList: {
            accountProfileUrl: string;
            inquiryId: number;
            commentId: number;
            myLike: boolean;
            commentNicNameList: null;
            content: string;
            report: boolean;
            parentId: null;
            likeCount: number;
            accountNicName: string;
            commentChildDtoList: {
                accountProfileUrl: string;
                parentId: number;
                commentId: number;
                myLike: boolean;
                content: string;
                report: boolean;
                accountNicName: string;
                likeCount: number;
                commentNicNameList: {
                    commentId: number;
                    nicNameTags: string;
                }[];
            }[];
        }[];
    };
    pictureId?: string;
    category: string;
    testComments: ItestComments[];
    setTestComments: any;
};
