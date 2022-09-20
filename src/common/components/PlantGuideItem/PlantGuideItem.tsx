import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IPlantGuideItem } from './PlantGuideItem.type';
import GuideIndicator from './GuideIndicator';
import GuideSlide from './GuideSlide';

const PlantGuideItem: React.FC<IPlantGuideItem> = (props) => {
    const { data } = props;
    const TOTAL_SLIDES = data.picUrl.length;
    const [currentSlide, setCurrentSlide] = useState(0);
    const Slidetransform = (currentSlide * 100) / TOTAL_SLIDES;
    const slideRef = useRef(document.createElement('img'));

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${Slidetransform}%)`;
    }, [currentSlide]);

    return (
        <Container>
            <StyledIndicator>
                <GuideIndicator index={currentSlide} setIndex={setCurrentSlide} data={data.korIndex} />
            </StyledIndicator>
            <StyledBorderLine />

            <SliderContainer ref={slideRef} pageNum={TOTAL_SLIDES}>
                {data.text.map((items: any, index: number) => {
                    return (
                        <div key={index} style={{ width: '100%' }}>
                            <GuideSlide ImgUrl={items} />
                        </div>
                    );
                })}
            </SliderContainer>
        </Container>
    );
};

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 20px 0px 30px 0px;
`;

const Container = styled.div`
    background-color: white;
    margin: auto;
    overflow: hidden;
`;

const StyledIndicator = styled.div``;

const SliderContainer = styled.div<{ pageNum: number }>`
    width: ${({ pageNum }) => pageNum * 100}%;
    display: flex;
`;

export default PlantGuideItem;
