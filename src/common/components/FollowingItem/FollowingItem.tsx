import { Avatar } from 'common/components';
import Slider from 'common/components/Slider';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IFollowingItem } from './FollowingItem.type';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import Modal from 'react-modal';
import ReportModal from 'common/components/ReportModal';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const FollowingItem: React.FC<IFollowingItem> = (props) => {
    const { data, setFunc, items } = props;
    const childRef = useRef<any>();

    const [modal, setModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const dropdownListRef = useRef<any>(null);

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
                `${BASEURL}/api/picture/${data.id}/delete
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
        {
            data.video
                ? navigate('/community/video/edit', { state: data.id })
                : navigate('/community/photo/edit', { state: data.id });
        }
    };

    const onPhotoLike = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            try {
                await axios.post(
                    `${BASEURL}/api/picture/${data.id}/like`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setFunc(
                    items.map((it) =>
                        it.id === data.id ? { ...it, myLike: true, likeCount: data.likeCount + 1 } : it,
                    ),
                );
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
                await axios.post(
                    `${BASEURL}/api/picture/${data.id}/like`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setFunc(
                    items.map((it) =>
                        it.id === data.id ? { ...it, myLike: false, likeCount: data.likeCount - 1 } : it,
                    ),
                );
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
                await axios.post(
                    `${BASEURL}/api/picture/${data.id}/scrap`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setFunc(
                    items.map((it) =>
                        it.id === data.id ? { ...it, myScrap: true, scrapCount: data.scrapCount + 1 } : it,
                    ),
                );
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
                await axios.post(
                    `${BASEURL}/api/picture/${data.id}/scrap`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setFunc(
                    items.map((it) =>
                        it.id === data.id ? { ...it, myScrap: false, scrapCount: data.scrapCount - 1 } : it,
                    ),
                );
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

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (dropdownListRef.current && !dropdownListRef.current.contains(e.target as Node)) {
                setModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownListRef]);

    return (
        <StyledFollowingFeeds>
            <Modal isOpen={openModal} ariaHideApp={false} style={customStyles}>
                <ReportModal setOpenModal={setOpenModal} reportId={String(data.id)} type={'photo'} />
            </Modal>

            <StyledFeedsBlock>
                <StyledBlockHeader>
                    <StyledHeaderItem>
                        <StyledAvatarBlock onClick={() => onGoUserPage(data.accountId)}>
                            <Avatar
                                width="100%"
                                paddingBottom="100%"
                                borderRadius="100%"
                                picUrl={data.accountProfileUrl}
                            />
                        </StyledAvatarBlock>
                        <div>
                            <StyledNickname onClick={() => onGoUserPage(data.accountId)}>
                                {data.accountNickName}
                            </StyledNickname>
                            <StyledTime> {data.createTime}</StyledTime>
                        </div>
                    </StyledHeaderItem>
                    <StyledHeaderItem2>
                        <BsThreeDots style={{ fontSize: 25, cursor: 'pointer' }} onClick={() => setModal(!modal)} />
                        {modal && (
                            <StyledOnClickBlock ref={dropdownListRef}>
                                {data.accountNickName === '__junhyuck' ? (
                                    <>
                                        <StyledClickText color="red" onClick={confirmDelete}>
                                            삭제하기
                                        </StyledClickText>
                                        <StyledClickText color="gray" onClick={onEdit}>
                                            수정하기
                                        </StyledClickText>
                                    </>
                                ) : (
                                    <StyledClickText color="gray" onClick={() => setOpenModal(!openModal)}>
                                        신고하기
                                    </StyledClickText>
                                )}
                            </StyledOnClickBlock>
                        )}
                    </StyledHeaderItem2>
                </StyledBlockHeader>
                <Slider item={data} ref={childRef} />
                <StyledBlockFooter>
                    {!data.myLike ? (
                        <StyledFooterItem
                            onClick={() => {
                                onPhotoLike();
                            }}
                        >
                            <StyledIcon src="/btnBlankHeart.png" />
                            <div>{data.likeCount}</div>
                        </StyledFooterItem>
                    ) : (
                        <StyledFooterItem
                            onClick={() => {
                                onPhotoUnLike();
                            }}
                        >
                            <StyledIcon src="/btnHeart.png" style={{ color: 'red' }} />
                            <div>{data.likeCount}</div>
                        </StyledFooterItem>
                    )}

                    <StyledFooterCenterItem
                        onClick={() => {
                            childRef.current.showAlert();
                        }}
                    >
                        <StyledIcon src="/btnComment.png" />
                        <div>{data.commentCount}</div>
                    </StyledFooterCenterItem>

                    {!data.myScrap ? (
                        <StyledFooterItem
                            onClick={() => {
                                onPhotoScrap();
                            }}
                        >
                            <StyledIcon src="/btnBlankBookmark.png" />
                            <div>{data.scrapCount}</div>
                        </StyledFooterItem>
                    ) : (
                        <StyledFooterItem
                            onClick={() => {
                                onPhotoUnScrap();
                            }}
                        >
                            <StyledIcon src="/btnBookmark.png" style={{ color: '#0d6637' }} />
                            <div>{data.scrapCount}</div>
                        </StyledFooterItem>
                    )}
                </StyledBlockFooter>
            </StyledFeedsBlock>
        </StyledFollowingFeeds>
    );
};

const StyledAvatarBlock = styled.div`
    width: 46px;
    height: 46px;
    cursor: pointer;
`;

const StyledOnClickBlock = styled.div`
    position: absolute;
    width: 80px;
    background-color: white;
    top: 60px;
    border: 1px solid silver;
    z-index: 10;
    cursor: pointer;
`;

const StyledFollowingFeeds = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledFeedsBlock = styled.div`
    width: 720px;
    height: 885px;
    margin-bottom: 40px;
    background-color: white;
    @media screen and (min-width: ${maxWidth}px) {
        width: 720px;
        height: 885px;
    }
`;

const StyledBlockHeader = styled.div`
    box-sizing: border-box;
    display: flex;
    padding: 16px 24px;
    height: 80px;
    @media screen and (min-width: ${maxWidth}px) {
        padding: 16px 24px;
        height: 80px;
    }
`;

const StyledHeaderItem = styled.div`
    display: flex;
    width: 80%;
    align-items: center;
`;

const StyledNickname = styled.div`
    margin: 0 0px 2px 14px;
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
    cursor: pointer;
`;

const StyledClickText = styled.div<{ color: string }>`
    color: ${(props) => props.color};
    font-size: 16px;
    font-weight: 400;
    padding: 10px 0px 10px 10px;
    :hover {
        background-color: silver;
        color: white;
    }
`;

const StyledTime = styled.div`
    color: lightgray;
    font-size: 12px;
    margin: 0 0px 2px 14px;
`;

const StyledHeaderItem2 = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const StyledBlockFooter = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    @media screen and (min-width: ${maxWidth}px) {
        height: 70px;
    }
`;

const StyledFooterItem = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 240px;
    height: 70px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-top: 1px solid #ececec;
    cursor: pointer;
`;
const StyledFooterCenterItem = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 240px;
    height: 70px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-top: 1px solid #ececec;
    border-right: 1px solid #ececec;
    border-left: 1px solid #ececec;
    cursor: pointer;
`;

const StyledIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
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

export default FollowingItem;
