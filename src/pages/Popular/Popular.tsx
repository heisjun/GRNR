import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ItemList, TodaysPhoto, TodaysArticle } from 'common/components';
import { DailyInfo } from 'domains';
import { FadeIn, FadeOut } from 'common/keyframes';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const Popular: React.FC = () => {
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [photoGap, setPhotoGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
    const [photoVerticalGap, setPhotoVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 20 : 4);

    const [pageAnim, setPageAnim] = useState<any>(FadeIn);

    const picData = [{}, {}, {}, {}, {}, {}, {}, {}];

    const resizeHandler = () => {
        setPhotoCols(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
        setPhotoGap(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
        setPhotoVerticalGap(window.innerWidth > Number(boundaryWidth) ? 20 : 4);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledPopularContainer pageAnim={pageAnim}>
            <DailyInfo />
            <StyledBorderPlace />
            <StyledBottomContainer>
                <StyledDetailsBlock>
                    <StyledTitleText>인기 사진</StyledTitleText>
                    <StyledMoreText>
                        더보기 <StyledArrowIcon src="/btnArrowGray.png" />
                    </StyledMoreText>
                </StyledDetailsBlock>
                <ItemList
                    width="100%"
                    imgHeight="100%"
                    cols={photoCols}
                    horizontalGap={photoGap}
                    verticalGap={photoVerticalGap}
                    items={picData}
                    RenderComponent={TodaysPhoto}
                />
                <StyledBorderLine />
                <StyledDetailsBlock>
                    <StyledTitleText>인기 아티클</StyledTitleText>
                    <StyledMoreText>
                        더보기 <StyledArrowIcon src="/btnArrowGray.png" />
                    </StyledMoreText>
                </StyledDetailsBlock>
                <TodaysArticle />
                <StyledBorderLine />
                <StyledDetailsBlock>
                    <StyledTitleText>Q&A</StyledTitleText>
                    <StyledMoreText>
                        더보기 <StyledArrowIcon src="/btnArrowGray.png" />
                    </StyledMoreText>
                </StyledDetailsBlock>
            </StyledBottomContainer>
        </StyledPopularContainer>
    );
};

const StyledArrowIcon = styled.img`
    width: 14px;
    height: 14px;
    margin: 2px 0 2px 4px;
    object-fit: contain;
`;
const StyledTitleText = styled.div`
    font-size: 26px;
    font-weight: bold;
    color: #272727;
    flex: 1;
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 26px;
    }
`;

const StyledMoreText = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    color: #a6a6a6;
    cursor: pointer;
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 14px;
    }
`;

const StyledDetailsBlock = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const StyledBorderLine = styled.div`
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 30px 0px 30px 0px;
`;

const StyledBorderPlace = styled.div`
    margin: 30px 0px 30px 0px;
`;

const StyledPopularContainer = styled.div<{ pageAnim: any }>`
    display: flex;
    flex-direction: column;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-top: -10px;
    }
`;

const StyledBottomContainer = styled.div`
    @media screen and (max-width: ${maxWidth}px) {
        padding-left: 20%;
        padding-right: 20%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        margin-left: 390px;
        margin-right: 390px;
    }
`;
export default Popular;
