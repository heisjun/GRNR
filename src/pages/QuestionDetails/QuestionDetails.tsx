import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar, ItemList } from 'common/components';
import { getDebouncedFunc } from 'common/funcs';
import { useParams, useNavigate } from 'react-router-dom';
import { default as callApi } from 'common/api';
import { IQuestionDetailsParmas, ICommentsParams } from 'common/types';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const QuestionDetails: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<IQuestionDetailsParmas>();
    const [commentsList, setCommentsList] = useState<ICommentsParams>();
    const [comment, setComment] = useState('');
    const [recomment, setRecomment] = useState('');
    const [isActive, setIsActive] = useState([false]);
    const sideBarRef = useRef<any>(null);

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.questionGet(Number(params.id));
                setDetails(response.data.value[0]);
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
                    `${BASEURL}/api/inquiry/detail/comment/${params.id}
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

    function timeForToday(value: any) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 4) {
            return `${betweenTimeDay}일전`;
        }

        return `${value}`;
    }

    const onDeletePost = async () => {
        try {
            await axios.delete(`${BASEURL}/api/inquiry/delete/${params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            navigate(-1);
        } catch (e) {
            console.log(e);
        }
    };

    const onEdit = () => {
        navigate('/community/question/edit', { state: params.id });
    };

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

    return (
        <StyledPhotoDetailsContainer>
            <StyledDetailsBlock>
                <StyledTopTextBlock>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <StyledContentText>Q&A: {params.id} </StyledContentText>
                        <div style={{ display: 'flex' }}>
                            <div onClick={onEdit} style={{ cursor: 'pointer' }}>
                                수정
                            </div>
                            <div onClick={onDeletePost} style={{ cursor: 'pointer' }}>
                                삭제
                            </div>
                        </div>
                    </div>
                    <StyledTitleText>{details?.title}</StyledTitleText>
                    <StyledContentText>{timeForToday(details?.time)}</StyledContentText>
                    <div style={{ display: 'flex' }}>
                        {details?.tagList &&
                            details?.tagList.map((e: any, index: number) => (
                                <StyledKeyword key={index}>{e.tagName}</StyledKeyword>
                            ))}
                    </div>
                </StyledTopTextBlock>
                <StyledTaggedPhotoContainer>
                    <StyledImageContainer width={'100%'} height={'100%'} paddingBottom={'100%'}>
                        <StyledImageBlock>
                            <StyledImg src={details?.picList[0].pictureUrl} width="100%" height="100%" />
                        </StyledImageBlock>
                    </StyledImageContainer>
                    <StyledTagBoxesBlock />
                    <StyledDetailsText>{details?.content}</StyledDetailsText>
                    <StyledBorderLine />
                </StyledTaggedPhotoContainer>
                <StyledUserInfoBlock>
                    <StyledProfileBlock>
                        <StyledWriterBlock>
                            <StyeldAvatarBlock>
                                <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                            </StyeldAvatarBlock>
                            <StyledWriterText>{details?.accountNicName}</StyledWriterText>
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
                        <StyledButtonText>{commentsList?.commentQuantity}</StyledButtonText>
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

const StyledContentText = styled.div`
    font-size: 15px;
    color: grey;
    margin-bottom: 5px;
`;

const StyledTitleText = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: grey;
    margin-bottom: 5px;
`;

const StyledTopTextBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
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

const StyledKeyword = styled.div`
    color: gray;
    font-size: 13px;
    border: 1px solid gray;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
    margin-right: 5px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
        padding: 1%;
    }
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

const StyledDetailsText = styled.div`
    font-size: 15px;
    font-weight: 100;
    color: grey;
`;

const StyledTagBoxesBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3% 0% 3% 0%;
`;

const StyledTagBox = styled.div`
    width: 20%;
    padding-bottom: 20%;
    border-radius: 35%;
    border: solid 1px;
    border-color: silver;
`;

const StyledImg = styled.img`
    cursor: pointer;
`;

const StyledImageBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 5px;
`;

const StyledImageContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    background-color: grey;
    border-radius: 5px;
`;

const StyledTaggedPhotoContainer = styled.div``;

export default QuestionDetails;
