import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IDictionaryInfo } from './DictionaryInfo.type';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import DOMPurify from 'dompurify';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const DictionaryInfo: React.FC<IDictionaryInfo> = (props) => {
    const { data } = props;
    const slideRef = useRef(document.createElement('img'));
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
        if ((data?.plantContentFeedDtoList.length ? data.plantContentFeedDtoList.length - 1 : 0) > slideIdx) {
            setSlidePage((prev) => prev + 1140);
            setSlideIdx((prev) => prev + 1);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${Slidetransform}%)`;
    }, [slideIdx]);

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <StyledSlideButtonBox>
                <StyledArrowStyle onClick={leftButton}>
                    <img src="/prev.png" />
                </StyledArrowStyle>
                <StyledSlashImg src="/slash.png" />
                <StyledArrowStyle onClick={rightButton}>
                    <img src="/next.png" />
                </StyledArrowStyle>
            </StyledSlideButtonBox>
            <StyleBannerBoxStyle ref={slideRef}>
                {data?.plantContentFeedDtoList.map((item, idx) => (
                    <StyledMainBannerContainer key={idx} slidePage={slidePage}>
                        <StyledImageContainer>
                            <img src={item.plantPicUrl} alt="" />
                        </StyledImageContainer>
                    </StyledMainBannerContainer>
                ))}
            </StyleBannerBoxStyle>
            <StyledDotBox>
                {data?.plantContentFeedDtoList.map((_, idx) => (
                    <StyledDot
                        key={idx}
                        slideIdx={slideIdx}
                        idx={idx}
                        onClick={() => {
                            setSlideIdx(idx);
                            setSlidePage(idx * 1140);
                        }}
                    ></StyledDot>
                ))}
            </StyledDotBox>
            <StyledInfoContainer>
                <StyledInfoBlock>
                    <StyledEngName>{data?.scientificName}</StyledEngName>
                    <StyledKorName>{data?.plantName}</StyledKorName>
                    <StyledFigure
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description_detail ?? '') }}
                    />
                </StyledInfoBlock>
                <StyledInfoBlock>
                    <StyledIndex>출신</StyledIndex>
                    <StyledIndexContent>{data?.distribution}</StyledIndexContent>
                    <StyledIndex>분류</StyledIndex>
                    <StyledFlexDiv>
                        <StyledCategory>
                            <StyledFamily>군/강(Clade/Class)</StyledFamily>
                            <StyledFamilyDetail>
                                {data?.korClass}({data?.enClass})
                            </StyledFamilyDetail>
                        </StyledCategory>
                        <StyledArrow src={'/btnArrow.png'} />
                        <StyledCategory>
                            <StyledFamily>목(Order)</StyledFamily>
                            <StyledFamilyDetail>
                                {data?.korOrder}({data?.enOrder})
                            </StyledFamilyDetail>
                        </StyledCategory>
                        <StyledArrow src={'/btnArrow.png'} />
                        <StyledCategory>
                            <StyledFamily>과(Family)</StyledFamily>
                            <StyledFamilyDetail>
                                {data?.korFamily}({data?.enFamily})
                            </StyledFamilyDetail>
                        </StyledCategory>
                    </StyledFlexDiv>
                    <StyledIndex>키워드</StyledIndex>
                    <StyledKeywordDiv>
                        {data?.classification !== 'null' && <StyledKeywordBox>{data?.classification}</StyledKeywordBox>}
                        {data?.classification_flower !== 'null' && (
                            <StyledKeywordBox>{data?.classification_flower}</StyledKeywordBox>
                        )}
                        {data?.classification_fruit !== 'null' && (
                            <StyledKeywordBox>{data?.classification_fruit}</StyledKeywordBox>
                        )}
                        {data?.classification_leaf !== 'null' && (
                            <StyledKeywordBox>{data?.classification_leaf}</StyledKeywordBox>
                        )}
                        {data?.classification_succulent !== 'null' && (
                            <StyledKeywordBox>{data?.classification_succulent}</StyledKeywordBox>
                        )}
                        {data?.toxicityHarmless !== 'null' && (
                            <StyledKeywordBox>{data?.toxicityHarmless}</StyledKeywordBox>
                        )}
                        {data?.toxicitySeriousness !== 'null' && (
                            <StyledKeywordBox>{data?.toxicitySeriousness}</StyledKeywordBox>
                        )}
                        {data?.toxicitySlight !== 'null' && <StyledKeywordBox>{data?.toxicitySlight}</StyledKeywordBox>}
                        {data?.toxicityIngestion !== 'null' && (
                            <StyledKeywordBox>{data?.toxicityIngestion}</StyledKeywordBox>
                        )}
                        {data?.toxicitySkin !== 'null' && <StyledKeywordBox>{data?.toxicitySkin}</StyledKeywordBox>}
                        {data?.cat !== 'null' && <StyledKeywordBox>{data?.cat}</StyledKeywordBox>}
                        {data?.dog !== 'null' && <StyledKeywordBox>{data?.dog}</StyledKeywordBox>}
                        {data?.classification_succulent !== 'null' && (
                            <StyledKeywordBox>{data?.classification_succulent}</StyledKeywordBox>
                        )}
                        {data?.difficulty !== 'null' && <StyledKeywordBox>{data?.difficulty}</StyledKeywordBox>}
                        {data?.growSpeed !== 'null' && <StyledKeywordBox>{data?.growSpeed}</StyledKeywordBox>}
                    </StyledKeywordDiv>
                </StyledInfoBlock>
            </StyledInfoContainer>
        </div>
    );
};

const StyledKeywordBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 7px 0px 7px;
    height: 37px;
    margin: 11px 8px 0 0;
    border-radius: 19px;
    border: solid 1px #dedede;
    background-color: #fff;
    font-family: NotoSansKR;
    font-size: 14px;
    color: #616161;
`;

const StyledInfoBlock = styled.div`
    width: 50%;
`;

const StyledIndex = styled.div`
    font-family: NotoSansKR;
    font-size: 15px;
    font-weight: bold;
    color: #272727;
`;

const StyledIndexContent = styled.div`
    margin: 8px 0 26px;
    font-family: NotoSansKR;
    font-size: 16px;
    color: #272727;
`;

const StyledFigure = styled.div`
    padding-right: 50px;
    margin: 22px 0px 49px 0;
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    color: #2e2e2e;
`;

const StyledCategory = styled.div`
    width: 160px;
    height: 66px;
    margin: 10px 4px 0 0;
    padding: 11px 22px 10px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.02);
    background-color: #fff;
`;

const StyledFamily = styled.div`
    margin-bottom: 6px;
    text-align: center;
    font-family: NotoSansKR;
    font-size: 13px;
    font-weight: 500;
    color: #989898;
`;

const StyledFamilyDetail = styled.div`
    margin: 6px 0 0;
    font-family: NotoSansKR;
    font-size: 14px;
    text-align: center;
    color: #272727;
`;

const StyledArrow = styled.img`
    width: 12px;
    height: 12px;
    object-fit: cover;
`;

const StyledFlexDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 26px;
`;

const StyledKeywordDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StyledEngName = styled.div`
    margin: 0 0px 6px 0;
    font-family: 'BodoniXt';
    font-size: 18px;
    font-weight: 500;
    color: #8c8c8c;
`;

const StyledKorName = styled.div`
    margin: 6px 0px 1px 0;
    font-family: NotoSansKR;
    font-size: 32px;
    font-weight: bold;
    color: #272727;
`;

const StyledInfoContainer = styled.div`
    display: flex;
    width: 1140px;
    min-height: 350px;
    box-sizing: border-box;
    padding: 40px 23px 36px 30px;
    background-color: #f8f8f8;
`;

interface IStyled {
    slidePage?: number;
    slideIdx?: number;
    idx?: number;
}

const StyleBannerBoxStyle = styled.div`
    width: 1140px;
    display: flex;
    margin: 40px 0px 0px 0px;
`;

const StyledMainBannerContainer = styled.div<IStyled>`
    position: relative;
    display: flex;
    height: 480px;
    background-color: #f8f8f8;
`;

const StyledImageContainer = styled.div`
    position: relative;
    width: 1140px;
    height: 100%;
    img {
        width: 1140px;
        height: 100%;
        object-fit: cover;
    }
`;

const StyledSlideButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 460px;
    background-color: white;
    padding: 11px 16px;
    width: 91px;
    height: 38px;
    z-index: 100;
`;

const StyledSlashImg = styled.img`
    transform: rotate(-30deg);
    height: 80%;
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
    img {
        width: 17px;
    }
`;

const StyledDot = styled.div<IStyled>`
    min-width: ${({ slideIdx, idx }) => (slideIdx === idx ? '25px' : '10px')};
    height: 10px;
    margin: 30px 10px 0 0;
    border-radius: 5px;
    background-color: ${({ slideIdx, idx }) => (slideIdx === idx ? '#0d6637' : '#d8d8d8')};
    cursor: pointer;
`;

const StyledDotBox = styled.div`
    margin-bottom: 40px;
    display: flex;
    overflow: hidden;
`;
export default DictionaryInfo;
