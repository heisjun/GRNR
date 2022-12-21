import React, { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Slide from './Slide/Slide';
import styled from 'styled-components';
import Indicator from './Indicator';
import { ISlider } from './Slider.type';
import Modal from 'react-modal';
import ItemList from '../ItemList';
import { ICommentsParams, IPhotoDetailsParams, ItestComments } from 'common/types';
import { TaggedPhoto } from 'domains';
import axios from 'axios';
import CommentItemModal from '../CommenntItemModal';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');
export const Slider = forwardRef((props: ISlider, ref: any) => {
    const { item } = props;

    const navigate = useNavigate();
    const TOTAL_SLIDES = item.pictureUrlList.length;
    const [currentSlide, setCurrentSlide] = useState(0);
    const Slidetransform = (currentSlide * 100) / TOTAL_SLIDES;
    const [hideBtn, setHideBtn] = useState(true);
    const slideRef = useRef(document.createElement('img'));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<IPhotoDetailsParams>();
    const [commentsList, setCommentsList] = useState<ICommentsParams>();
    const [comment, setComment] = useState<ItestComments[]>([]);
    const dropdownListRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        showAlert() {
            setIsOpenModal(true);
        },
    }));

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (dropdownListRef.current && !dropdownListRef.current.contains(e.target as Node)) {
                setIsOpenModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownListRef]);

    const NextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };
    const PrevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const fetchData = useCallback(async () => {
        if (!TOKEN) {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${item.id}/comment/view
                `,
                );
                setCommentsList(CommentData.data.value.content[0]);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${item.id}/comment/view
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
                    `${BASEURL}/api/picture/${item.id}/comment/view
                `,
                );
                setComment(CommentData.data.value.content[0].commentDtoList);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${item.id}/comment/view
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

    useEffect(() => {
        fetchData();
        fetchData2();
    }, [fetchData, fetchData2]);

    useEffect(() => {
        const fetchData3 = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${BASEURL}/api/picture/${item.id}/detail
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
            setLoading(false);
        };
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
        sessionStorage.setItem('userId', String(details?.accountId));
        {
            details?.accountId === Number(sessionStorage.getItem('accountId'))
                ? navigate('/mypage')
                : navigate(`/userpage/${details?.accountId}`);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${Slidetransform}%)`;
    }, [currentSlide]);

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
        <Container>
            {!hideBtn ? (
                currentSlide === 0 ? null : (
                    <PrevButton
                        onClick={PrevSlide}
                        onMouseEnter={() => setHideBtn(false)}
                        onMouseLeave={() => setHideBtn(true)}
                    >
                        <StyledBtnText>
                            <MdArrowBackIosNew style={{ fontSize: 18, fontWeight: 300 }} />
                        </StyledBtnText>
                    </PrevButton>
                )
            ) : null}
            {!hideBtn ? (
                currentSlide === TOTAL_SLIDES - 1 ? null : (
                    <NextButton
                        onClick={NextSlide}
                        onMouseEnter={() => setHideBtn(false)}
                        onMouseLeave={() => setHideBtn(true)}
                    >
                        <StyledBtnText>
                            <MdArrowForwardIos style={{ fontSize: 18, fontWeight: 300 }} />
                        </StyledBtnText>
                    </NextButton>
                )
            ) : null}

            <StyledIndicator>
                <Indicator index={currentSlide} setIndex={setCurrentSlide} data={item.pictureUrlList} />
            </StyledIndicator>

            <Modal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
                <div style={{ display: 'flex' }} ref={dropdownListRef}>
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
                                    <StyledProfileBlock>
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
                                                <StyledWriterText>{details?.accountNickName}</StyledWriterText>
                                                <StyledWriterintro>취향을 담은 가드너스클럽장</StyledWriterintro>
                                            </div>
                                        </StyledWriterBlock>
                                    </StyledProfileBlock>
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
                                pictureId={String(item.id)}
                                testComments={comment}
                                setTestComments={setComment}
                                category="picture"
                            />
                        </div>
                    </div>
                </div>
            </Modal>

            <SliderContainer ref={slideRef} pageNum={TOTAL_SLIDES} onClick={() => setIsOpenModal(true)}>
                {item.pictureUrlList.map((items: any, index: number) => {
                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setHideBtn(false)}
                            onMouseLeave={() => setHideBtn(true)}
                            style={{ width: '100%' }}
                        >
                            <Slide data={item} index={index} viewCount={details?.viewCount} />
                        </div>
                    );
                })}
            </SliderContainer>
        </Container>
    );
});

const Container = styled.div`
    height: 735px;
    background-color: white;
    margin: auto;
    overflow: hidden;
    @media screen and (min-width: ${maxWidth}px) {
        height: 735px;
    }
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

const StyledBtnText = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 11px;
`;

const StyledIndicator = styled.div`
    position: absolute;
    width: 20%;
    height: 20px;
    top: 70%;
    left: 40%;
    right: 40%;
    z-index: 10;
`;
const NextButton = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    opacity: 0.9;
    box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    margin-left: 656px;
    border-radius: 100%;
    position: absolute;
    z-index: 10;
    top: 40%;

    cursor: pointer;
    &:hover {
        background-color: gray;
        color: #fff;
    }
`;

const PrevButton = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    opacity: 0.9;
    box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    margin-left: 24px;
    border-radius: 100%;
    border: none;
    position: absolute;
    z-index: 10;
    top: 40%;
    cursor: pointer;
    &:hover {
        background-color: gray;
        color: #fff;
    }
`;

const SliderContainer = styled.div<{ pageNum: number }>`
    margin-bottom: 20px;
    width: ${({ pageNum }) => pageNum * 100}%;
    display: flex;
`;

const customStyles = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '100px',
        width: '1140px',
        height: '750px',
        padding: '0',
        overflow: 'hidden',
        borderRadius: '0px',
    },
};

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

const StyledProfileBlock = styled.div`
    flex: 1;
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

export default Slider;
