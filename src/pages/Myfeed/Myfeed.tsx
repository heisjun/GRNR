import styled from 'styled-components';
import { ItemList, TodaysPhoto, MyfeedItem } from 'common/components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const Myfeed: React.FC = () => {
    interface IpicData {
        pictureId: number;
        pictureUrl: string;
        myLike: boolean;
        myScrap: boolean;
        likeCount: number;
        scrapCount: number;
        commentCount: number;
    }
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [photoGap, setPhotoGap] = useState(window.innerWidth > Number(boundaryWidth) ? 0 : 4);

    const [picData, setPicData] = useState<IpicData[]>([]);
    const [magazineData, setMagazineData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(`${BASEURL}/api/account/${localStorage.getItem('accountId')}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                setPicData(myfeedData.data.value.myPictureDtoList);
                setMagazineData(myfeedData.data.value.myMagazineDtoList);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <StyledScrapBookContainer>
            <StyledContextContainer>
                <StyledContexTitle>나의피드</StyledContexTitle>
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
                        매거진 <span>0</span>
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
                        Q&A <span>0</span>
                    </StyledDetailTitle>
                    <Link to="/mypage/profile/question" style={{ textDecoration: 'none' }}>
                        <StyledDetailView>
                            전체보기 <img src="/btnArrowGray.png" />
                        </StyledDetailView>
                    </Link>
                </StyledDetailsBlock>

                {/* <QuestionItem data={questions} /> */}
            </StyledContextContainer>
        </StyledScrapBookContainer>
    );
};

const StyledFeedNav = styled.div<{ nav?: boolean }>`
    box-sizing: border-box;
    width: 280px;
    height: 60px;
    padding: 18px 0px 18px 14px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ nav }) => (nav ? '#0d6637;' : '#272727')};
    background-color: ${({ nav }) => (nav ? '#e7f5ee;' : 'white')};
    cursor: pointer;
`;

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

export default Myfeed;
