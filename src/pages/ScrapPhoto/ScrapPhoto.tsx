import styled from 'styled-components';
import { Profile } from 'domains';
import { useState } from 'react';
import { ItemList, ScrapPhotoItem } from 'common/components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const ScrapPhoto: React.FC = () => {
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 1);
    const [photoHorizontalGap, setPhotoHorizontalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 0);
    const [photoVerticalGap, setPhotoVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);

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
                    <StyledContextTitle>사진</StyledContextTitle>
                    <ItemList
                        width="100%"
                        imgHeight="130%"
                        cols={photoCols}
                        horizontalGap={photoHorizontalGap}
                        verticalGap={photoVerticalGap}
                        items={data}
                        RenderComponent={ScrapPhotoItem}
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
    margin-bottom: 20px;
`;

export default ScrapPhoto;
