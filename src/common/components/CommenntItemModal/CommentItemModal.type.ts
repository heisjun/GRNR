import { ICommentsParams, ItestComments } from 'common/types';

export type ICommentItem = {
    commentsList?: ICommentsParams;
    setCommentsList: any;
    pictureId?: string;
    category: string;
    testComments: ItestComments[];
    setTestComments: any;
    fetchData?: () => void;
    fetchData2?: () => void;
    fetchData3?: () => void;
};
