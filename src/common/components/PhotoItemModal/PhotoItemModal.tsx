import axios from 'axios';
import { ICommentsParams, ItestComments, IPhotoDetailsParams } from 'common/types';
import { TaggedPhoto } from 'domains';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../Avatar';
import CommentItemModal from '../CommenntItemModal';
import ItemList from '../ItemList';
import { IPhotoItemModal } from './PhotoItemModal.type';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const data = [
    {
        pictureId: 2,
        contentId: 4,
        pictureUrl: '사진글2_사진4.jpg',
        explain: '두번째 사진글의 사진4입니다.',
        homePlace: 'LIVING_ROOM',
        tagList: [
            {
                pictureContentId: 4,
                tagName: '사진4 태그1',
            },
            {
                pictureContentId: 4,
                tagName: '사진4 태그2',
            },
        ],
    },
];

const PhotoItemModal = forwardRef((props: IPhotoItemModal, ref: any) => {
    const { setIsOpenModal, pictureId } = props;
    const navigate = useNavigate();
    const [commentsList, setCommentsList] = useState<ICommentsParams>();
    const [comment, setComment] = useState<ItestComments[]>([]);
    const [details, setDetails] = useState<IPhotoDetailsParams>();

    const fetchData = useCallback(async () => {
        if (!TOKEN) {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${pictureId}/comment/view
                `,
                );
                setCommentsList(CommentData.data.value.content[0]);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${pictureId}/comment/view
                `,
                    {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setCommentsList(CommentData.data.value.content[0]);
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    const fetchData2 = useCallback(async () => {
        if (!TOKEN) {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${pictureId}/comment/view
                `,
                );
                setComment(CommentData.data.value.content[0].commentDtoList);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${pictureId}/comment/view
                `,
                    {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setComment(CommentData.data.value.content[0].commentDtoList);
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    const fetchData3 = useCallback(async () => {
        if (!TOKEN) {
            try {
                const response = await axios.get(
                    `${BASEURL}/api/picture/${pictureId}/detail
                `,
                );
                setDetails(response.data.value);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const response = await axios.get(
                    `${BASEURL}/api/picture/${pictureId}/detail
                `,
                    {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setDetails(response.data.value);
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
    }, [fetchData, fetchData2, fetchData3]);

    const onFollowing = async (followingName: string) => {
        if (!TOKEN) {
            navigate('/login');
        }
        const followData = { followingName: followingName };
        const saveFollowDto = JSON.stringify(followData);

        try {
            await axios.post(`${BASEURL}/api/following/save`, saveFollowDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            setDetails((prev: any) => {
                return { ...prev, myFollow: true };
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onUnFollowing = async (followingName: string) => {
        if (!TOKEN) {
            navigate('/login');
        }
        const followData = { followingName: followingName };
        const saveFollowDto = JSON.stringify(followData);

        try {
            await axios.post(`${BASEURL}/api/following/save`, saveFollowDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            setDetails((prev: any) => {
                return { ...prev, myFollow: false };
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onGoUserPage = () => {
        sessionStorage.setItem('userId', String(details?.accountId));
        {
            details?.accountId === Number(sessionStorage.getItem('accountId'))
                ? navigate('/mypage')
                : navigate(`/userpage/${details?.accountId}`);
        }
    };

    function convertKor(classification: string) {
        if (classification === 'LEAF') {
            return '잎보기식물';
        } else if (classification === 'FLOWER') {
            return '꽃보기식물';
        } else if (classification === 'FRUIT') {
            return '열매보기식물';
        } else if (classification === 'SUCCULENT') {
            return '선인장,다육식물';
        }
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: 708, backgroundColor: 'white' }}>
                    <div
                        style={{
                            overflow: 'auto',
                            maxHeight: 750,
                        }}
                    >
                        <div>
                            <StyledClassification>
                                {convertKor(details?.classification ? details.classification : 'FLOWER')}
                            </StyledClassification>
                            <ItemList
                                width="100%"
                                imgHeight="100%"
                                cols={1}
                                horizontalGap={0}
                                verticalGap={0}
                                items={details?.pictureContentDtoList ? details?.pictureContentDtoList : data}
                                RenderComponent={TaggedPhoto}
                            />
                            <StyledViewCount>조회 {details?.viewCount} 명</StyledViewCount>
                            <StyledUserInfoBlock>
                                <StyledContentProfileBlock>
                                    <StyledWriterBlock>
                                        <StyeldAvatarBlock onClick={onGoUserPage}>
                                            <Avatar
                                                width="100%"
                                                paddingBottom="100%"
                                                borderRadius="100%"
                                                picUrl={details?.accountProfileUrl}
                                            />
                                        </StyeldAvatarBlock>
                                        <div>
                                            <StyledWriterText onClick={onGoUserPage}>
                                                {details?.accountNickName}
                                            </StyledWriterText>
                                            <StyledWriterintro>{details?.selfInfo}</StyledWriterintro>
                                        </div>
                                    </StyledWriterBlock>
                                </StyledContentProfileBlock>
                                <StyledFollowButtonBlock>
                                    {details?.myFollow ? (
                                        <StyledFollowButton>
                                            <StyledFollowText
                                                onClick={() =>
                                                    onUnFollowing(
                                                        details?.accountNickName ? details.accountNickName : '',
                                                    )
                                                }
                                            >
                                                팔로잉
                                            </StyledFollowText>
                                        </StyledFollowButton>
                                    ) : (
                                        <StyledFollowButton>
                                            <StyledFollowText
                                                onClick={() =>
                                                    onFollowing(details?.accountNickName ? details.accountNickName : '')
                                                }
                                            >
                                                팔로우
                                            </StyledFollowText>
                                        </StyledFollowButton>
                                    )}
                                </StyledFollowButtonBlock>
                            </StyledUserInfoBlock>
                        </div>
                    </div>
                </div>
                <div style={{ width: 432, backgroundColor: 'white' }}>
                    <div
                        onClick={() => setIsOpenModal(false)}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginRight: 15,
                            marginTop: 5,
                            cursor: 'pointer',
                        }}
                    >
                        닫기 X
                    </div>
                    <div
                        style={{
                            overflow: 'auto',
                            maxHeight: 610,
                            padding: 16,
                            boxSizing: 'border-box',
                        }}
                    >
                        <CommentItemModal
                            commentsList={commentsList}
                            setCommentsList={setCommentsList}
                            pictureId={String(pictureId)}
                            testComments={comment}
                            setTestComments={setComment}
                            category="picture"
                            ref={ref}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

const StyledClassification = styled.div`
    font-size: 16px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.86;
    letter-spacing: normal;
    color: #888;
    margin: 0px 0px 0px 17.2px;
`;

const StyledViewCount = styled.div`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.86;
    letter-spacing: normal;
    color: #888;
    margin: 0px 0px 0px 17.2px;
`;

const StyledFollowText = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: white;
`;

const StyledFollowButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 30px;
    padding: 4px 16px 6px 17px;
    background-color: #0d6637;
    cursor: pointer;
    &:hover {
        background-color: silver;
    }
`;

const StyledFollowButtonBlock = styled.div`
    width: 18%;
`;

const StyeldAvatarBlock = styled.div`
    width: 10%;
`;

const StyledWriterText = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin: 0px 0px 1px 18px;
    line-height: 1.63;
    letter-spacing: normal;
    color: #272727;
`;

const StyledWriterintro = styled.div`
    margin: 1px 0px 0px 18px;
    font-family: NotoSansKR;
    font-size: 14px;
    line-height: 1.86;
    letter-spacing: normal;
    color: #7b7b7b;
`;

const StyledWriterBlock = styled.div`
    display: flex;
    align-items: center;
`;

const StyledUserInfoBlock = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    margin: 20px 0px 20px;
    padding: 20px 16px;
    background-color: #f5f5f5;
`;

const StyledContentProfileBlock = styled.div`
    flex: 1;
`;
export default PhotoItemModal;
