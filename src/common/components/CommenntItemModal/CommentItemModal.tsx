import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';
import styled from 'styled-components';
import { ICommentItem } from './CommentItemModal.type';
import { default as callApi } from 'common/api';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark, FaRegCommentDots } from 'react-icons/fa';
import { IPhotoDetailsParams } from 'common/types';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const CommentItemModal: React.FC<ICommentItem> = (props) => {
    const navigate = useNavigate();
    const { commentsList, pictureId, category } = props;
    const [comment, setComment] = useState('');
    const [recomment, setRecomment] = useState('');
    const [isActive, setIsActive] = useState([false]);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<IPhotoDetailsParams>();

    function onOpenBtn(index: number) {
        if (!TOKEN) {
            navigate('/login');
        }
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
                const response = await callApi.getDetailList(Number(pictureId), 'picture');
                setDetails(response.data.value);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const onDeleteComment = async (commentId: number) => {
        try {
            await axios.delete(`${BASEURL}/api/${category}/comment/${commentId}/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onCommentLike = async (commentId: number) => {
        if (!TOKEN) {
            navigate('/login');
        }
        try {
            await axios.post(
                `${BASEURL}/api/${category}/comment/${commentId}/like`,
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
            await axios.post(`${BASEURL}/api/${category}/${pictureId}/comment/save`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });

            setComment('');
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
            await axios.post(`${BASEURL}/api/${category}/${pictureId}/comment/save`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onCommentReport = async (commentId: number) => {
        if (!TOKEN) {
            navigate('/login');
        }
        const res = await axios.put(
            `${BASEURL}/api/${category}/comment/${commentId}/report?report=신고된 댓글입니다
        `,
            {},
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${TOKEN}`,
                },
            },
        );

        if (res.status === 201) console.log(res.data);
    };

    return (
        <StyledCommentListContainer>
            {commentsList?.commentDtoList &&
                commentsList?.commentDtoList.map((item, index) => {
                    return (
                        <StyledCommentListContainer key={index}>
                            <StyledCommentBlock>
                                <StyledAvatarBlock>
                                    <Avatar
                                        width="100%"
                                        paddingBottom="100%"
                                        borderRadius="100%"
                                        picUrl={item.accountProfileUrl}
                                    />
                                </StyledAvatarBlock>
                                <StyledCommentItem>
                                    <StyledCommentNickname>{item.accountNicName}</StyledCommentNickname>
                                    <StyledCommentContent>{item.content}</StyledCommentContent>
                                </StyledCommentItem>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {item.myLike ? (
                                        <FaHeart
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: 15,
                                                color: 'red',
                                            }}
                                            onClick={() => onCommentLike(item.commentId)}
                                        />
                                    ) : (
                                        <FaRegHeart
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: 15,
                                            }}
                                            onClick={() => onCommentLike(item.commentId)}
                                        />
                                    )}
                                </div>
                            </StyledCommentBlock>
                            <StyledcommentSubItemContainer>
                                <StyledcommentSubItem> 좋아요 {item.likeCount} 개</StyledcommentSubItem>
                                <StyledcommentSubItem onClick={() => onOpenBtn(index)}>답글달기</StyledcommentSubItem>
                                {item.accountNicName !== sessionStorage.getItem('nickName') && (
                                    <StyledcommentSubItem onClick={() => onCommentReport(item.commentId)}>
                                        신고
                                    </StyledcommentSubItem>
                                )}
                                {item.accountNicName === sessionStorage.getItem('nickName') && (
                                    <StyledcommentSubItem onClick={() => onDeleteComment(item.commentId)}>
                                        삭제
                                    </StyledcommentSubItem>
                                )}
                            </StyledcommentSubItemContainer>
                            {item.commentChildDtoList &&
                                item.commentChildDtoList.map((recomment, idx) => {
                                    return (
                                        <div style={{ paddingLeft: 46 }} key={idx}>
                                            <div style={{ display: 'flex', width: '100%' }}>
                                                <StyledAvatarBlock>
                                                    <Avatar
                                                        width="100%"
                                                        paddingBottom="100%"
                                                        borderRadius="100%"
                                                        picUrl={recomment.accountProfileUrl}
                                                    />
                                                </StyledAvatarBlock>
                                                <StyledCommentItem>
                                                    <StyledCommentNickname>
                                                        {recomment.accountNicName}
                                                    </StyledCommentNickname>
                                                    <StyledCommentContent>{recomment.content}</StyledCommentContent>
                                                </StyledCommentItem>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FaRegHeart
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: 15,
                                                        }}
                                                        onClick={() => onCommentLike(item.commentId)}
                                                    />
                                                </div>
                                            </div>
                                            <StyledcommentSubItemContainer>
                                                <StyledcommentSubItem>
                                                    좋아요 {recomment.likeCount} 개
                                                </StyledcommentSubItem>
                                                <StyledcommentSubItem onClick={() => onOpenBtn(index)}>
                                                    답글달기
                                                </StyledcommentSubItem>
                                                {recomment.accountNicName !== sessionStorage.getItem('nickName') && (
                                                    <StyledcommentSubItem
                                                        onClick={() => onCommentReport(recomment.commentId)}
                                                    >
                                                        신고
                                                    </StyledcommentSubItem>
                                                )}
                                                {recomment.accountNicName === sessionStorage.getItem('nickName') && (
                                                    <StyledcommentSubItem
                                                        onClick={() => onDeleteComment(recomment.commentId)}
                                                    >
                                                        삭제
                                                    </StyledcommentSubItem>
                                                )}
                                            </StyledcommentSubItemContainer>
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
                        </StyledCommentListContainer>
                    );
                })}
            <StyledCommentInfoBlock>
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 15,
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                    >
                        <FaRegHeart style={{ fontSize: 20, paddingRight: 5 }} /> {details?.likeCount}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 15,
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                    >
                        <FaRegCommentDots style={{ fontSize: 20, paddingRight: 5 }} />
                        {commentsList?.commentQuantity}
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 15,
                        paddingLeft: 5,
                        paddingRight: 5,
                    }}
                >
                    <FaRegBookmark style={{ fontSize: 20, paddingRight: 5 }} />
                    {details?.scrapCount}
                </div>
            </StyledCommentInfoBlock>
            <StyledInputContainer>
                <StyledInputBox
                    type="text"
                    value={comment}
                    placeholder="댓글을 입력해주세요"
                    onChange={(e) => {
                        if (!TOKEN) {
                            navigate('/login');
                        }
                        setComment(e.target.value);
                    }}
                />
                <StyledInputBtn onClick={onCommentSave}>게시</StyledInputBtn>
            </StyledInputContainer>
        </StyledCommentListContainer>
    );
};

const StyledCommentListContainer = styled.div``;

const StyledCommentInfoBlock = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 65px;
    width: 40%;
    right: 0;
    justify-content: space-between;
`;

const StyledInputContainer = styled.div`
    bottom: 0;
    width: 40%;
    right: 0;
    margin-top: 15px;
    position: absolute;
`;

const StyledInputBox = styled.input`
    width: 98%;
    height: 50px;
    font-size: 15px;
    padding-left: 10px;
    background-color: #fafafa;
    border: 1px solid #b9b9b9;
    color: #b9b9b9;
`;

const StyledInputBtn = styled.div`
    position: absolute;
    top: 20px;
    right: 15px;
    color: #0d6637;
    font-size: 16px;
    font-weight: bold;
    z-index: 10;
    cursor: pointer;
`;

const StyledCommentBlock = styled.div`
    display: flex;
    width: 100%;
`;

const StyledCommentItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
`;

const StyledCommentNickname = styled.div`
    font-weight: bold;
    font-size: 15px;
    padding: 5px 0px 5px 10px;
`;

const StyledCommentContent = styled.div`
    font-weight: 300;
    font-size: 14px;
    padding: 0px 0px 0px 10px;
`;

const StyledAvatarBlock = styled.div`
    width: 36px;
    display: flex;
    align-items: flex-start;
`;

const StyledcommentSubItemContainer = styled.div`
    display: flex;
    padding-left: 46px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: 300;
    font-size: 12px;
`;

const StyledcommentSubItem = styled.div`
    padding-right: 1vw;
`;
export default CommentItemModal;
