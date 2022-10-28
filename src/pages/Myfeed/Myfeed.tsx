import styled from 'styled-components';
import { ItemList, TodaysPhoto, MagazineItem, DictionaryItem } from 'common/components';
import { Profile } from 'domains';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionItem from 'common/components/QuestionItem';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Myfeed: React.FC = () => {
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 2);
    const [photoGap, setPhotoGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);

    const [articleCols, setArticleCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [articleGap, setArticleGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 4);

    const picData = [{}, {}, {}, {}];
    const articleData = [{}, {}, {}, {}];
    const [questions, setQuestions] = useState(null);
    const [loading, setLoading] = useState(false);
    /* useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://43.201.2.18/api/api/inquiry/recent`);
                setQuestions(response.data.value.content);
                console.log(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading || !questions) {
        return <div>대기중</div>;
    } */
    return (
        <StyledScrapBookContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledContextBlock>
                    <StyledDetailsBlock>
                        <StyledDetailTitle>사진</StyledDetailTitle>
                        <Link to="./photo" style={{ textDecoration: 'none' }}>
                            <StyledDetailView>전체보기</StyledDetailView>
                        </Link>
                    </StyledDetailsBlock>
                    <ItemList
                        width="100%"
                        imgHeight="100%"
                        cols={photoCols}
                        horizontalGap={photoGap}
                        verticalGap={photoGap}
                        items={picData}
                        RenderComponent={TodaysPhoto}
                    />
                    <Link to="/upload" style={{ textDecoration: 'none' }}>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                height: 50,
                                backgroundColor: 'lightgray',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}
                        >
                            사진업로드
                        </div>
                    </Link>
                    <StyledBorderLine />
                    <StyledDetailsBlock>
                        <StyledDetailTitle>매거진</StyledDetailTitle>
                        <Link to="./magazine" style={{ textDecoration: 'none' }}>
                            <StyledDetailView>전체보기</StyledDetailView>
                        </Link>
                    </StyledDetailsBlock>
                    <ItemList
                        width="100%"
                        imgHeight="70%"
                        cols={photoCols}
                        horizontalGap={photoGap}
                        verticalGap={photoGap}
                        items={articleData}
                        RenderComponent={TodaysPhoto}
                    />
                    <StyledBorderLine />
                    <StyledDetailsBlock>
                        <StyledDetailTitle>Q&A</StyledDetailTitle>
                        <Link to="./dictionary" style={{ textDecoration: 'none' }}>
                            <StyledDetailView>전체보기</StyledDetailView>
                        </Link>
                    </StyledDetailsBlock>
                    <StyledDetailTitle>나의질문</StyledDetailTitle>
                    {/* <QuestionItem data={questions} /> */}
                </StyledContextBlock>
            </StyledContextContainer>
        </StyledScrapBookContainer>
    );
};

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 30px 0px 20px 0px;
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

const StyledProfileBlock = styled.div`
    position: relative;
    width: 90%;
    padding-bottom: 150%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 75%;
    height: 5000px;
`;

const StyledContextBlock = styled.div`
    position: relative;
    width: 90%;
    padding-left: 10%;
`;

const StyledScrapBookContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
`;

const StyledContextTitle = styled.div`
    color: gray;
    font-size: 16px;
    font-weight: 500;
    margin-top: 5px;
`;

export default Myfeed;
