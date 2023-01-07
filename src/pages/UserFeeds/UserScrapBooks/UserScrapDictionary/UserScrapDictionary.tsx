import styled from 'styled-components';
import { ItemList } from 'common/components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScrapDictionaryItem from 'common/components/ScrapDictionaryItem';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');
const UserScrapDictionary: React.FC = () => {
    interface IdicData {
        dictionaryId: number;
        pictureUrl: string;
        korName: string;
        engName: string;
    }

    const navigate = useNavigate();
    const [dicData, setDicData] = useState<IdicData[]>([]);
    const [dicCols, setDicCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [dicGap, setDicGap] = useState(window.innerWidth > Number(boundaryWidth) ? 1 : 6);
    const [dicVerticalGap, setDicVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 40 : 4);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(`${BASEURL}/api/account/${localStorage.getItem('userId')}/scraps`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                setDicData(myfeedData.data.value.scrapDictionaryDtoList);
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
                        식물사전 <span>{dicData.length}</span>
                    </StyledDetailTitle>
                </StyledDetailsBlock>
                {dicData ? (
                    <ItemList
                        width="100%"
                        imgHeight="70%"
                        cols={dicCols}
                        horizontalGap={dicGap}
                        verticalGap={dicVerticalGap}
                        items={dicData}
                        RenderComponent={ScrapDictionaryItem}
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
export default UserScrapDictionary;
