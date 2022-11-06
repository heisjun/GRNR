import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ItemList, TodaysPhoto, TodaysArticle } from 'common/components';
import { DailyInfo } from 'domains';
import { FadeIn, FadeOut } from 'common/keyframes';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const minWidth = process.env.REACT_APP_MIN_WIDTH;

const Popular: React.FC = () => {
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [photoGap, setPhotoGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);

    const [articleCols, setArticleCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [articleGap, setArticleGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);

    const [pageAnim, setPageAnim] = useState<any>(FadeIn);

    const picData = [{}, {}, {}, {}, {}, {}, {}, {}];
    const artData = [{}, {}, {}];

    const resizeHandler = () => {
        setPhotoCols(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
        setPhotoGap(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
        setArticleCols(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
        setArticleGap(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
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
                    <StyledTitleText>오늘의 인기 사진</StyledTitleText>
                    <StyledMoreText>더보기</StyledMoreText>
                </StyledDetailsBlock>
                <ItemList
                    width="100%"
                    imgHeight="100%"
                    cols={photoCols}
                    horizontalGap={photoGap}
                    verticalGap={photoGap}
                    items={picData}
                    RenderComponent={TodaysPhoto}
                />
                <StyledBorderLine />
                <StyledDetailsBlock>
                    <StyledTitleText>오늘의 인기 아티클</StyledTitleText>
                    <StyledMoreText>더보기</StyledMoreText>
                </StyledDetailsBlock>
                <ItemList
                    width="100%"
                    imgHeight="70%"
                    cols={articleCols}
                    horizontalGap={articleGap}
                    verticalGap={articleGap}
                    items={artData}
                    RenderComponent={TodaysArticle}
                />
                <StyledBorderLine />
                <StyledDetailsBlock>
                    <StyledTitleText>오늘의 Q&A</StyledTitleText>
                    <StyledMoreText>더보기</StyledMoreText>
                </StyledDetailsBlock>
            </StyledBottomContainer>
        </StyledPopularContainer>
    );
};

const StyledTitleText = styled.div`
    font-size: 17px;
    font-weight: bold;
    color: grey;
    flex: 1;
`;

const StyledMoreText = styled.div`
    font-size: 12px;
    font-weight: bold;
    color: silver;
    cursor: pointer;
`;

const StyledDetailsBlock = styled.div`
    display: flex;
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
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-top: -10px;
    }
`;

const StyledBottomContainer = styled.div`
    padding-left: 15%;
    padding-right: 15%;
`;
export default Popular;
