import styled from 'styled-components';
import { ItemList, TodaysPhoto, MyfeedItem } from 'common/components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const Scrapbook: React.FC = () => {
    const navigate = useNavigate();
    interface IpicData {
        pictureId: number;
        pictureUrl: string;
        likeCount: number;
        scrapCount: number;
        viewCount: number;
        commentCount: number;
    }
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [photoGap, setPhotoGap] = useState(window.innerWidth > Number(boundaryWidth) ? 0 : 4);

    const [picData, setPicData] = useState<IpicData[]>([]);
    const [magazineData, setMagazineData] = useState([]);

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
                console.log(myfeedData.data.value.scrapPictureDtoList);
                setMagazineData(myfeedData.data.value.scrapMagazineDtoList);
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
                    <Link to="/mypage/profile/photo" style={{ textDecoration: 'none' }}>
                        <StyledDetailView>
                            전체보기 <img src="/btnArrowGray.png" />
                        </StyledDetailView>
                    </Link>
                </StyledDetailsBlock>
                <ItemList
                    width="100%"
                    imgHeight="100%"
                    cols={photoCols}
                    horizontalGap={photoGap}
                    verticalGap={photoGap}
                    items={picData}
                    RenderComponent={MyfeedItem}
                />

                <StyledBorderLine />
                <StyledDetailsBlock>
                    <StyledDetailTitle>
                        매거진 <span>12</span>
                    </StyledDetailTitle>
                    <Link to="/mypage/profile/magazine" style={{ textDecoration: 'none' }}>
                        <StyledDetailView>
                            전체보기 <img src="/btnArrowGray.png" />
                        </StyledDetailView>
                    </Link>
                </StyledDetailsBlock>
                <ItemList
                    width="100%"
                    imgHeight="70%"
                    cols={photoCols}
                    horizontalGap={photoGap}
                    verticalGap={photoGap}
                    items={magazineData}
                    RenderComponent={TodaysPhoto}
                />
                <StyledBorderLine />
                <StyledDetailsBlock>
                    <StyledDetailTitle>
                        식물사전 <span>11</span>
                    </StyledDetailTitle>
                    <Link to="/mypage/profile/question" style={{ textDecoration: 'none' }}>
                        <StyledDetailView>
                            전체보기 <img src="/btnArrowGray.png" />
                        </StyledDetailView>
                    </Link>
                </StyledDetailsBlock>
            </StyledContextContainer>
        </StyledScrapBookContainer>
    );
};

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: #ececec;
    margin: 40px 0px;
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

const StyledDetailView = styled.div`
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a6a6a6;
    img {
        width: 16px;
        height: 16px;
        object-fit: contain;
    }
`;

const StyledProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 1000px;
    background-color: white;
    margin-right: 64px;
`;

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
`;

const StyledScrapBookContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default Scrapbook;
