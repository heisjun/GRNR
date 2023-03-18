import styled from 'styled-components';
import { ItemList, TodaysPhoto, MyfeedItem } from 'common/components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import UserfeedItem from 'common/components/UserfeedItem';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const UserFeed: React.FC = () => {
    interface IpicData {
        pictureId: number;
        pictureContentUrl: string;
        myLike: boolean;
        myScrap: boolean;
        likeCount: number;
        scrapCount: number;
        commentCount: number;
        video: boolean;
    }

    interface IUserData {
        accountId: number;
        followerCount: number;
        followingCount: number;
        likeCount: number;
        nickName: string;
        profileUrl: string;
        scrapCount: number;
    }
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [photoGap, setPhotoGap] = useState(window.innerWidth > Number(boundaryWidth) ? 0 : 4);

    const [picData, setPicData] = useState<IpicData[]>([]);
    const [magazineData, setMagazineData] = useState([]);
    const [User, setUser] = useState<IUserData>();
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(`${BASEURL}/api/account/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                setUser(myfeedData.data.value.accountFeed);
                setPicData(myfeedData.data.value.feedPictureDtoList);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <StyledScrapBookContainer>
            <StyledContextContainer>
                <StyledContexTitle>{`${User?.nickName}님의 피드`}</StyledContexTitle>
                <StyledDetailsBlock>
                    <StyledDetailTitle>
                        사진 <span>{picData.length}</span>
                    </StyledDetailTitle>

                    <Link to={`/userpage/photo/${User?.accountId}`} style={{ textDecoration: 'none' }}>
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
                    RenderComponent={UserfeedItem}
                    setFunc={setPicData}
                />
                <StyledBorderLine />
                <StyledDetailsBlock>
                    <StyledDetailTitle>
                        매거진 <span>0</span>
                    </StyledDetailTitle>
                    <Link to={`/userpage/magazine/${User?.accountId}`} style={{ textDecoration: 'none' }}>
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
                    <Link to={`/userpage/question/${User?.accountId}`} style={{ textDecoration: 'none' }}>
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

export default UserFeed;
