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
const TOKEN = localStorage.getItem('accesstoken');

const PhotoItemModal = forwardRef((props: IPhotoItemModal, ref: any) => {
    const { setIsOpenModal, pictureId } = props;
    const navigate = useNavigate();
    const [commentsList, setCommentsList] = useState<ICommentsParams>();
    const [comment, setComment] = useState<ItestComments[]>([]);
    const [details, setDetails] = useState<IPhotoDetailsParams>();

    const fetchData = async () => {
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
    };

    const fetchData2 = async () => {
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
    };

    const fetchData3 = async () => {
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
    };

    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
    }, []);

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
        if (!TOKEN) {
            navigate('/login');
            return;
        }
        localStorage.setItem('userId', String(details?.accountId));
        {
            details?.accountId === Number(localStorage.getItem('accountId'))
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
                <StyledContentContainer>
                    <StyledBorderLine />
                    <div
                        style={{
                            overflow: 'auto',
                            maxHeight: 680,
                        }}
                    >
                        {details && (
                            <div>
                                <StyledClassification>{convertKor(details?.classification)}</StyledClassification>

                                <ItemList
                                    width="100%"
                                    imgHeight="100%"
                                    cols={1}
                                    horizontalGap={0}
                                    verticalGap={0}
                                    items={details?.pictureContentDtoList}
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
                                    <StyledFollowButtonBlock
                                        show={localStorage.getItem('nickName') === details?.accountNickName}
                                    >
                                        {details?.myFollow ? (
                                            <StyledFollowingButton>
                                                <StyledFollowText
                                                    onClick={() =>
                                                        onUnFollowing(
                                                            details?.accountNickName ? details.accountNickName : '',
                                                        )
                                                    }
                                                >
                                                    팔로잉
                                                </StyledFollowText>
                                            </StyledFollowingButton>
                                        ) : (
                                            <StyledFollowButton>
                                                <StyledFollowText
                                                    onClick={() =>
                                                        onFollowing(
                                                            details?.accountNickName ? details.accountNickName : '',
                                                        )
                                                    }
                                                >
                                                    팔로우
                                                </StyledFollowText>
                                            </StyledFollowButton>
                                        )}
                                    </StyledFollowButtonBlock>
                                </StyledUserInfoBlock>
                            </div>
                        )}
                    </div>
                </StyledContentContainer>
                <div style={{ width: 432, backgroundColor: 'white', marginTop: 70 }}>
                    <StyledBorderLine />

                    <StyledCloseBtn src="/btnClose.png" onClick={() => setIsOpenModal(false)} />

                    <div
                        style={{
                            overflow: 'auto',
                            maxHeight: 540,
                            paddingRight: 16,
                            paddingLeft: 16,
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
                            fetchData={fetchData}
                            fetchData2={fetchData2}
                            fetchData3={fetchData3}
                            mynickName={details?.accountNickName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
const StyledCloseBtn = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
`;

const StyledContentContainer = styled.div`
    width: 708px;
    background-color: white;
    margin-top: 70px;
`;

const StyledBorderLine = styled.div`
    height: 1px;
    width: 100%;
    background-color: #ececec;
`;

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

const StyledFollowingButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 30px;
    padding: 4px 16px 6px 17px;
    background-color: silver;
    cursor: pointer;
    &:hover {
        background-color: #0d6637;
    }
`;

const StyledFollowButtonBlock = styled.div<{ show: boolean }>`
    width: 18%;
    display: ${({ show }) => (show ? 'none' : 'flex')};
`;

const StyeldAvatarBlock = styled.div`
    width: 10%;
    cursor: pointer;
`;

const StyledWriterText = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin: 0px 0px 1px 18px;
    line-height: 1.63;
    letter-spacing: normal;
    color: #272727;
    cursor: pointer;
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

    height: 120px;
    display: flex;
    align-items: center;
    margin: 20px 16px 20px 16px;
    padding: 20px 16px;
    background-color: #f5f5f5;
`;

const StyledContentProfileBlock = styled.div`
    flex: 1;
`;
export default PhotoItemModal;
