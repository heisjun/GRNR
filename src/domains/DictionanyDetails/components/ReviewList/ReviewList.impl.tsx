import styled from 'styled-components';
import { IReviewListProps } from './ReviewList.interface';

import EmptyIcon from '../../../../assets/icon/emptyHeart.png';
import HeartIcon from 'assets/icon/heart.png';
import Rectangle from 'assets/icon/rectangle.png';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import axios from 'axios';
import { ReviewModal } from '../ReviewModal/ReviewModal.impl';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

export const ReviewList: React.FC<IReviewListProps> = ({ data, getReviewData, details, fetchData }) => {
    const [check, setCheck] = useState(data?.myLiken);
    const handleHelperCheck = () => {
        setCheck(!check);
    };

    const deleteReview = async () => {
        await axios.delete(`${BASEURL}/api/plantDicReview/${data?.reviewId}/delete`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,    
            },
        });
        getReviewData();
        fetchData();
    };

    const [openModal, setOpenModal] = useState(false);

    const handleModal = () => {
        setOpenModal(!openModal);
    };
    const renderEvaluationSum = () => {
        if (data?.evaluation === 0) {
            return (
                <>
                    <StyledEmptyImg src={EmptyIcon} />
                    <StyledEmptyImg src={EmptyIcon} />
                    <StyledEmptyImg src={EmptyIcon} />
                    <StyledEmptyImg src={EmptyIcon} />
                    <StyledEmptyImg src={EmptyIcon} />
                </>
            );
        }
        if (data?.evaluation === 1) {
            return (
                <>
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                </>
            );
        }
        if (data?.evaluation === 2) {
            return (
                <>
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                </>
            );
        }
        if (data?.evaluation === 3) {
            return (
                <>
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                </>
            );
        }
        if (data?.evaluation === 4) {
            return (
                <>
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledEmptyImg src={EmptyIcon} alt="" />
                </>
            );
        }
        if (data?.evaluation === 5) {
            return (
                <>
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                </>
            );
        }
    };
    return (
        <>
            <StyledImage src={data?.reviewUrl} alt="" />
            <StyledContent>
                <StyledUserInfoBox>
                    <div style={{ display: 'flex' }}>
                        <StyledUserImage src={data?.accountPicture} alt="" />
                        <StyledUserInfoContainer>
                            <StyledUserId>
                                {data?.accountName}
                                <span>{data?.createDate}</span>
                            </StyledUserId>
                            <StyledHeartBox>{renderEvaluationSum()}</StyledHeartBox>
                        </StyledUserInfoContainer>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <FixDeleteTextStyle onClick={handleModal}>수정</FixDeleteTextStyle>
                        <FixDeleteTextStyle onClick={deleteReview} style={{ marginLeft: '10px' }}>
                            삭제
                        </FixDeleteTextStyle>
                    </div>
                </StyledUserInfoBox>
                <StyledReviewContent
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.reviewText ?? ''),
                    }}
                />
                <div style={{ display: 'flex' }}>
                    {data?.tagDtoList.map((item, idx) => (
                        <StyledCategoryList key={idx}>
                            <StyledCategoryText>{item}</StyledCategoryText>
                        </StyledCategoryList>
                    ))}
                </div>
                {!check ? (
                    <StyledReviewCheckContainer>
                        <StyledCheckBox onClick={handleHelperCheck}>도움이 돼요</StyledCheckBox>
                        <span>{data?.likeCount}명에게 도움이 되었습니다.</span>
                    </StyledReviewCheckContainer>
                ) : (
                    <StyledReviewCheckContainer>
                        <StyledSelectedBox onClick={handleHelperCheck}>
                            <CheckImage src={Rectangle} />
                            도움됨
                        </StyledSelectedBox>
                        <span>{data?.likeCount}명에게 도움이 되었습니다.</span>
                    </StyledReviewCheckContainer>
                )}
            </StyledContent>
            {openModal && (
                <ReviewModal
                    open={openModal}
                    onClose={handleModal}
                    data={details}
                    requestReview={getReviewData}
                    reviewData={data}
                />
            )}
        </>
    );
};

const StyledImage = styled.img`
    margin-right: 6px;
    width: 230px;
    height: 230px;
    object-fit: 'cover';
`;

const StyledContent = styled.div``;

const StyledUserInfoBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 880px;
`;

const StyledUserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`;

const StyledUserInfoContainer = styled.div`
    margin-left: 6px;
`;

const StyledUserId = styled.div`
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    font-family: NotoSansKR;

    span {
        margin-left: 6px;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
    }
`;

const StyledHeartBox = styled.div`
    margin-bottom: 20px;
`;

const StyledHeartImg = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 2px;
`;

const StyledEmptyImg = styled.img`
    margin-right: 5px;
    width: 22px;
    height: 22px;
`;

const StyledReviewContent = styled.div`
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
`;

const StyledCategoryList = styled.div`
    display: flex;
`;

const StyledCategoryText = styled.div`
    margin-right: 3px;
    padding: 3px 15px;
    border: 1px solid #0d6637;
    border-radius: 19px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #0d6637;
`;

const StyledReviewCheckContainer = styled.div`
    display: flex;

    align-items: center;
    margin-top: 20px;
    span {
        margin-left: 10px;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
    }
`;

const StyledCheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 114px;
    height: 32px;
    border: 1px solid #0d6637;
    border-radius: 5px;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    color: #0d6637;
    cursor: pointer;
`;

const CheckImage = styled.img`
    margin-top: 3px;
    margin-right: 5px;
    width: 16px;
    height: 16px;
`;

const StyledSelectedBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 116px;
    height: 34px;
    background: #0d6637;
    border-radius: 5px;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    color: #ffffff;
`;

const FixDeleteTextStyle = styled.span`
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #d9d9d9;
    cursor: pointer;
`;
