import React, { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Slide from './Slide/Slide';
import styled from 'styled-components';
import Indicator from './Indicator';
import { ISlider } from './Slider.type';
import Modal from 'react-modal';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import PhotoItemModal from '../PhotoItemModal';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

export const Slider = forwardRef((props: ISlider, ref: any) => {
    const { item } = props;

    const TOTAL_SLIDES = item.pictureContentDtoList.length;
    const [currentSlide, setCurrentSlide] = useState(0);
    const Slidetransform = (currentSlide * 100) / TOTAL_SLIDES;
    const [hideBtn, setHideBtn] = useState(true);
    const slideRef = useRef(document.createElement('img'));
    const [isOpenModal, setIsOpenModal] = useState(false);
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
                <Indicator index={currentSlide} setIndex={setCurrentSlide} data={item.pictureContentDtoList} />
            </StyledIndicator>

            <Modal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
                <div ref={dropdownListRef}>
                    <PhotoItemModal setIsOpenModal={setIsOpenModal} pictureId={item.pictureId} ref={dropdownListRef} />
                </div>
            </Modal>

            <SliderContainer ref={slideRef} pageNum={TOTAL_SLIDES} onClick={() => setIsOpenModal(true)}>
                {item.pictureContentDtoList.map((items: any, index: number) => {
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

export default Slider;
