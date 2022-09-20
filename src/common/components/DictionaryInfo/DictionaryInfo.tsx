import React from 'react';
import styled from 'styled-components';

const FigureData = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
const CategoryData = [{}, {}];

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const DictionaryInfo: React.FC = () => {
    return (
        <div>
            <StyledDicHeader>식물사전 {'>'} 몬스테라 테라로사</StyledDicHeader>
            <StyledInfoContainer>
                <StyledImgBlock />
                <StyledContentBlock>
                    <StyledEngName>Monstera deliciosa</StyledEngName>
                    <StyledFlexDiv>
                        <StyledKorName>몬스테라 테라로사</StyledKorName>
                        <StyledDifficulty> ★ ★ ★ ★ ★</StyledDifficulty>
                    </StyledFlexDiv>
                    {FigureData.map((item, index) => {
                        return <StyledFigure>뾰족한</StyledFigure>;
                    })}
                    <StyledFlexDiv>
                        <StyledIndex>출신</StyledIndex>
                        <StyledIndexContent>멕시코 남부 ,파나마, 중앙 아메리카</StyledIndexContent>
                    </StyledFlexDiv>
                    <StyledFlexDiv>
                        <StyledIndex>분류</StyledIndex>
                        {CategoryData.map((item, index) => {
                            return (
                                <StyledCategory>
                                    <div>과(Family)</div>
                                    <div>천남성과(Araceae)</div>
                                </StyledCategory>
                            );
                        })}
                    </StyledFlexDiv>

                    <StyledIndexContent>
                        몬스테라는 덩굴성 대형관엽식물로 6~8m 까지 자란다. 잎은 어긋나고 성숙한 것은 지름 1m 정도이다.
                        잎은 진녹색으로 크고 광택이 나며 잎맥 사이에 군데군데 타원형의 구멍이 파여 있어 폭우나 강한
                        바람에도 견딜 수 있는 구조로 발달 됐다. 흰색의 꽃이 피고 열매도 달린다.
                    </StyledIndexContent>
                </StyledContentBlock>
            </StyledInfoContainer>
        </div>
    );
};

const StyledIndex = styled.div`
    color: gray;
    padding-right: 20px;
    margin-top: 1vw;
`;

const StyledIndexContent = styled.div`
    color: gray;
    margin-top: 1vw;
    font-weight: 300;
`;

const StyledFigure = styled.div`
    background: lightgray;
    color: gray;
    margin-right: 2vw;
    margin-top: 0.5vw;
    padding: 5px 15px 5px 15px;
    font-size: 14px;
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 0.5vw;
`;

const StyledCategory = styled.div`
    background: lightgray;
    color: gray;
    margin-right: 1vw;
    margin-top: 0.5vw;
    padding: 5px 10px 5px 10px;
    font-size: 14px;
    font-weight: 200;
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 0.5vw;
`;

const StyledDifficulty = styled.div`
    display: flex;
    color: gray;
    font-size: 13px;
    margin-bottom: 0.5vw;
    align-items: center;
`;

const StyledFlexDiv = styled.div`
    display: flex;
`;

const StyledEngName = styled.div`
    font-size: 17px;
    font-style: italic;
    color: gray;
    margin-bottom: 0.5vw;
`;

const StyledKorName = styled.div`
    font-size: 25px;
    font-weight: 600;
    color: gray;
    margin-bottom: 0.5vw;
    margin-right: 1vw;
`;

const StyledImgBlock = styled.div`
    width: 35%;
    padding-bottom: 35%;
    background-color: gray;
    border-radius: 2px;
    @media screen and (max-width: ${boundaryWidth}px) {
        width: 60%;
        padding-bottom: 60%;
    }
`;

const StyledContentBlock = styled.div`
    width: 60%;
    @media screen and (max-width: ${boundaryWidth}px) {
        width: 100%;
    }
`;

const StyledInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: ${boundaryWidth}px) {
        display: flex;
        flex-direction: column;
    }
`;

const StyledDicHeader = styled.div`
    margin-bottom: 20px;
    color: gray;
    font-size: 15px;
    font-weight: 400;
`;

export default DictionaryInfo;
