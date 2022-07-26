import styled from 'styled-components';
import { PictureList, ArticleList } from 'common/components';

const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const picData = [{}, {}, {}, {}, {}, {}, {}, {}];
const artData = [{}, {}, {}];

const Popular: React.FC = () => {
    return (
        <StyledPopularContainer>
            <StyledLineContainer>
                <StyledTipBlock>
                    <StyledTipSummaryBlock>
                        <StyledTipTitleText>실내에서 식물을 끝장나게 키우는 방법</StyledTipTitleText>
                        <StyledTipWriterText>정태민</StyledTipWriterText>
                    </StyledTipSummaryBlock>
                </StyledTipBlock>
                <StyledDailyPlantBlock></StyledDailyPlantBlock>
            </StyledLineContainer>
            <StyledBorderLine />
            <StyledLineContainer>
                <StyledPictureBlock>
                    <PictureList width="100%" height="100%" cols={4} gap={1.4} items={picData} />
                </StyledPictureBlock>
            </StyledLineContainer>
            <StyledBorderLine />
            <StyledLineContainer>
                <StyledArticleBlock>
                    <ArticleList width="100%" picHeight="70%" cols={3} gap={1.4} items={artData} />
                </StyledArticleBlock>
            </StyledLineContainer>
            <StyledBorderLine />
        </StyledPopularContainer>
    );
};

const StyledArticleBlock = styled.div`
    width: 100%;
`;

const StyledPictureBlock = styled.div`
    width: 100%;
`;

const StyledTipTitleText = styled.div`
    font-size: 3vw;
    font-weight: bold;
    color: grey;
    margin-bottom: 1%;
    @media screen and (min-width: ${maxWidth}px) {
        font-size: ${maxWidth * 0.03}px;
    }
`;

const StyledTipWriterText = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: grey;
`;

const StyledTipSummaryBlock = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 5%;
    top: 70%;
`;

const StyledTipBlock = styled.div`
    position: relative;
    width: 75%;
    height: 40vw;
    @media screen and (max-width: ${boundaryWidth}px) {
        height: 44vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        height: ${maxWidth * 0.4}px;
    }
    margin-right: 1%;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
    cursor: pointer;
`;

const StyledDailyPlantBlock = styled.div`
    width: 24%;
    height: 40vw;
    @media screen and (max-width: ${boundaryWidth}px) {
        height: 44vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        height: ${maxWidth * 0.4}px;
    }
    background-color: silber;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
    cursor: pointer;
`;

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 30px 0px 20px 0px;
`;

const StyledLineContainer = styled.div`
    display: flex;
`;

const StyledPopularContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 5000px;
`;

export default Popular;
