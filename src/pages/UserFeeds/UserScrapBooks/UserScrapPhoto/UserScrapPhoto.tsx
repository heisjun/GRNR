import styled from 'styled-components';
import { ItemList, MyphotoItem } from 'common/components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');
const UserScrapPhoto: React.FC = () => {
    interface IpicData {
        pictureId: number;
        pictureContentUrl: string;
        likeCount: number;
        scrapCount: number;
        viewCount: number;
        commentCount: number;
        video: boolean;
        myLike: boolean;
        myScrap: boolean;
    }
    const [observerRef, observerInview] = useInView();
    const [size, setSize] = useState(16);

    const [picData, setPicData] = useState<IpicData[]>([]);

    const fetchData = async () => {
        try {
            const myfeedData = await axios.get(
                `${BASEURL}/api/account/${localStorage.getItem('userId')}/scraps/picture`,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    params: {
                        page: 0,
                        size: size,
                    },
                },
            );
            setPicData(myfeedData.data.value.content);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (observerInview) {
            setSize((prev) => prev + 16);
            fetchData();
        }
    }, [observerInview]);

    useEffect(() => {
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
                    <>
                        <ItemList
                            width="100%"
                            imgHeight="115%"
                            cols={4}
                            horizontalGap={2}
                            verticalGap={2}
                            items={picData}
                            RenderComponent={MyphotoItem}
                        />
                        <div ref={observerRef} />
                    </>
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
export default UserScrapPhoto;
