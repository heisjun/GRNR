import styled from 'styled-components';
import DailyPlant from '../DailyPlant';

const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const DailyInfo: React.FC = () => {
    return (
        <StyledDailyInfoContainer>
            <StyledTipBlock>
                <StyledTipSummaryBlock>
                    <StyledTipTitleText>실내에서 식물을 끝장나게 키우는 방법</StyledTipTitleText>
                    <StyledTipWriterText>taemin</StyledTipWriterText>
                </StyledTipSummaryBlock>
            </StyledTipBlock>
            <StyledDailyPlantBlock>
                <DailyPlant width="100%" height="100%" borderRadius="5px" imgUrls={['', '', '']} />
            </StyledDailyPlantBlock>
        </StyledDailyInfoContainer>
    );
};

const StyledTipTitleText = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: grey;
    margin-bottom: 1%;
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
    width: 74%;
    padding-bottom: 40%;
    margin-right: 1.5%;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
    cursor: pointer;
`;

const StyledDailyPlantBlock = styled.div`
    width: 23.5%;
    height: 99%;
`;

const StyledDailyInfoContainer = styled.div`
    display: flex;
    width: 100%;
`;

export default DailyInfo;
