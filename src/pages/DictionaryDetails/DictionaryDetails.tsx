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
import { DetailReviewInfo } from 'domains/DictionanyDetails/components';
import { IReviewType } from 'domains/DictionanyDetails/components/types/reviewType';
import { ReviewList } from 'domains/DictionanyDetails/components/ReviewList/ReviewList.impl';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const tabCategory = ['인기순', '최신순', '내가 작성한 리뷰'];

const DictionaryDetails: React.FC = () => {
    const [articleCols, setArticleCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [articleGap, setArticleGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [details, setDetails] = useState<IDictionaryDetailsParams>();
    const [reviewList, setReviewList] = useState<IReviewType>();
    const [tabData, setTabData] = useState('인기순');
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

    const getReviewData = async () => {
        const {
            data: { value },
        } = await axios.get(`${BASEURL}/api/plantDicReview/${params.id}/search`, {
            params: { order: tabData },
        });
        setReviewList(value);
    };

    useEffect(() => {
        getReviewData();
    }, [tabData]);

    const activeTab = (tab: string) => {
        setTabData(tab);
    };

    return (
        <StyledDicDetailsContainer>
            <div style={{ maxWidth: 1140, margin: 'auto' }}>
                <DictionaryInfo data={details} />
                <PlantGuide data={details} />
                <Faq data={details} />
                {details && <DetailReviewInfo data={details} requestReview={getReviewData} />}
                <StyledTabContainer>
                    {tabCategory.map((item, idx) => (
                        <StyledTabText key={idx} tabData={tabData} item={item} onClick={() => activeTab(item)}>
                            {item}
                        </StyledTabText>
                    ))}
                </StyledTabContainer>
                {reviewList?.content?.map((item, idx) => (
                    <StyledReviewListContainer key={idx}>
                        <ReviewList data={item} />
                    </StyledReviewListContainer>
                ))}
                {/* <StyledDetailsBlock>
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
                </div> */}
            </div>
        </StyledDicDetailsContainer>
    );
};

interface IStyled {
    tabData: string;
    item: string;
}

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

const StyledTabContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
`;

const StyledTabText = styled.span<IStyled>`
    margin-right: 6px;
    color: ${({ tabData, item }) => (tabData === item ? '#0D6637' : '#D9D9D9')};
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    cursor: pointer;
`;

const StyledReviewListContainer = styled.div`
    display: flex;
    height: 250px;
    margin-bottom: 15px;
    padding: 10px;
`;

export default DictionaryDetails;
