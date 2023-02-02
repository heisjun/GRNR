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
import PhotoItemModal from '../PhotoItemModal';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

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

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${Slidetransform}%)`;
    }, [currentSlide]);

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
                <div ref={dropdownListRef}>
                    <PhotoItemModal setIsOpenModal={setIsOpenModal} pictureId={item.id} ref={dropdownListRef} />
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
