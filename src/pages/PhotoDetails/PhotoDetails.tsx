import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar, ItemList } from 'common/components';
import { getDebouncedFunc } from 'common/funcs';
import { useParams, useNavigate } from 'react-router-dom';
import { default as callApi } from 'common/api';
import { ICommentsParams, IPhotoDetailsParams, ItestComments } from 'common/types';
import axios from 'axios';
import CommentItem from 'common/components/CommentItem';
import Modal from 'react-modal';
import ReportModal from 'common/components/ReportModal';
import PhotoDetailsItem from 'common/components/PhotoDetailsItem';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const PhotoDetails: React.FC = () => {
    const navigate = useNavigate();
    const sideBarRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<IPhotoDetailsParams>();
    const [commentsList, setCommentsList] = useState<ICommentsParams>();
    const [openModal, setOpenModal] = useState(false);
    const myAccountId = sessionStorage.getItem('accountId');
    const [comment, setComment] = useState<ItestComments[]>([]);

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.getDetailList(Number(params.id), 'picture');
                setDetails(response.data.value);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        if (!TOKEN) {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${params.id}/comment/view
                `,
                );
                setCommentsList(CommentData.data.value.content[0]);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${params.id}/comment/view
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
                    `${BASEURL}/api/picture/${params.id}/comment/view
                `,
                );
                setComment(CommentData.data.value.content[0].commentDtoList);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${params.id}/comment/view
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

    useEffect(() => {
        fetchData();
        fetchData2();
    }, [fetchData, fetchData2]);

    const useConfirm = (message: string, onConfirm: any, onCancel: any) => {
        if (!onConfirm || typeof onConfirm !== 'function') {
            return;
        }
        if (onCancel && typeof onCancel !== 'function') {
            return;
        }

        const confirmAction = () => {
            if (window.confirm(message)) {
                onConfirm();
            } else {
                onCancel();
            }
        };

        return confirmAction;
    };
    const onDeletePost = async () => {
        try {
            await axios.delete(
                `${BASEURL}/api/picture/${params.id}/delete
            `,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            navigate(-1);
        } catch (e) {
            console.log(e);
        }
    };
    const cancelConfirm = () => console.log('취소했습니다.');
    const confirmDelete = useConfirm('삭제하시겠습니까?', onDeletePost, cancelConfirm);

    const onEdit = () => {
        navigate('/community/photo/edit', { state: params.id });
    };

    const onFollowing = async (followingName: string) => {
        if (!TOKEN) {
            navigate('/login');
        }
        const followData = { followingName: followingName };
        const saveFollowDto = JSON.stringify(followData);
        console.log(saveFollowDto);
        try {
            await axios.post(`${BASEURL}/api/following/save`, saveFollowDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

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
        <StyledPhotoDetailsContainer>
            <div style={{ width: 720, margin: 'auto' }}>
                <Modal isOpen={openModal} ariaHideApp={false} style={customStyles}>
                    <ReportModal setOpenModal={setOpenModal} reportId={params.id} />
                </Modal>
                <StyledDetailsBlock>
                    <StyledTopTextBlock>
                        <StyledViewCountText>조회 {details?.viewCount}명</StyledViewCountText>
                        {myAccountId === String(details?.accountId) && (
                            <StyledReportText onClick={confirmDelete}>삭제</StyledReportText>
                        )}
                        {myAccountId === String(details?.accountId) && (
                            <StyledReportText onClick={onEdit}>수정</StyledReportText>
                        )}
                        {myAccountId !== String(details?.accountId) && (
                            <StyledReportText onClick={() => setOpenModal(!openModal)}>신고</StyledReportText>
                        )}
                    </StyledTopTextBlock>
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                        {convertKor(details?.classification ? details.classification : 'FLOWER')}
                    </div>
                    <ItemList
                        width="100%"
                        imgHeight="100%"
                        cols={1}
                        horizontalGap={0}
                        verticalGap={0}
                        items={details?.pictureContentDtoList ? details?.pictureContentDtoList : data}
                        RenderComponent={PhotoDetailsItem}
                    />
                    <StyledUserInfoBlock>
                        <StyledProfileBlock>
                            <StyledWriterBlock>
                                <StyeldAvatarBlock>
                                    <Avatar
                                        width="100%"
                                        paddingBottom="100%"
                                        borderRadius="100%"
                                        picUrl={details?.accountProfileUrl}
                                    />
                                </StyeldAvatarBlock>
                                <div>
                                    <StyledWriterNickname>{details?.accountNickName}</StyledWriterNickname>
                                    <StyledWriterText>{details?.accountNickName}</StyledWriterText>
                                </div>
                            </StyledWriterBlock>
                        </StyledProfileBlock>
                        <StyledFollowButtonBlock>
                            <span onClick={() => onFollowing(details?.accountNickName ? details.accountNickName : '')}>
                                팔로우
                            </span>
                        </StyledFollowButtonBlock>
                    </StyledUserInfoBlock>
                    <StyledBorderLine />
                    <CommentItem
                        commentsList={commentsList}
                        pictureId={params.id}
                        testComments={comment}
                        setTestComments={setComment}
                        category="picture"
                        setCommentsList={setCommentsList}
                    />
                </StyledDetailsBlock>
            </div>
        </StyledPhotoDetailsContainer>
    );
};

const StyledWriterNickname = styled.div`
    font-family: NotoSansKR;
    margin: 13px 0px 1px 18px;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.63;
    letter-spacing: normal;
    color: #272727;
`;
const StyledViewCountText = styled.div`
    flex: 1;
    font-size: 18px;
    color: grey;
`;

const StyledReportText = styled.div`
    padding-left: 10px;
    font-size: 15px;
    color: silver;
    cursor: pointer;
`;

const StyledTopTextBlock = styled.div`
    width: 100%;
    display: flex;
`;

const StyledDetailsBlock = styled.div`
    width: 100%;
`;

const StyledPhotoDetailsContainer = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
`;

const StyledFollowButtonBlock = styled.div`
    box-sizing: border-box;
    width: 72px;
    height: 30px;
    margin: 28px 0 22px 357px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #0d6637;
    span {
        font-family: NotoSansKR;
        font-size: 13px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fff;
    }
`;

const StyledBorderLine = styled.div`
    width: 100%;
    height: 45px;
`;

const StyeldAvatarBlock = styled.div`
    width: 80px;
`;

const StyledWriterText = styled.div`
    margin: 1px 0px 14px 18px;
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.86;
    letter-spacing: normal;
    color: #7b7b7b;
`;

const StyledWriterBlock = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2px;
`;

const StyledProfileBlock = styled.div`
    flex: 1;
`;

const StyledUserInfoBlock = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    height: 120px;
    padding: 20px 16px;
    background-color: #f5f5f5;
`;

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        left: '0',
        margin: 'auto',
        width: '300px',
        height: '400px',
        padding: '0',
        overflow: 'hidden',
    },
};
export default React.memo(PhotoDetails);
