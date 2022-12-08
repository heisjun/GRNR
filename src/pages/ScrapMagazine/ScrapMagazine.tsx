import styled from 'styled-components';
import { useState } from 'react';
import { ItemList, MagazineItem } from 'common/components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const ScrapMagazine: React.FC = () => {
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 1);
    const [magazineHorizontalGap, setMagazineHorizontalGap] = useState(
        window.innerWidth > Number(boundaryWidth) ? 3 : 0,
    );
    const [magazineVerticalGap, setMagazineVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);

    const data = null;

    return (
        <StyledScrapBookContainer>
            <StyledContextContainer>
                <StyledContexTitle>스크랩북</StyledContexTitle>
                <StyledDetailsBlock>
                    <StyledDetailTitle>매거진</StyledDetailTitle>
                </StyledDetailsBlock>
                {data ? (
                    <ItemList
                        width="100%"
                        imgHeight="75%"
                        cols={magazineCols}
                        horizontalGap={magazineHorizontalGap}
                        verticalGap={magazineVerticalGap}
                        items={data}
                        RenderComponent={MagazineItem}
                    />
                ) : (
                    <div>게시글이 존재하지 않습니다</div>
                )}
            </StyledContextContainer>
        </StyledScrapBookContainer>
    );
};

const StyledContextContainer = styled.div`
    width: 796px;
`;

const StyledContexTitle = styled.div`
    font-family: NotoSansKR;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
    margin-bottom: 30px;
`;

const StyledScrapBookContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledDetailsBlock = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    margin-top: 40px;
    justify-content: space-between;
`;

const StyledDetailTitle = styled.div`
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: bold;
    color: #272727;
    span {
        color: #0d6637;
    }
`;

export default ScrapMagazine;
