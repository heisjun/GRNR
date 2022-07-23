import styled from 'styled-components';

const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 60;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

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
        </StyledPopularContainer>
    );
};

const StyledTipTitleText = styled.text`
    font-size: 3vw;
    font-weight: bold;
    color: grey;
    margin-bottom: 1%;
    @media screen and (min-width: ${maxWidth}px) {
        font-size: ${maxWidth * 0.03}px;
    }
`;

const StyledTipWriterText = styled.text`
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
    width: 69%;
    height: 40vw;
    @media screen and (min-width: ${maxWidth}px) {
        height: ${maxWidth * 0.4}px;
    }
    margin-right: 2%;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
`;

const StyledDailyPlantBlock = styled.div`
    width: 29%;
    height: 40vw;
    @media screen and (min-width: ${maxWidth}px) {
        height: ${maxWidth * 0.4}px;
    }
    background-color: silber;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
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
