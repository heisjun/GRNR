import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ItemList } from 'common/components';
import { TaggedPhoto } from 'domains';
import { getDebouncedFunc } from 'common/funcs';

const PhotoDetails: React.FC = () => {
    const sideBarRef = useRef<any>(null);

    const scrollHandler = () => {
        sideBarRef.current.style.transition = 'all 0.5s ease-in-out';
        sideBarRef.current.style.transform = `translateY(${window.scrollY}px)`;
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
                <StyledButtonsBlock ref={sideBarRef}>
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

const StyledButtonsBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
