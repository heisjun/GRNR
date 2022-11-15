import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

const data = [{}, {}, {}];

const TodaysArticle = () => {
    const slideRef = useRef(document.createElement('img'));
    const [slidePage, setSlidePage] = useState<number>(0);
    const [slideIdx, setSlideIdx] = useState<number>(0);
    const Slidetransform = slidePage / 11.5;

    const leftButton = () => {
        if (slidePage > 0) {
            setSlidePage((prev) => prev - 660);
            setSlideIdx((prev) => prev - 1);
        }
    };

    const rightButton = () => {
        if (2 > slideIdx) {
            setSlidePage((prev) => prev + 660);
            setSlideIdx((prev) => prev + 1);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${Slidetransform}%)`;
    }, [slideIdx]);
    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex' }}>
                <StyledTitle>
                    식물이 주는 <br />
                    영감을 통해 작업합니다.
                </StyledTitle>
                <StyledContent>
                    Amun-Ra was the local god of Karnak (Luxor) and during the New Kingdom, when the princes of Thebes
                    ruled Egypt, he became the preeminent state god, with a temple that reflected his status. At the
                    height of its power, the temple owned 421,000 head of cattle…
                </StyledContent>
            </div>
            <StyledSlideButtonBox>
                <StyledArrowStyle onClick={leftButton}>
                    <MdArrowBackIosNew style={{ color: '#9b9b9b', fontWeight: 100 }} />
                </StyledArrowStyle>
                <em>/</em>
                <StyledArrowStyle onClick={rightButton}>
                    <MdArrowForwardIos style={{ color: '#9b9b9b', fontWeight: 100 }} />
                </StyledArrowStyle>
            </StyledSlideButtonBox>
            <StyleBannerBoxStyle ref={slideRef}>
                {data.map((item, idx) => (
                    <StyledMainBannerContainer key={idx}>
                        <StyledImageContainer>
                            <img src={'/sample.jpeg'} alt="" />
                        </StyledImageContainer>
                    </StyledMainBannerContainer>
                ))}
            </StyleBannerBoxStyle>
            <StyledDotBox>
                {data.map((_, idx) => (
                    <StyledDot
                        key={idx}
                        slideIdx={slideIdx}
                        idx={idx}
                        onClick={() => {
                            setSlideIdx(idx);
                            setSlidePage(idx * 660);
                        }}
                    >
                        <span></span>
                    </StyledDot>
                ))}
            </StyledDotBox>
        </div>
    );
};

interface IStyled {
    slidePage?: number;
    slideIdx?: number;
    idx?: number;
}

const StyleBannerBoxStyle = styled.div`
    width: 1140px;
    display: flex;
    margin: 40px 0 10px 0;
`;

const StyledMainBannerContainer = styled.div<IStyled>`
    position: relative;
    display: flex;
    height: 420px;
`;

const StyledImageContainer = styled.div`
    position: relative;
    width: 660px;
    height: 100%;
    img {
        width: 640px;
        height: 100%;
        object-fit: cover;
    }
`;

const StyledSlideButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 558px;
    padding: 11px 16px;
    width: 91px;
    height: 38px;
    background-color: white;
    z-index: 100;
    em {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 45px;
        font-weight: 100;
        padding-right: 10px;
        color: #d8d8d8;
        transform: rotate(-18deg);
        line-height: 150%;
    }
`;

const StyledArrowStyle = styled.span`
    font-size: 30px;
    color: #4a4a4a;
    line-height: 150%;
    padding-top: 5px;
    cursor: pointer;
    :hover {
        color: #9b9b9b;
    }
`;

const StyledDot = styled.div<IStyled>`
    min-width: ${({ slideIdx, idx }) => (slideIdx === idx ? '25px' : '10px')};
    height: 10px;
    margin: 30px 10px 0 0;
    border-radius: 5px;
    background-color: ${({ slideIdx, idx }) => (slideIdx === idx ? '#0d6637' : '#d8d8d8')};
`;

const StyledDotBox = styled.div`
    margin-bottom: 40px;
    display: flex;
    overflow: hidden;
`;

const StyledTitle = styled.div`
    height: 106px;
    margin: 20px 8px 31px 0px;
    font-family: AppleSDGothicNeo;
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #1e1e1e;
`;

const StyledContent = styled.div`
    width: 356px;
    height: 100px;
    margin: 20px 65px 38px 70px;
    font-family: NotoSansKR;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.54;
    letter-spacing: normal;
    color: #4a4a4a;
`;
export default TodaysArticle;
