import React, { useEffect, useRef, useState } from 'react';
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

const BASEURL = 'https://www.gardenersclub.co.kr/api';

const Slider: React.FC<ISlider> = (props) => {
    const { item } = props;
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
        const fetchData = async () => {
            setLoading(true);
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/picture/${item.id}/comment/view
                `,
                );
                setCommentsList(CommentData.data.value.content[0]);
                console.log(CommentData.data.value.content[0]);
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
                        <StyledBtnText>이전</StyledBtnText>
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
                        <StyledBtnText>다음</StyledBtnText>
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
                            <div style={{ height: 1000 }}>
                                <ItemList
                                    width="100%"
                                    imgHeight="100%"
                                    cols={1}
                                    horizontalGap={0}
                                    verticalGap={0}
                                    items={details?.pictureContentDtoList ? details?.pictureContentDtoList : data}
                                    RenderComponent={TaggedPhoto}
                                />
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
                            <Slide ImgUrl={item} index={index} />
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
    margin-top: 16px;
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
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: white;
    color: gray;
    margin-left: 525px;
    border-radius: 100%;
    position: absolute;
    z-index: 10;
    top: 35%;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
        background-color: gray;
        color: #fff;
    }
`;

const PrevButton = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: white;
    color: gray;
    margin-left: -25px;
    border-radius: 100%;
    border: none;
    position: absolute;
    z-index: 10;
    top: 35%;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
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

export default Slider;
