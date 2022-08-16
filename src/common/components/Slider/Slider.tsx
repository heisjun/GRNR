import React, { useEffect, useRef, useState } from 'react';
import Slide from './Slide/Slide';
import styled from 'styled-components';
import Indicator from './Indicator';
import { ISlider } from './Slider.type';

const Slider: React.FC<ISlider> = (props) => {
    const { imgdata, textdata } = props;
    const TOTAL_SLIDES = imgdata.length;
    const [currentSlide, setCurrentSlide] = useState(0);
    const Slidetransform = (currentSlide * 100) / TOTAL_SLIDES;
    const [hideBtn, setHideBtn] = useState(true);
    const slideRef = useRef(document.createElement('img'));
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
                <Indicator index={currentSlide} setIndex={setCurrentSlide} data={imgdata} />
            </StyledIndicator>
            <SliderContainer ref={slideRef} pageNum={TOTAL_SLIDES}>
                {textdata.map((items: any, index: number) => {
                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setHideBtn(false)}
                            onMouseLeave={() => setHideBtn(true)}
                            style={{ width: '100%' }}
                        >
                            <Slide ImgUrl={items} />
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
    top: 68%;
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
    margin-left: 415px;
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

export default Slider;
