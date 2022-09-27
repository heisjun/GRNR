import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar, ItemList } from 'common/components';
import { TaggedPhoto } from 'domains';
import { getDebouncedFunc } from 'common/funcs';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EXAMPLE = [{}, {}, {}];

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const QuestionDetails: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<any>('');
    const sideBarRef = useRef<any>(null);

    const params = useParams();

    const scrollHandler = () => {
        sideBarRef.current.style.transition = 'all 0.5s ease-in-out';
        sideBarRef.current.style.transform = `translateY(${window.scrollY}px)`;
    };

    const debouncedScrollHandler = getDebouncedFunc(scrollHandler, 100);

    useEffect(() => {
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://43.201.2.18/api/api/inquiry/detail/${params.id}`);
                console.log(response.data.value[0]);
                setDetails(response.data.value[0]);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [params]);

    const data = [{}, {}];

    function timeForToday(value: any) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 4) {
            return `${betweenTimeDay}일전`;
        }

        return `${value}`;
    }

    return (
        <StyledPhotoDetailsContainer>
            <StyledDetailsBlock>
                <StyledTopTextBlock>
                    <StyledContentText>Q&A : {params.id}</StyledContentText>
                    <StyledTitleText>{details.title}</StyledTitleText>
                    <StyledContentText>{timeForToday(details.time)}</StyledContentText>
                </StyledTopTextBlock>
                <ItemList
                    width="100%"
                    imgHeight="100%"
                    cols={1}
                    horizontalGap={0}
                    verticalGap={0}
                    items={data}
                    RenderComponent={TaggedPhoto}
                />
                <StyledUserInfoBlock>
                    <StyledProfileBlock>
                        <StyledWriterBlock>
                            <StyeldAvatarBlock>
                                <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                            </StyeldAvatarBlock>
                            <StyledWriterText>{details.accountNicName}</StyledWriterText>
                        </StyledWriterBlock>
                    </StyledProfileBlock>
                    <StyledFollowButtonBlock>
                        <StyledFollowButton>
                            <StyledFollowText>팔로우 +</StyledFollowText>
                        </StyledFollowButton>
                    </StyledFollowButtonBlock>
                </StyledUserInfoBlock>
            </StyledDetailsBlock>
            <StyledButtonsContainer>
                <StyledButtonsBlock ref={sideBarRef}>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>12</StyledButtonText>
                    </StyledButtonBlock>
                </StyledButtonsBlock>
            </StyledButtonsContainer>
        </StyledPhotoDetailsContainer>
    );
};

const StyledButtonText = styled.div`
    font-size: 14px;
    color: grey;
    margin-top: 10px;
`;

const StyledButton = styled.div`
    width: 50%;
    padding-bottom: 50%;
    background-color: silver;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: grey;
    }
`;

const StyledButtonBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20%;
`;

const StyledContentText = styled.div`
    font-size: 15px;
    color: grey;
    margin-bottom: 5px;
`;

const StyledTitleText = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: grey;
    margin-bottom: 5px;
`;

const StyledTopTextBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const StyledDetailsBlock = styled.div`
    width: 70%;
`;

const StyledButtonsBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledButtonsContainer = styled.div`
    position: relative;
    width: 10%;
`;

const StyledPhotoDetailsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledKeyword = styled.div`
    color: gray;
    font-size: 13px;
    border: 1px solid gray;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
    margin-right: 5px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
        padding: 1%;
    }
`;

const StyledFollowText = styled.div`
    font-size: 15px;
    color: grey;
`;

const StyledFollowButton = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px;
    border-radius: 25px;
    border-color: silver;
    cursor: pointer;
    &:hover {
        background-color: silver;
    }
`;

const StyledFollowButtonBlock = styled.div`
    width: 18%;
`;

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: silver;
    margin: 30px 0px 30px 0px;
`;

const StyeldAvatarBlock = styled.div`
    width: 10%;
`;

const StyledWriterText = styled.div`
    margin-left: 2%;
    font-size: 20px;
    color: grey;
`;

const StyledWriterBlock = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2px;
`;

const StyledProfileBlock = styled.div`
    flex: 1;
`;

const StyledUserInfoBlock = styled.div`
    width: 100%;
    display: flex;
`;

export default QuestionDetails;
