import axios from 'axios';
import React, { useState } from 'react';
import Avatar from '../Avatar';
import { ICommentItem } from './CommentItem.type';

const BASEURL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_USER_TOKEN;

const CommentItem: React.FC<ICommentItem> = (props) => {
    const { commentsList, pictureId, category } = props;
    const [comment, setComment] = useState('');
    const [recomment, setRecomment] = useState('');
    const [isActive, setIsActive] = useState([false]);

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
                                <div style={{ paddingRight: '1vw' }} onClick={() => onCommentReport(item.commentId)}>
                                    신고
                                </div>
                                <div style={{ paddingRight: '1vw' }} onClick={() => onDeleteComment(item.commentId)}>
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
                                                <div style={{ paddingRight: '1vw' }}>좋아요 {i.likeCount} 개</div>
                                                <div style={{ paddingRight: '1vw' }} onClick={() => onOpenBtn(index)}>
                                                    답글달기
                                                </div>
                                                <div
                                                    style={{ paddingRight: '1vw' }}
                                                    onClick={() => onDeleteComment(i.commentId)}
                                                >
                                                    삭제
                                                </div>
                                                <div
                                                    style={{ paddingRight: '1vw' }}
                                                    onClick={() => onCommentReport(i.commentId)}
                                                >
                                                    신고
                                                </div>
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
    );
};

export default CommentItem;
