import DictionaryInfo from 'common/components/DictionaryInfo';
import PlantGuide from 'common/components/PlantGuide';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { ItemList, DictionaryItem } from 'common/components';
import { default as callApi } from 'common/api';
import { IDictionaryDetailsParams } from 'common/types';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const DictionaryDetails: React.FC = () => {
    const [articleCols, setArticleCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [articleGap, setArticleGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [details, setDetails] = useState<IDictionaryDetailsParams>();
    const articleData = [{}, {}, {}, {}];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.getDetailList(Number(params.id), 'images');
                setDetails(response.data.value);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    return (
        <StyledDicDetailsContainer>
            <DictionaryInfo data={details} />
            <PlantGuide />
            <StyledBorderLine />
            <StyledDetailsBlock>
                <StyledDetailTitle>{`#${details?.plantName}  관련 아티클`}</StyledDetailTitle>
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
    @media screen and (max-width: ${maxWidth}px) {
        padding-left: 20%;
        padding-right: 20%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        margin-left: 390px;
        margin-right: 390px;
    }
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
