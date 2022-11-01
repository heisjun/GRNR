import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar, ItemList } from 'common/components';
import { TaggedPhoto } from 'domains';
import { getDebouncedFunc } from 'common/funcs';
import { useParams, useNavigate } from 'react-router-dom';
import { default as callApi } from 'common/api';
import { IPhotoDetailsParams, ICommentsParams } from 'common/types';
import axios from 'axios';
import CommentItem from 'common/components/CommentItem';
import Modal from 'react-modal';
import ReportModal from 'common/components/ReportModal';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const PhotoDetails: React.FC = () => {
    const navigate = useNavigate();
    const sideBarRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<IPhotoDetailsParams>();
    const [commentsList, setCommentsList] = useState<ICommentsParams>();
    const [openModal, setOpenModal] = useState(false);

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.getDetailList(Number(params.id), 'picture');
                setDetails(response.data.value);
                console.log('렌더링중');
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${params.id}/comment/view
                `,
                );
                setCommentsList(CommentData.data.value.content[0]);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const scrollHandler = () => {
        sideBarRef.current.style.transition = 'all 0.5s ease-in-out';
        sideBarRef.current.style.transform = `translateY(${window.scrollY}px)`;
    };

    const debouncedScrollHandler = getDebouncedFunc(scrollHandler, 100);

    useEffect(() => {
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
        };
    }, []);

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

    const onPhotoLike = async () => {
        try {
            await axios.post(
                `${BASEURL}/api/picture/${params.id}/like`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onPhotoScrap = async () => {
        try {
            await axios.post(
                `${BASEURL}/api/picture/${params.id}/scrap`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
        } catch (e) {
            console.log(e);
        }
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

    return (
        <StyledPhotoDetailsContainer>
            <Modal isOpen={openModal} ariaHideApp={false} style={customStyles}>
                <ReportModal setOpenModal={setOpenModal} reportId={params.id} />
            </Modal>
            <StyledDetailsBlock>
                <StyledTopTextBlock>
                    <StyledViewCountText>조회 {details?.viewCount}명</StyledViewCountText>
                    <StyledReportText onClick={confirmDelete}>삭제</StyledReportText>
                    <StyledReportText onClick={onEdit}>수정</StyledReportText>
                    <StyledReportText onClick={() => setOpenModal(!openModal)}>신고</StyledReportText>
                </StyledTopTextBlock>
                <ItemList
                    width="100%"
                    imgHeight="100%"
                    cols={1}
                    horizontalGap={0}
                    verticalGap={0}
                    items={details?.pictureContentDtoList ? details?.pictureContentDtoList : data}
                    RenderComponent={TaggedPhoto}
                />
                <StyledUserInfoBlock>
                    <StyledProfileBlock>
                        <StyledWriterBlock>
                            <StyeldAvatarBlock>
                                <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                            </StyeldAvatarBlock>
                            <StyledWriterText>{details?.accountNickName}</StyledWriterText>
                        </StyledWriterBlock>
                    </StyledProfileBlock>
                    <StyledFollowButtonBlock>
                        <StyledFollowButton>
                            <StyledFollowText
                                onClick={() => onFollowing(details?.accountNickName ? details.accountNickName : '')}
                            >
                                팔로우 +
                            </StyledFollowText>
                        </StyledFollowButton>
                    </StyledFollowButtonBlock>
                </StyledUserInfoBlock>
                <StyledBorderLine />
                <CommentItem commentsList={commentsList} pictureId={params.id} category="picture" />
            </StyledDetailsBlock>
            <StyledButtonsContainer>
                <StyledButtonsBlock ref={sideBarRef}>
                    <StyledButtonBlock>
                        <StyledButton onClick={onPhotoLike} />
                        <StyledButtonText>좋아요:{details?.likeCount}</StyledButtonText>
                    </StyledButtonBlock>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>댓글:{commentsList?.commentQuantity}</StyledButtonText>
                    </StyledButtonBlock>
                    <StyledButtonBlock>
                        <StyledButton onClick={onPhotoScrap} />
                        <StyledButtonText>스크랩:{details?.scrapCount}</StyledButtonText>
                    </StyledButtonBlock>
                </StyledButtonsBlock>
            </StyledButtonsContainer>
        </StyledPhotoDetailsContainer>
    );
};

const StyledButtonText = styled.div`
    font-size: 14px;
    color: grey;
    margin-top: 10px;
`;

const StyledButton = styled.div`
    width: 50%;
    padding-bottom: 50%;
    background-color: silver;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: grey;
    }
`;

const StyledButtonBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20%;
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
    height: 50px;
    display: flex;
    margin-bottom: -15px;
`;

const StyledDetailsBlock = styled.div`
    width: 70%;
`;

const StyledButtonsBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledButtonsContainer = styled.div`
    position: relative;
    width: 10%;
`;

const StyledPhotoDetailsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledFollowText = styled.div`
    font-size: 15px;
    color: grey;
`;

const StyledFollowButton = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px;
    border-radius: 25px;
    border-color: silver;
    cursor: pointer;
    &:hover {
        background-color: silver;
    }
`;

const StyledFollowButtonBlock = styled.div`
    width: 18%;
`;

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: silver;
    margin: 30px 0px 30px 0px;
`;

const StyeldAvatarBlock = styled.div`
    width: 10%;
`;

const StyledWriterText = styled.div`
    margin-left: 2%;
    font-size: 20px;
    color: grey;
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
    width: 100%;
    display: flex;
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
