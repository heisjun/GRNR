import styled from 'styled-components';
import { ItemList, MyphotoItem } from 'common/components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');
const Myphoto: React.FC = () => {
    interface IpicData {
        pictureId: number;
        pictureUrl: string;
        likeCount: number;
        scrapCount: number;
        viewCount: number;
        commentCount: number;
    }

    const [picData, setPicData] = useState<IpicData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(
                    `${BASEURL}/api/account/${sessionStorage.getItem('accountId')}/scraps`,
                    {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setPicData(myfeedData.data.value.scrapPictureDtoList);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <StyledScrapBookContainer>
            <StyledContextContainer>
                <StyledContexTitle>스크랩북</StyledContexTitle>
                <StyledDetailsBlock>
                    <StyledDetailTitle>
                        사진 <span>{picData.length}</span>
                    </StyledDetailTitle>
                </StyledDetailsBlock>
                {picData ? (
                    <ItemList
                        width="100%"
                        imgHeight="115%"
                        cols={4}
                        horizontalGap={2}
                        verticalGap={2}
                        items={picData}
                        RenderComponent={MyphotoItem}
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
export default Myphoto;
