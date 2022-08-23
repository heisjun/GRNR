import styled from 'styled-components';
import { Profile } from 'domains';
import { useState } from 'react';
import { ItemList, MagazineItem } from 'common/components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const ScrapMagazine: React.FC = () => {
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 1);
    const [magazineHorizontalGap, setMagazineHorizontalGap] = useState(
        window.innerWidth > Number(boundaryWidth) ? 3 : 0,
    );
    const [magazineVerticalGap, setMagazineVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);

    const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    return (
        <StyledScrapBookContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledContextBlock>
                    <StyledContextTitle>매거진</StyledContextTitle>
                    <ItemList
                        width="100%"
                        imgHeight="75%"
                        cols={magazineCols}
                        horizontalGap={magazineHorizontalGap}
                        verticalGap={magazineVerticalGap}
                        items={data}
                        RenderComponent={MagazineItem}
                    />
                </StyledContextBlock>
            </StyledContextContainer>
        </StyledScrapBookContainer>
    );
};

const StyledProfileBlock = styled.div`
    position: relative;
    width: 90%;
    padding-bottom: 150%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 75%;
    height: 5000px;
`;

const StyledContextBlock = styled.div`
    position: relative;
    width: 90%;
    padding-left: 10%;
`;

const StyledScrapBookContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
`;

const StyledContextTitle = styled.div`
    color: gray;
    font-size: 16px;
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 15px;
`;

export default ScrapMagazine;
