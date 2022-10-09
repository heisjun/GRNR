import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar, ItemList } from 'common/components';
import { TaggedPhoto } from 'domains';
import { getDebouncedFunc } from 'common/funcs';
import { useParams } from 'react-router-dom';
import { default as callApi } from 'common/api';
import { IPhotoDetailsParams, IQuestionCommentsParams } from 'common/types';
import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_USER_TOKEN;

const PhotoDetails: React.FC = () => {
    const sideBarRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<IPhotoDetailsParams>();
    const [commentsList, setCommentsList] = useState<IQuestionCommentsParams>();
    const [comment, setComment] = useState('');
    const [recomment, setRecomment] = useState('');
    const [isActive, setIsActive] = useState([false]);

    const params = useParams();

    function onOpenBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = true;
        setIsActive(newIsActive);
    }

    function onCloseBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = false;
        setIsActive(newIsActive);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.photoGet(Number(params.id));
                setDetails(response.data.value);
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

    const onDeleteComment = async (commendId: number) => {
        try {
            await axios.delete(`${BASEURL}/api/comment/delete/${commendId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onCommentLike = async (commendId: number) => {
        try {
            await axios.post(
                `${BASEURL}/api/like/${commendId}`,
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

    const onCommentSave = async () => {
        try {
            const body = {
                commentId: null,
                content: comment,
                nickNameTag: [
                    {
                        nickName: null,
                    },
                ],
            };
            await axios.post(`${BASEURL}/api/comment/new/${params.id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onReCommentSave = async (commentId: number, content: string) => {
        try {
            const body = {
                commentId: commentId,
                content: content,
                nickNameTag: [
                    {
                        nickName: null,
                    },
                ],
            };
            await axios.post(`${BASEURL}/api/comment/new/${params.id}`, body, {
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
            <StyledDetailsBlock>
                <StyledTopTextBlock>
                    <StyledViewCountText>조회 {details?.viewCount}명</StyledViewCountText>
                    <div>{params.id}</div>
                    <StyledReportText>신고</StyledReportText>
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
                            <StyledFollowText>팔로우 +</StyledFollowText>
                        </StyledFollowButton>
                    </StyledFollowButtonBlock>
                </StyledUserInfoBlock>
                <StyledBorderLine />
                <div>
                    <div>댓글:{commentsList?.commentQuantity}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Avatar width="6%" paddingBottom="6%" borderRadius="100%" />

                        <input
                            type="text"
                            value={comment}
                            style={{ width: '80%', borderRadius: 15, paddingLeft: 5 }}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        />
                        <button onClick={onCommentSave}>저장</button>
                    </div>
                    {commentsList?.commentDtoList &&
                        commentsList?.commentDtoList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <Avatar width="6%" paddingBottom="6%" borderRadius="100%" />
                                        <div
                                            style={{
                                                display: 'flex',
                                                width: '92%',
                                            }}
                                        >
                                            <div style={{ fontWeight: 500, fontSize: '1.5vw', padding: 10 }}>
                                                {item.accountNicName}
                                            </div>
                                            <div style={{ fontWeight: 300, fontSize: '1.5vw', padding: 10 }}>
                                                {item.content}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                width: '6%',
                                                backgroundColor: 'red',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => onCommentLike(item.commentId)}
                                        >
                                            하트
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            paddingLeft: '6%',
                                            fontWeight: 300,
                                            fontSize: '1.2vw',
                                        }}
                                    >
                                        <div style={{ paddingRight: '1vw' }}> 좋아요 {item.likeCount} 개</div>
                                        <div style={{ paddingRight: '1vw' }} onClick={() => onOpenBtn(index)}>
                                            답글달기
                                        </div>
                                        <div style={{ paddingRight: '1vw' }}>신고</div>
                                        <div
                                            style={{ paddingRight: '1vw' }}
                                            onClick={() => onDeleteComment(item.commentId)}
                                        >
                                            삭제
                                        </div>
                                    </div>
                                    {item.commentChildDtoList &&
                                        item.commentChildDtoList.map((i, d) => {
                                            return (
                                                <div style={{ paddingLeft: '6%' }} key={d}>
                                                    <div style={{ display: 'flex', width: '100%' }}>
                                                        <Avatar width="6%" paddingBottom="6%" borderRadius="100%" />
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                width: '92%',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    padding: 10,
                                                                    fontWeight: 500,
                                                                    fontSize: '1.5vw',
                                                                }}
                                                            >
                                                                {i.accountNicName}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    padding: 10,
                                                                    fontWeight: 300,
                                                                    fontSize: '1.5vw',
                                                                }}
                                                            >
                                                                {i.content}
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: '6%',
                                                                backgroundColor: 'red',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            하트
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            paddingLeft: '6%',
                                                            fontWeight: 300,
                                                            fontSize: '1.2vw',
                                                        }}
                                                    >
                                                        <div style={{ paddingRight: '1vw' }}>
                                                            좋아요 {i.likeCount} 개
                                                        </div>
                                                        <div
                                                            style={{ paddingRight: '1vw' }}
                                                            onClick={() => onOpenBtn(index)}
                                                        >
                                                            답글달기
                                                        </div>
                                                        <div
                                                            style={{ paddingRight: '1vw' }}
                                                            onClick={() => onDeleteComment(i.commentId)}
                                                        >
                                                            삭제
                                                        </div>
                                                        <div style={{ paddingRight: '1vw' }}>신고</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {isActive[index] && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: 10,
                                            }}
                                        >
                                            <Avatar width="6%" paddingBottom="6%" borderRadius="100%" />

                                            <input
                                                type="text"
                                                value={recomment}
                                                style={{ width: '80%', borderRadius: 15, paddingLeft: 5 }}
                                                onChange={(e) => {
                                                    setRecomment(e.target.value);
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    onReCommentSave(item.commentId, recomment);
                                                    onCloseBtn(index);
                                                    setRecomment('');
                                                }}
                                            >
                                                저장
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </StyledDetailsBlock>
            <StyledButtonsContainer>
                <StyledButtonsBlock ref={sideBarRef}>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>{details?.likeCount}</StyledButtonText>
                    </StyledButtonBlock>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>12</StyledButtonText>
                    </StyledButtonBlock>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>{details?.scrapCount}</StyledButtonText>
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

export default PhotoDetails;
