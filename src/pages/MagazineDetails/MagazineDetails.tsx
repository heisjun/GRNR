import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar, ItemList } from 'common/components';
import { TaggedPhoto } from 'domains';
import { getDebouncedFunc } from 'common/funcs';
import { useParams, useNavigate } from 'react-router-dom';
import { default as callApi } from 'common/api';
import { IMagazineDetailsParams, ICommentsParams } from 'common/types';
import axios from 'axios';
import CommentItem from 'common/components/CommentItem';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const MagazineDetails: React.FC = () => {
    const navigate = useNavigate();
    const sideBarRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<IMagazineDetailsParams>();
    const [commentsList, setCommentsList] = useState<ICommentsParams>();

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.getDetailList(Number(params.id), 'magazine');
                setDetails(response.data.value);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const CommentData = await axios.get(
                    `${BASEURL}/api/magazine/${params.id}/comment/view
                `,
                );
                setCommentsList(CommentData.data.value.content[0]);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

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

    const onDeletePost = async () => {
        try {
            await axios.delete(
                `${BASEURL}/api/magazine/${params.id}/delete
            `,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            navigate(-1);
        } catch (e) {
            console.log(e);
        }
    };

    const onEdit = () => {
        navigate('/community/photo/edit', { state: params.id });
    };

    const onMagazineReport = async (pictureId: number) => {
        const res = await axios.put(
            `${BASEURL}/api/report/picture/${pictureId}
        `,
            {},
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${TOKEN}`,
                },
            },
        );

        if (res.status === 201) console.log(res.data);
    };

    const onMagazineLike = async () => {
        try {
            await axios.post(
                `${BASEURL}/api/magazine/${params.id}/like`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onMagazineScrap = async () => {
        try {
            await axios.post(
                `${BASEURL}/api/magazine/${params.id}/scrap`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
        } catch (e) {
            console.log(e);
        }
    };

    const data = [
        {
            magazineId: 1,
            contentId: 1,
            pictureId: 1,
            pictureUrl: '매거진_사진1.jpg',
            tagDtoList: null,
            explain: '사진 1 설명',
        },
    ];

    return (
        <StyledPhotoDetailsContainer>
            <StyledDetailsBlock>
                <StyledTopTextBlock>
                    <StyledViewCountText>{`${details?.accountNickName} 님의 매거진`}</StyledViewCountText>
                    <StyledTitleText>{details?.title}</StyledTitleText>
                    {/* <StyledReportText onClick={onDeletePost}>삭제</StyledReportText>
                    <StyledReportText onClick={onEdit}>수정</StyledReportText>
                    <StyledReportText onClick={() => onPhotoReport(details?.magazineId ? details.magazineId : 0)}>
                        신고
                    </StyledReportText> */}
                </StyledTopTextBlock>
                <ItemList
                    width="100%"
                    imgHeight="100%"
                    cols={1}
                    horizontalGap={0}
                    verticalGap={0}
                    items={details?.magazineContentDtoList ? details?.magazineContentDtoList : data}
                    RenderComponent={TaggedPhoto}
                />
                <StyledUserInfoBlock>
                    <StyledProfileBlock>
                        <StyledWriterBlock>
                            <StyeldAvatarBlock>
                                <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                            </StyeldAvatarBlock>
                            <StyledWriterText>{details?.accountNickName}</StyledWriterText>
                        </StyledWriterBlock>
                    </StyledProfileBlock>
                    <StyledFollowButtonBlock>
                        <StyledFollowButton>
                            <StyledFollowText>팔로우 +</StyledFollowText>
                        </StyledFollowButton>
                    </StyledFollowButtonBlock>
                </StyledUserInfoBlock>
                <StyledBorderLine />
                {/*  <CommentItem commentsList={commentsList} pictureId={params.id} category="magazine" /> */}
            </StyledDetailsBlock>
            <StyledButtonsContainer>
                <StyledButtonsBlock ref={sideBarRef}>
                    <StyledButtonBlock>
                        <StyledButton onClick={onMagazineLike} />
                        <StyledButtonText>좋아요:{details?.likeCount}</StyledButtonText>
                    </StyledButtonBlock>
                    <StyledButtonBlock>
                        <StyledButton />
                        <StyledButtonText>댓글:{commentsList?.commentQuantity}</StyledButtonText>
                    </StyledButtonBlock>
                    <StyledButtonBlock>
                        <StyledButton onClick={onMagazineScrap} />
                        <StyledButtonText>스크랩:{details?.scrapCount}</StyledButtonText>
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

const StyledViewCountText = styled.div`
    flex: 1;
    font-size: 15px;
    color: grey;
    padding-bottom: 5px;
`;

const StyledTitleText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: grey;
    padding-bottom: 5px;
`;

const StyledReportText = styled.div`
    padding-left: 10px;
    font-size: 15px;
    color: silver;
    cursor: pointer;
`;

const StyledTopTextBlock = styled.div`
    width: 100%;
    height: 100px;
    background-color: lightgray;
    margin-bottom: 40px;
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

export default React.memo(MagazineDetails);
