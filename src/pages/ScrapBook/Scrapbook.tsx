import styled from 'styled-components';
import { ItemList, TodaysPhoto, MagazineItem, DictionaryItem } from 'common/components';
import { Profile } from 'domains';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const ScrapBook: React.FC = () => {
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [photoGap, setPhotoGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);

    const [articleCols, setArticleCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [articleGap, setArticleGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);

    const picData = [{}, {}, {}, {}];
    const articleData = [{}, {}, {}, {}];
    const dicData = [{}, {}, {}];

    return (
        <StyledScrapBookContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledContextBlock>
                    <StyledContextTitle>스크랩북</StyledContextTitle>
                    <StyledDetailsBlock>
                        <StyledDetailTitle>사진</StyledDetailTitle>
                        <Link to="./photo" style={{ textDecoration: 'none' }}>
                            <StyledDetailView>전체보기</StyledDetailView>
                        </Link>
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
                        <StyledDetailTitle>매거진</StyledDetailTitle>
                        <Link to="./magazine" style={{ textDecoration: 'none' }}>
                            <StyledDetailView>전체보기</StyledDetailView>
                        </Link>
                    </StyledDetailsBlock>
                    <ItemList
                        width="100%"
                        imgHeight="70%"
                        cols={photoCols}
                        horizontalGap={photoGap}
                        verticalGap={photoGap}
                        items={articleData}
                        RenderComponent={TodaysPhoto}
                    />
                    <StyledBorderLine />
                    <StyledDetailsBlock>
                        <StyledDetailTitle>식물사전</StyledDetailTitle>
                        <Link to="./dictionary" style={{ textDecoration: 'none' }}>
                            <StyledDetailView>전체보기</StyledDetailView>
                        </Link>
                    </StyledDetailsBlock>
                    <ItemList
                        width="100%"
                        imgHeight="80%"
                        cols={articleCols}
                        horizontalGap={articleGap}
                        verticalGap={articleGap}
                        items={dicData}
                        RenderComponent={DictionaryItem}
                    />
                </StyledContextBlock>
            </StyledContextContainer>
        </StyledScrapBookContainer>
    );
};

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 30px 0px 20px 0px;
`;
const StyledDetailsBlock = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    margin-top: 15px;
    justify-content: space-between;
`;

const StyledDetailTitle = styled.div`
    color: gray;
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
`;

const StyledDetailView = styled.div`
    color: lightgray;
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
`;

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
`;

export default ScrapBook;
