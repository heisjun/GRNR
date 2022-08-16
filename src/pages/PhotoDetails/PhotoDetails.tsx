import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ItemList } from 'common/components';
import { TaggedPhoto } from 'domains';
import { getDebouncedFunc } from 'common/funcs';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const PhotoDetails: React.FC = () => {
    const [crntPosY, setCrntPosY] = useState<number>(0);
    const [nextPosY, setNextPosY] = useState<number>(0);

    const scrollHandler = () => {
        const posY = window.scrollY;
        setNextPosY(window.scrollY);
        setTimeout(() => setCrntPosY(posY), 500);
    };

    const debouncedScrollHandler = getDebouncedFunc(scrollHandler, 100);

    useEffect(() => {
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
        };
    }, []);

    const data = [{}, {}];

    return (
        <StyledPhotoDetailsContainer>
            <StyledDetailsBlock>
                <StyledTopTextBlock>
                    <StyledViewCountText>조회 312,231명</StyledViewCountText>
                    <StyledReportText>신고</StyledReportText>
                </StyledTopTextBlock>
                <ItemList
                    width="100%"
                    imgHeight="100%"
                    cols={1}
                    horizontalGap={0}
                    verticalGap={0}
                    items={data}
                    RenderComponent={TaggedPhoto}
                />
            </StyledDetailsBlock>
            <StyledButtonsContainer>
                <StyledButtonsBlock crntPosY={crntPosY} nextPosY={nextPosY}>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>12.3k</StyledButtonText>
                    </StyledButtonBlock>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>12</StyledButtonText>
                    </StyledButtonBlock>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>213</StyledButtonText>
                    </StyledButtonBlock>
                </StyledButtonsBlock>
            </StyledButtonsContainer>
        </StyledPhotoDetailsContainer>
    );
};

const ButtonsBarMove = (crntPosY: number, nextPosY: number) => keyframes`
    0% {
        transform: translateY(${crntPosY}px);
    }    
    100% {
        transform: translateY(${nextPosY}px);
    }
`;

const StyledButtonText = styled.div`
    font-size: 14px;
    color: grey;
    margin-top: 10px;
`;

const StyledButton = styled.div`
    width: 50%;
    padding-bottom: 50%;
    background-color: silver;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: grey;
    }
`;

const StyledButtonBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20%;
`;

const StyledViewCountText = styled.div`
    flex: 1;
    font-size: 18px;
    color: grey;
`;

const StyledReportText = styled.div`
    font-size: 15px;
    color: silver;
    cursor: pointer;
`;

const StyledTopTextBlock = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    margin-bottom: -15px;
`;

const StyledDetailsBlock = styled.div`
    width: 70%;
`;

const StyledButtonsBlock = styled.div<{ crntPosY: number; nextPosY: number }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: ${({ crntPosY }) => crntPosY}px;
    animation: ${({ crntPosY, nextPosY }) => ButtonsBarMove(crntPosY, nextPosY)} 0.5s;
    animation-fill-mode: forwards;
`;

const StyledButtonsContainer = styled.div`
    position: relative;
    width: 10%;
`;

const StyledPhotoDetailsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default PhotoDetails;
