import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IDictionaryBanner } from './DictionaryBanner.type';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const DictionaryBanner: React.FC<IDictionaryBanner> = (props) => {
    const { data } = props;
    const slideRef = useRef(document.createElement('img'));
    const navigate = useNavigate();
    const [slidePage, setSlidePage] = useState<number>(0);
    const [slideIdx, setSlideIdx] = useState<number>(0);
    const Slidetransform = slidePage / 11.4;

    const leftButton = () => {
        if (slidePage > 0) {
            setSlidePage((prev) => prev - 1140);
            setSlideIdx((prev) => prev - 1);
        }
    };

    const rightButton = () => {
        if (3 * 1140 > slidePage) {
            setSlidePage((prev) => prev + 1140);
            setSlideIdx((prev) => prev + 1);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${Slidetransform}%)`;
    }, [slideIdx]);

    function truncate(text: string) {
        const replaced = text.replace(/\n/g, ' ');
        if (replaced.length <= 180) {
            return replaced;
        }
        return replaced.slice(0, 180).concat('...');
    }

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <StyledSlideButtonBox>
                <StyledArrowStyle onClick={leftButton}>
                    <MdArrowBackIosNew style={{ color: '#9b9b9b', fontWeight: 100 }} />
                </StyledArrowStyle>
                <img src="/slash.png" />
                <StyledArrowStyle onClick={rightButton}>
                    <MdArrowForwardIos style={{ color: '#9b9b9b', fontWeight: 100 }} />
                </StyledArrowStyle>
            </StyledSlideButtonBox>
            <StyleBannerBoxStyle ref={slideRef}>
                {data.slice(0, 4).map((item, idx) => (
                    <StyledMainBannerContainer key={idx} slidePage={slidePage}>
                        <StyledImageContainer onClick={() => navigate(`./details/${item.plantDicId}`)}>
                            <img src={item.plantPicUrl} alt="" />
                        </StyledImageContainer>
                        <StyledContentContainer onClick={() => navigate(`./details/${item.plantDicId}`)}>
                            <StyledTextStyle>Editors's Pick</StyledTextStyle>
                            <StyledEnglishName>{item.scientificName}</StyledEnglishName>
                            <StyledKoreanName>{item.plantName}</StyledKoreanName>
                            <StyledContentBox>{truncate(item.description_detail)}</StyledContentBox>
                            <StyledKeywordContainer>
                                {item.classification_flower !== 'null' && (
                                    <StyledKeywordBox>{item.classification_flower}</StyledKeywordBox>
                                )}
                                {item.classification_fruit !== 'null' && (
                                    <StyledKeywordBox>{item.classification_fruit}</StyledKeywordBox>
                                )}
                                {item.classification_leaf !== 'null' && (
                                    <StyledKeywordBox>{item.classification_leaf}</StyledKeywordBox>
                                )}
                                {item.classification_succulent !== 'null' && (
                                    <StyledKeywordBox>{item.classification_succulent}</StyledKeywordBox>
                                )}
                                {item.toxicityHarmless !== 'null' && (
                                    <StyledKeywordBox>{item.toxicityHarmless}</StyledKeywordBox>
                                )}
                                {item.toxicitySeriousness !== 'null' && (
                                    <StyledKeywordBox>{item.toxicitySeriousness}</StyledKeywordBox>
                                )}
                                {item.toxicitySlight !== 'null' && (
                                    <StyledKeywordBox>{item.toxicitySlight}</StyledKeywordBox>
                                )}
                                {item.toxicityIngestion !== 'null' && (
                                    <StyledKeywordBox>{item.toxicityIngestion}</StyledKeywordBox>
                                )}
                                {item.toxicitySkin !== 'null' && (
                                    <StyledKeywordBox>{item.toxicitySkin}</StyledKeywordBox>
                                )}
                                {item.cat !== 'null' && <StyledKeywordBox>{item.cat}</StyledKeywordBox>}
                                {item.dog !== 'null' && <StyledKeywordBox>{item.dog}</StyledKeywordBox>}
                                {item.classification_succulent !== 'null' && (
                                    <StyledKeywordBox>{item.classification_succulent}</StyledKeywordBox>
                                )}
                                {item.difficulty !== 'null' && <StyledKeywordBox>{item.difficulty}</StyledKeywordBox>}
                                {item.difficulty !== 'null' && <StyledKeywordBox>{item.difficulty}</StyledKeywordBox>}
                                {item.growSpeed !== 'null' && <StyledKeywordBox>{item.growSpeed}</StyledKeywordBox>}
                            </StyledKeywordContainer>
                        </StyledContentContainer>
                    </StyledMainBannerContainer>
                ))}
            </StyleBannerBoxStyle>
            <StyledDotBox>
                {data.slice(0, 4).map((_, idx) => (
                    <StyledDot
                        key={idx}
                        slideIdx={slideIdx}
                        idx={idx}
                        onClick={() => {
                            setSlideIdx(idx);
                            setSlidePage(idx * 1140);
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
    margin: 40px 0 30px 0;
`;

const StyledMainBannerContainer = styled.div<IStyled>`
    position: relative;
    display: flex;
    height: 480px;
    background-color: #f8f8f8;
`;

const StyledImageContainer = styled.div`
    position: relative;
    cursor: pointer;
    width: 763px;
    height: 100%;
    img {
        width: 763px;
        height: 100%;
        object-fit: cover;
    }
`;

const StyledSlideButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 70px;
    padding: 11px 16px;
    width: 91px;
    height: 38px;
    background-color: white;
    z-index: 100;
    img {
        transform: rotate(-30deg);
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

const StyledContentContainer = styled.div`
    box-sizing: border-box;
    padding: 28px 41px 0 17px;
    width: 377px;
    cursor: pointer;
`;

const StyledTextStyle = styled.h3`
    margin: 0 196px 40px 0;
    width: 100%;
    height: 29px;
    font-size: 20px;
    font-weight: bold;
    line-height: 150%;
    color: #0d6637;
`;

const StyledEnglishName = styled.h4`
    width: 319px;
    margin: 40px 158px 11px 0;
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: 500;
    line-height: 150%;
    color: #8c8c8c;
`;

const StyledKoreanName = styled.h2`
    width: 319px;
    margin: 11px 106px 16px 0;
    font-family: NotoSansKR;
    font-size: 28px;
    font-weight: bold;
    line-height: 150%;
    color: #272727;
`;

const StyledContentBox = styled.p`
    /*  width: 319px;
    height: 156px; */
    margin: 16px 0 30px;
    font-family: NotoSansKR;
    font-size: 15px;
    line-height: 150%;
    color: #424242;
`;

const StyledDotBox = styled.div`
    display: flex;
    overflow: hidden;
`;

const StyledDot = styled.div<IStyled>`
    min-width: ${({ slideIdx, idx }) => (slideIdx === idx ? '25px' : '10px')};
    height: 10px;
    margin: 30px 10px 0 0;
    border-radius: 5px;
    background-color: ${({ slideIdx, idx }) => (slideIdx === idx ? '#0d6637' : '#d8d8d8')};
    cursor: pointer;
`;

const StyledLine = styled.div`
    width: 1140px;
    height: 1px;
    margin: 40px 0px;
    background-color: #ececec;
`;

const StyledKeywordContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StyledKeywordBox = styled.div`
    margin: 0 9px 8px 0;
    padding: 6px 12px;
    border-radius: 16px;
    border: solid 1px #dedede;
    background-color: #fff;
    font-size: 14px;
`;

export default DictionaryBanner;
