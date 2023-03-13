import DictionaryInfo from 'common/components/DictionaryInfo';
import PlantGuide from 'common/components/PlantGuide';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { ItemList, DictionaryItem, MagazineItem } from 'common/components';
import { default as callApi } from 'common/api';
import { IDictionaryDetailsParams } from 'common/types';
import Faq from 'common/components/FAQ';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const DictionaryDetails: React.FC = () => {
    const [articleCols, setArticleCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [articleGap, setArticleGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [details, setDetails] = useState<IDictionaryDetailsParams>();
    const articleData = [{}, {}, {}];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASEURL}/api/plantDic/${params.id}/detail`);
                console.log(response.data.value);
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
            <div style={{ maxWidth: 1140, margin: 'auto' }}>
                <DictionaryInfo data={details} />
                <PlantGuide />
                <Faq />

                <StyledDetailsBlock>
                    <StyledDetailTitle>
                        #<span>{details?.plantName}</span> 관련 매거진
                    </StyledDetailTitle>
                    <StyledMoreText>
                        더보기 <StyledArrowIcon src="/btnArrowGray.png" />
                    </StyledMoreText>
                </StyledDetailsBlock>
                <div style={{ width: 1140 }}>
                    <ItemList
                        width="100%"
                        imgHeight="80%"
                        cols={articleCols}
                        horizontalGap={articleGap}
                        verticalGap={articleGap}
                        items={articleData}
                        RenderComponent={MagazineItem}
                    />
                </div>
            </div>
        </StyledDicDetailsContainer>
    );
};

const StyledDicDetailsContainer = styled.div`
    margin-bottom: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* @media screen and (max-width: ${maxWidth}px) {
        padding-left: 20%;
        padding-right: 20%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        margin-left: 390px;
        margin-right: 390px;
    } */
`;

const StyledDetailsBlock = styled.div`
    width: 1140px;
    display: flex;
    margin-bottom: 15px;
    margin-top: 15px;
    justify-content: space-between;
`;

const StyledDetailTitle = styled.div`
    font-family: NotoSansKR;
    display: flex;
    font-size: 26px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
    span {
        color: #0d6637;
        font-weight: bold;
    }
`;

const StyledArrowIcon = styled.img`
    width: 14px;
    height: 14px;
    margin: 2px 0 2px 4px;
    object-fit: contain;
`;

const StyledMoreText = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #a6a6a6;
    cursor: pointer;
`;

export default DictionaryDetails;
