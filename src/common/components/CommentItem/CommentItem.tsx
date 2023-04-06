import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';
import styled from 'styled-components';
import { ICommentItem } from './CommentItem.type';
import { api, default as callApi } from 'common/api';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { IPhotoDetailsParams } from 'common/types';
import Modal from 'react-modal';
import ReportModal from 'common/components/ReportModal';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const CommentItem: React.FC<ICommentItem> = (props) => {
    const navigate = useNavigate();
    const { commentsList, setCommentsList, pictureId, category, testComments, setTestComments, fetchData, fetchData2 } =
        props;
    const [comment, setComment] = useState('');
    const [recomment, setRecomment] = useState('');
    const [tagNickName, setTagNickName] = useState('');
    const [isActive, setIsActive] = useState([false]);
    const [details, setDetails] = useState<IPhotoDetailsParams>();
    const [openModal, setOpenModal] = useState(false);
    const [reportId, setReportId] = useState<number>();
    const reportListRef = useRef<any>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (reportListRef.current && !reportListRef.current.contains(e.target as Node)) {
                setOpenModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [reportListRef]);

    function onOpenBtn(index: number, tagNickName: string) {
        if (!TOKEN) {
            navigate('/login');
        }
        const newIsActive = [false];
        newIsActive[index] = true;
        setIsActive(newIsActive);
        /*  setTagNickName(tagNickName);
        setRecomment('@' + tagNickName + ' '); */
    }

    function onCloseBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = false;
        setIsActive(newIsActive);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!TOKEN) {
                try {
                    const response = await callApi.getDetailList(Number(pictureId), 'picture');
                    setDetails(response.data.value);
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    const response = await api.get(`${BASEURL}/api/picture/${pictureId}/detail`, {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    });
                    setDetails(response.data.value);
                } catch (e) {
                    console.log(e);
                }
            }
        };
        fetchData();
    }, [location.search]);

    const onDeleteComment = async (commentId: number) => {
        try {
            await api.delete(`${BASEURL}/api/${category}/comment/${commentId}/delete`);
            setTestComments(testComments.filter((it) => it.commentId !== commentId));
            setCommentsList((prevState: any) => {
                return { ...prevState, commentQuantity: commentsList ? commentsList.commentQuantity - 1 : 0 };
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onDeleteReComment = async (commentId: number, parentId: number) => {
        try {
            await api.delete(`${BASEURL}/api/${category}/comment/${commentId}/delete`);

            let ParentcommentIndex = 0;

            testComments.map((it, index) => (it.commentId === parentId ? (ParentcommentIndex = index) : it));
            const newCommentChildDtoList = testComments[ParentcommentIndex].commentChildDtoList.filter(
                (it) => it.commentId !== commentId,
            );
            setTestComments(
                testComments.map((it) =>
                    it.commentId === parentId ? { ...it, commentChildDtoList: newCommentChildDtoList } : it,
                ),
            );
            setCommentsList((prevState: any) => {
                return { ...prevState, commentQuantity: commentsList ? commentsList.commentQuantity - 1 : 0 };
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onCommentLike = async (commentId: number, likeCount: number) => {
        if (!TOKEN) {
            navigate('/login');
        }
        try {
            await api.post(`${BASEURL}/api/${category}/comment/${commentId}/like`);
            setTestComments(
                testComments.map((it) =>
                    it.commentId === commentId ? { ...it, myLike: true, likeCount: likeCount + 1 } : it,
                ),
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onReCommentLike = async (commentId: number, likeCount: number, parentId: number) => {
        if (!TOKEN) {
            navigate('/login');
        }
        try {
            await api.post(`${BASEURL}/api/${category}/comment/${commentId}/like`);
            let ParentcommentIndex = 0;

            testComments.map((it, index) => (it.commentId === parentId ? (ParentcommentIndex = index) : it));
            const newCommentChildDtoList = testComments[ParentcommentIndex].commentChildDtoList.map((it) =>
                it.commentId === commentId ? { ...it, myLike: true, likeCount: likeCount + 1 } : it,
            );

            setTestComments(
                testComments.map((it) =>
                    it.commentId === parentId ? { ...it, commentChildDtoList: newCommentChildDtoList } : it,
                ),
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onReCommentUnLike = async (commentId: number, likeCount: number, parentId: number) => {
        if (!TOKEN) {
            navigate('/login');
        }
        try {
            await api.post(`${BASEURL}/api/${category}/comment/${commentId}/like`);
            let ParentcommentIndex = 0;

            testComments.map((it, index) => (it.commentId === parentId ? (ParentcommentIndex = index) : it));
            const newCommentChildDtoList = testComments[ParentcommentIndex].commentChildDtoList.map((it) =>
                it.commentId === commentId ? { ...it, myLike: false, likeCount: likeCount - 1 } : it,
            );

            setTestComments(
                testComments.map((it) =>
                    it.commentId === parentId ? { ...it, commentChildDtoList: newCommentChildDtoList } : it,
                ),
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onCommentUnLike = async (commentId: number, likeCount: number) => {
        if (!TOKEN) {
            navigate('/login');
        }
        try {
            await api.post(`${BASEURL}/api/${category}/comment/${commentId}/like`);
            setTestComments(
                testComments.map((it) =>
                    it.commentId === commentId ? { ...it, myLike: false, likeCount: likeCount - 1 } : it,
                ),
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onCommentSave = async () => {
        if (!comment) {
            alert('댓글을 입력해 주세요!');
            return;
        }
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
            await api.post(`${BASEURL}/api/${category}/${pictureId}/comment/save`, body);
            fetchData && fetchData();
            fetchData2 && fetchData2();
            setComment('');
            /*  if (!comment) {
            alert('댓글을 입력해 주세요!');
            return;
        }
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
            await api.post(`${BASEURL}/api/${category}/${pictureId}/comment/save`, body);
            const newComment = {
                inquiryId: pictureId,
                commentId: null,
                myLike: false,
                commentNameList: [
                    {
                        commentId: null,
                        nickNameTag: null,
                    },
                ],
                content: comment,
                report: false,
                parentId: null,
                likeCount: 0,
                accountNicName: localStorage.getItem('nickName'),
                accountProfileUrl: localStorage.getItem('profileUrl'),
                commentChildDtoList: null,
            };
            setTestComments([...testComments, newComment]);
            setCommentsList((prevState: any) => {
                return { ...prevState, commentQuantity: commentsList ? commentsList.commentQuantity + 1 : 0 };
            });

            setComment(''); */
        } catch (e) {
            console.log(e);
        }
    };

    const onReCommentSave = async (commentId: number, content: string) => {
        if (!content) {
            alert('댓글을 입력해 주세요!');
            return;
        }
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
            await api.post(`${BASEURL}/api/${category}/${pictureId}/comment/save`, body);
            fetchData && fetchData();
            fetchData2 && fetchData2();
            setRecomment('');

            // let commentIndex = 0;

            // testComments.map((it, index) => (it.commentId === commentId ? (commentIndex = index) : it));

            // interface IcommentChildDtoList {
            //     parentId: number;
            //     commentId: number;
            //     myLike: boolean;
            //     content: string;
            //     report: boolean;
            //     accountNicName: string;
            //     accountProfileUrl: string;
            //     likeCount: number;
            //     /*   commentNicNameList: {
            //         commentId: number;
            //         nicNameTags: string;
            //     }[]; */
            //     commentNicNameList: null;
            // }

            // const commentChildDtoList: IcommentChildDtoList[] = testComments[commentIndex].commentChildDtoList;

            // const newComment = {
            //     parentId: commentId,
            //     commentId: commentId,
            //     myLike: false,
            //     content: content,
            //     report: false,
            //     accountNicName: String(localStorage.getItem('nickName')),
            //     accountProfileUrl: String(localStorage.getItem('profileUrl')),
            //     likeCount: 0,
            //     commentNicNameList: null,
            // };

            // commentChildDtoList.push(newComment);

            // setTestComments(
            //     testComments.map((it) =>
            //         it.commentId === commentId ? { ...it, commentChildDtoList: commentChildDtoList } : it,
            //     ),
            // );
            // setCommentsList((prevState: any) => {
            //     return { ...prevState, commentQuantity: commentsList ? commentsList.commentQuantity + 1 : 0 };
            // });
        } catch (e) {
            console.log(e);
        }
    };

    /*  const onCommentReport = async (commentId: number) => {
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
    }; */

    const onPhotoLike = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            try {
                await api.post(`${BASEURL}/api/picture/${pictureId}/like`);

                setDetails((prevState: any) => {
                    return { ...prevState, myLike: true, likeCount: details ? details.likeCount + 1 : 0 };
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    const onPhotoUnLike = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            try {
                await api.post(`${BASEURL}/api/picture/${pictureId}/like`);
                setDetails((prevState: any) => {
                    return { ...prevState, myLike: false, likeCount: details ? details.likeCount - 1 : 0 };
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    const onPhotoScrap = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            try {
                await api.post(`${BASEURL}/api/picture/${pictureId}/scrap`);
                setDetails((prevState: any) => {
                    return { ...prevState, myScrap: true, scrapCount: details ? details.scrapCount + 1 : 0 };
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    const onPhotoUnScrap = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            try {
                await api.post(`${BASEURL}/api/picture/${pictureId}/scrap`);
                setDetails((prevState: any) => {
                    return { ...prevState, myScrap: false, scrapCount: details ? details.scrapCount - 1 : 0 };
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    const onGoUserPage = (accountId: number) => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            localStorage.setItem('userId', String(accountId));
            {
                accountId === Number(localStorage.getItem('accountId'))
                    ? navigate('/mypage')
                    : navigate(`/userpage/${accountId}`);
            }
        }
    };

    const onClickReport = (commentId: number) => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            setReportId(commentId);
            setOpenModal(!openModal);
        }
    };

    const onCommentEnter = async (e: any) => {
        if (e.key === 'Enter') {
            if (!comment) {
                alert('댓글을 입력해 주세요!');
                return;
            }
            const body = {
                commentId: null,
                content: comment,
                nickNameTag: [
                    {
                        nickName: null,
                    },
                ],
            };
            await api.post(`${BASEURL}/api/${category}/${pictureId}/comment/save`, body);
            fetchData && fetchData();
            fetchData2 && fetchData2();
            setComment('');
        }
    };
    const onReCommenetEnter = async (e: any, commentId: number, index: number) => {
        if (e.key === 'Enter') {
            if (!recomment) {
                alert('댓글을 입력해 주세요!');
                return;
            }
            const body = {
                commentId: commentId,
                content: recomment,
                nickNameTag: [
                    {
                        nickName: null,
                    },
                ],
            };
            await api.post(`${BASEURL}/api/${category}/${pictureId}/comment/save`, body);
            fetchData && fetchData();
            fetchData2 && fetchData2();
            onCloseBtn(index);
            setRecomment('');
        }
    };

    return (
        <StyledCommentListContainer>
            <Modal isOpen={openModal} ariaHideApp={false} style={customStyles}>
                <div ref={reportListRef}>
                    <ReportModal
                        setOpenModal={setOpenModal}
                        reportId={String(reportId)}
                        category={category}
                        type={'comment'}
                    />
                </div>
            </Modal>

            <StyledCommentInfoBlock>
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 14,
                            fontWeight: 500,
                            marginRight: 20,
                        }}
                    >
                        {details?.myLike ? (
                            <StyledInfoIcon src="/btnHeart.png" onClick={() => onPhotoUnLike()} />
                        ) : (
                            <StyledInfoIcon src="/btnBlankHeart.png" onClick={() => onPhotoLike()} />
                        )}
                        {details?.likeCount}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    >
                        <StyledInfoIcon src="/btnComment.png" />
                        {commentsList?.commentQuantity}
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 14,
                        fontWeight: 500,
                    }}
                >
                    {details?.myScrap ? (
                        <StyledInfoIcon src="/btnBookmark.png" onClick={() => onPhotoUnScrap()} />
                    ) : (
                        <StyledInfoIcon src="/btnBlankBookmark.png" onClick={() => onPhotoScrap()} />
                    )}

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
                    onKeyPress={onCommentEnter}
                />
                <StyledInputBtn onClick={onCommentSave}>게시</StyledInputBtn>
            </StyledInputContainer>
            {testComments &&
                testComments.map((item, index) => {
                    return (
                        <StyledCommentListContainer key={index}>
                            <StyledCommentBlock>
                                <StyledAvatarBlock onClick={() => onGoUserPage(item.accountId)}>
                                    <Avatar
                                        width="100%"
                                        paddingBottom="100%"
                                        borderRadius="100%"
                                        picUrl={item.accountProfileUrl}
                                    />
                                </StyledAvatarBlock>
                                <StyledCommentItem>
                                    <StyledCommentNickname onClick={() => onGoUserPage(item.accountId)}>
                                        {item.accountNicName}
                                    </StyledCommentNickname>
                                    <StyledCommentContent>{item.content}</StyledCommentContent>
                                </StyledCommentItem>
                                <div style={{ display: 'flex', alignItems: 'center', paddingRight: 16 }}>
                                    {item.myLike ? (
                                        <FaHeart
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: 15,
                                                color: 'red',
                                            }}
                                            onClick={() => onCommentUnLike(item.commentId, item.likeCount)}
                                        />
                                    ) : (
                                        <FaRegHeart
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: 15,
                                            }}
                                            onClick={() => onCommentLike(item.commentId, item.likeCount)}
                                        />
                                    )}
                                </div>
                            </StyledCommentBlock>
                            <StyledcommentSubItemContainer>
                                <StyledcommentSubItem> 좋아요 {item.likeCount} 개</StyledcommentSubItem>
                                {isActive[index] ? (
                                    <StyledcommentSubItem onClick={() => onCloseBtn(index)}>닫기</StyledcommentSubItem>
                                ) : (
                                    <StyledcommentSubItem onClick={() => onOpenBtn(index, item.accountNicName)}>
                                        답글달기
                                    </StyledcommentSubItem>
                                )}
                                {item.accountNicName !== localStorage.getItem('nickName') && (
                                    <StyledcommentSubItem onClick={() => onClickReport(item.commentId)}>
                                        신고
                                    </StyledcommentSubItem>
                                )}
                                {item.accountNicName === localStorage.getItem('nickName') && (
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
                                                <StyledAvatarBlock onClick={() => onGoUserPage(recomment.accountId)}>
                                                    <Avatar
                                                        width="100%"
                                                        paddingBottom="100%"
                                                        borderRadius="100%"
                                                        picUrl={recomment.accountProfileUrl}
                                                    />
                                                </StyledAvatarBlock>
                                                <StyledCommentItem>
                                                    <StyledCommentNickname
                                                        onClick={() => onGoUserPage(recomment.accountId)}
                                                    >
                                                        {recomment.accountNicName}
                                                    </StyledCommentNickname>
                                                    <StyledCommentContent>{recomment.content}</StyledCommentContent>
                                                </StyledCommentItem>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        paddingRight: 16,
                                                    }}
                                                >
                                                    {recomment.myLike ? (
                                                        <FaHeart
                                                            style={{
                                                                cursor: 'pointer',
                                                                fontSize: 15,
                                                                color: 'red',
                                                            }}
                                                            onClick={() =>
                                                                onReCommentUnLike(
                                                                    recomment.commentId,
                                                                    recomment.likeCount,
                                                                    recomment.parentId,
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <FaRegHeart
                                                            style={{
                                                                cursor: 'pointer',
                                                                fontSize: 15,
                                                            }}
                                                            onClick={() =>
                                                                onReCommentLike(
                                                                    recomment.commentId,
                                                                    recomment.likeCount,
                                                                    recomment.parentId,
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <StyledcommentSubItemContainer>
                                                <StyledcommentSubItem>
                                                    좋아요 {recomment.likeCount} 개
                                                </StyledcommentSubItem>
                                                <StyledcommentSubItem
                                                    onClick={() => onOpenBtn(index, recomment.accountNicName)}
                                                >
                                                    답글달기
                                                </StyledcommentSubItem>
                                                {recomment.accountNicName !== localStorage.getItem('nickName') && (
                                                    <StyledcommentSubItem
                                                        onClick={() => {
                                                            setReportId(recomment.commentId);
                                                            setOpenModal(!openModal);
                                                        }}
                                                    >
                                                        신고
                                                    </StyledcommentSubItem>
                                                )}
                                                {recomment.accountNicName === localStorage.getItem('nickName') && (
                                                    <StyledcommentSubItem
                                                        onClick={() =>
                                                            onDeleteReComment(recomment.commentId, recomment.parentId)
                                                        }
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
                                        marginBottom: 10,
                                        marginLeft: 46,
                                    }}
                                >
                                    <StyledAvatarBlock>
                                        <Avatar
                                            width="100%"
                                            paddingBottom="100%"
                                            borderRadius="100%"
                                            picUrl={localStorage.getItem('profileUrl')}
                                        />
                                    </StyledAvatarBlock>

                                    {/* <input
                                        type="text"
                                        value={recomment}
                                        style={{
                                            width: '70%',
                                            borderRadius: 15,
                                            paddingLeft: 5,
                                            borderColor: 'gray',
                                            borderWidth: 1.5,
                                        }}
                                        onChange={(e) => {
                                            setRecomment(e.target.value);
                                        }}
                                    />
                                    <button
                                        style={{
                                            color: 'white',
                                            backgroundColor: '#0d6637',
                                            border: 'none',
                                            borderRadius: 15,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                        }}
                                        onClick={() => {
                                            onReCommentSave(item.commentId, recomment);
                                            onCloseBtn(index);
                                            setRecomment('');
                                        }}
                                    >
                                        입력
                                    </button> */}
                                    <StyledRecommentInputContainer>
                                        <StyledRecommentInputBox
                                            type="text"
                                            value={recomment}
                                            placeholder="댓글을 입력해주세요"
                                            onChange={(e) => {
                                                setRecomment(e.target.value);
                                            }}
                                            onKeyPress={(event) => onReCommenetEnter(event, item.commentId, index)}
                                        />
                                        <StyledInputBtn
                                            onClick={() => {
                                                onReCommentSave(item.commentId, recomment);
                                                onCloseBtn(index);
                                                setRecomment('');
                                            }}
                                        >
                                            게시
                                        </StyledInputBtn>
                                    </StyledRecommentInputContainer>
                                </div>
                            )}
                        </StyledCommentListContainer>
                    );
                })}
        </StyledCommentListContainer>
    );
};

const StyledCommentListContainer = styled.div``;

const StyledCommentInfoBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledInputContainer = styled.div`
    position: relative;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const StyledRecommentInputContainer = styled.div`
    margin-left: 10px;
    position: relative;
`;

const StyledInputBox = styled.input`
    box-sizing: border-box;
    width: 720px;
    height: 50px;
    font-size: 15px;
    padding-left: 10px;
    background-color: #fafafa;
    border: 1px solid #b9b9b9;
    color: #b9b9b9;
`;

const StyledRecommentInputBox = styled.input`
    box-sizing: border-box;
    width: 630px;
    height: 50px;
    font-size: 15px;
    padding-left: 10px;
    background-color: #fafafa;
    border: 1px solid #b9b9b9;
    color: #b9b9b9;
`;

const StyledInputBtn = styled.div`
    position: absolute;
    top: 13px;
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
    width: 100%;
`;

const StyledCommentNickname = styled.div`
    font-weight: bold;
    font-size: 15px;
    padding: 0px 0px 0px 10px;
    cursor: pointer;
`;

const StyledCommentContent = styled.div`
    font-weight: 300;
    font-size: 14px;
    padding: 0px 0px 0px 10px;
    span {
        color: #0d6637;
        font-weight: bold;
        cursor: pointer;
    }
`;

const StyledAvatarBlock = styled.div`
    width: 36px;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
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
    cursor: pointer;
`;

const StyledInfoIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 6px;
    cursor: pointer;
`;

const customStyles = {
    /*  overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    }, */
    content: {
        left: '0',
        margin: 'auto',
        width: '250px',
        height: '350px',
        padding: '0',
        overflow: 'hidden',
    },
};
export default CommentItem;
