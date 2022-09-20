import DictionaryInfo from 'common/components/DictionaryInfo';
import PlantGuide from 'common/components/PlantGuide';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ItemList, DictionaryItem } from 'common/components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const DictionaryDetails: React.FC = () => {
    const [articleCols, setArticleCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [articleGap, setArticleGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
    const articleData = [{}, {}, {}, {}];
    return (
        <StyledDicDetailsContainer>
            <DictionaryInfo />
            <StyledBorderLine />
            <PlantGuide />
            <StyledBorderLine />
            <StyledDetailsBlock>
                <StyledDetailTitle>#몬스테라 테라오사 관련 아티클</StyledDetailTitle>
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
                items={articleData}
                RenderComponent={DictionaryItem}
            />
            <StyledBorderLine />
        </StyledDicDetailsContainer>
    );
};

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 70px 0px 20px 0px;
`;

const StyledDicDetailsContainer = styled.div`
    width: 100%;
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

export default DictionaryDetails;
