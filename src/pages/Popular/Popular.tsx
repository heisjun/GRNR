import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ItemList, TodaysPhoto, TodaysArticle } from 'common/components';
import { DailyInfo } from 'domains';
import { FadeIn, FadeOut } from 'common/keyframes';
import TodaysQuestion from 'common/components/TodaysQuestion';
import { useNavigate } from 'react-router-dom';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const Popular: React.FC = () => {
    const navigate = useNavigate();
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);
    const [photoGap, setPhotoGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
    const [photoVerticalGap, setPhotoVerticalGap] = useState(20);

    const [pageAnim, setPageAnim] = useState<any>(FadeIn);

    const picData = [
        { imgSrc: '/popular/2.jpg' },
        { imgSrc: '/popular/3.jpg' },
        { imgSrc: '/popular/4.jpg' },
        { imgSrc: '/popular/5.jpg' },
        { imgSrc: '/popular/6.jpg' },
        { imgSrc: '/popular/7.jpg' },
        { imgSrc: '/popular/8.jpg' },
        { imgSrc: '/popular/9.jpg' },
    ];

    const questionData = [{}, {}, {}, {}, {}, {}];

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledPopularContainer pageAnim={pageAnim}>
            <DailyInfo />

            <StyledBottomContainer>
                <StyledDetailsBlock>
                    <StyledTitleText>인기 사진</StyledTitleText>
                    <StyledMoreText onClick={() => navigate('/community/photo')}>
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
                    <StyledMoreText onClick={() => navigate('/community/magazine')}>
                        더보기 <StyledArrowIcon src="/btnArrowGray.png" />
                    </StyledMoreText>
                </StyledDetailsBlock>
                <TodaysArticle />
                <StyledBorderLine />
                <StyledDetailsBlock>
                    <StyledTitleText>Q&A</StyledTitleText>
                    <StyledMoreText onClick={() => navigate('/community/question')}>
                        더보기 <StyledArrowIcon src="/btnArrowGray.png" />
                    </StyledMoreText>
                </StyledDetailsBlock>
                <ItemList
                    width="100%"
                    imgHeight="100%"
                    cols={3}
                    horizontalGap={2}
                    verticalGap={photoVerticalGap}
                    items={questionData}
                    RenderComponent={TodaysQuestion}
                />
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
`;

const StyledMoreText = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    color: #a6a6a6;
    cursor: pointer;
`;

const StyledDetailsBlock = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    max-width: 1140px;
`;

const StyledBorderLine = styled.div`
    height: 120px;
`;

const StyledBorderPlace = styled.div`
    margin: 30px 0px 30px 0px;
`;

const StyledPopularContainer = styled.div<{ pageAnim: any }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

const StyledBottomContainer = styled.div`
    max-width: 1140px;
    margin-top: 100px;
    margin-bottom: 100px;
`;
export default Popular;
