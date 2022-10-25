export type ICommentItem = {
    commentsList?: {
        inquiryId: number;
        commentQuantity: number;
        commentDtoList: {
            inquiryId: number;
            commentId: number;
            commentNicNameList: null;
            content: string;
            report: boolean;
            parentId: null;
            likeCount: number;
            accountNicName: string;
            commentChildDtoList: {
                parentId: number;
                commentId: number;
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
};
