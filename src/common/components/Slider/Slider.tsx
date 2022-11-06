import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Slide from './Slide/Slide';
import styled from 'styled-components';
import Indicator from './Indicator';
import { ISlider } from './Slider.type';
import Modal from 'react-modal';
import ItemList from '../ItemList';
import { default as callApi } from 'common/api';
import { ICommentsParams, IPhotoDetailsParams } from 'common/types';
import { TaggedPhoto } from 'domains';
import axios from 'axios';
import CommentItemModal from '../CommenntItemModal';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const Slider: React.FC<ISlider> = (props) => {
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

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.getDetailList(Number(item.id), 'picture');
                setDetails(response.data.value);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

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
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '60%', height: 600, backgroundColor: 'white' }}>
                        <div
                            style={{
                                height: '600',
                                overflow: 'auto',
                                maxHeight: 600,
                            }}
                        >
                            <div>
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
                                                <Avatar
                                                    width="100%"
                                                    paddingBottom="100%"
                                                    borderRadius="100%"
                                                    picUrl={details?.accountProfileUrl}
                                                />
                                            </StyeldAvatarBlock>
                                            <StyledWriterText>{details?.accountNickName}</StyledWriterText>
                                        </StyledWriterBlock>
                                    </StyledProfileBlock>
                                    <StyledFollowButtonBlock>
                                        <StyledFollowButton>
                                            <StyledFollowText
                                                onClick={() =>
                                                    onFollowing(details?.accountNickName ? details.accountNickName : '')
                                                }
                                            >
                                                팔로우 +
                                            </StyledFollowText>
                                        </StyledFollowButton>
                                    </StyledFollowButtonBlock>
                                </StyledUserInfoBlock>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '40%', backgroundColor: 'white' }}>
                        <div
                            style={{
                                height: '600',
                                overflow: 'auto',
                                maxHeight: 500,
                                padding: 5,
                            }}
                        >
                            <div
                                onClick={() => setIsOpenModal(false)}
                                style={{ display: 'flex', justifyContent: 'flex-end' }}
                            >
                                X
                            </div>
                            <CommentItemModal
                                commentsList={commentsList}
                                pictureId={String(item.id)}
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
                            <Slide data={item} index={index} />
                        </div>
                    );
                })}
            </SliderContainer>
        </Container>
    );
};

const Container = styled.div`
    height: 84.5%;
    background-color: white;
    margin: auto;
    overflow: hidden;
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
    margin-left: 500px;
    border-radius: 100%;
    position: absolute;
    z-index: 10;
    top: 35%;

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
    margin-left: 10px;
    border-radius: 100%;
    border: none;
    position: absolute;
    z-index: 10;
    top: 35%;
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '100px',
        width: '900px',
        height: '600px',
        padding: '0',
        overflow: 'hidden',
        borderRadius: '0px',
    },
};

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
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
`;

export default Slider;
