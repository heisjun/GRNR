import styled from 'styled-components';
import { IDetailReviewInfoProps } from './DetailReviewInfo.interface';
import EmptyIcon from '../../../../assets/icon/emptyHeart.png';
import HeartIcon from 'assets/icon/heart.png';

import { ReviewModal } from '../ReviewModal/ReviewModal.impl';
import { useRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modalAtom';

export const DetailReviewInfo: React.FC<IDetailReviewInfoProps> = (props) => {
    const { data, requestReview } = props;

    const [openModal, setOpenModal] = useRecoilState(modalAtom);

    const handleModal = () => {
        setOpenModal(!openModal);
    };

    const renderEvaluationSum = () => {
        if (data?.evaluationSum === 0) {
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
        if (data?.evaluationSum === 1) {
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
        if (data?.evaluationSum === 2) {
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
        if (data?.evaluationSum === 3) {
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
        if (data?.evaluationSum === 4) {
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
        if (data?.evaluationSum === 5) {
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
            <StyledReviewTitle>
                가드너스 리뷰: {data?.plantName} ({data?.scientificName})
            </StyledReviewTitle>
            <StyledReviewNumber>
                리뷰를 남긴 가드너: <span>{String(data?.reviewQuantity ?? 0).toLocaleString()} 명</span>
            </StyledReviewNumber>
            <StyledTotalReviewBox>
                <StyledHalfBox>
                    {renderEvaluationSum()}
                    <StyledEvaluationSumText>{data?.evaluationSum.toFixed(1)}</StyledEvaluationSumText>
                </StyledHalfBox>
                <StyledCenter color="#d9d9d9" />
                <ScoreContainer>
                    <StyledScoreBox>
                        <StyledScoreText>5점</StyledScoreText>
                        <StyledScorePercentBar>
                            <StyledScoreBarColor percent={data.fiveAccountPercent} />
                        </StyledScorePercentBar>
                        <StyledScoreText>{data.fiveAccount}</StyledScoreText>
                    </StyledScoreBox>
                    <StyledScoreBox>
                        <StyledScoreText>4점</StyledScoreText>
                        <StyledScorePercentBar>
                            <StyledScoreBarColor percent={data.fourAccountPercent} />
                        </StyledScorePercentBar>
                        <StyledScoreText>{data.fourAccount}</StyledScoreText>
                    </StyledScoreBox>
                    <StyledScoreBox>
                        <StyledScoreText>3점</StyledScoreText>
                        <StyledScorePercentBar>
                            <StyledScoreBarColor percent={data.threeAccountPercent} />
                        </StyledScorePercentBar>
                        <StyledScoreText>{data.threeAccount}</StyledScoreText>
                    </StyledScoreBox>
                    <StyledScoreBox>
                        <StyledScoreText>2점</StyledScoreText>
                        <StyledScorePercentBar>
                            <StyledScoreBarColor percent={data.twoAccountPercent} />
                        </StyledScorePercentBar>
                        <StyledScoreText>{data.twoAccount}</StyledScoreText>
                    </StyledScoreBox>
                    <StyledScoreBox>
                        <StyledScoreText>1점</StyledScoreText>
                        <StyledScorePercentBar>
                            <StyledScoreBarColor percent={data.oneAccountPercent} />
                        </StyledScorePercentBar>
                        <StyledScoreText>{data.oneAccount}</StyledScoreText>
                    </StyledScoreBox>
                </ScoreContainer>
            </StyledTotalReviewBox>
            <StyledReviewButton onClick={handleModal}>‘{data.plantName}’에 대한 나의 리뷰 쓰기</StyledReviewButton>
            <ReviewModal open={openModal} onClose={handleModal} data={data} requestReview={requestReview} />
        </>
    );
};

interface IStyled {
    percent: number;
}

const StyledReviewTitle = styled.h2`
    display: flex;
    justify-content: center;
    margin-bottom: 41px;
    width: 100%;
    font-size: 30px;
    font-family: NotoSansKR
    font-weight: bold;
    color: #272727;
`;

const StyledReviewNumber = styled.div`
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    span {
        color: #0f3934;
    }
`;

const StyledTotalReviewBox = styled.div`
    margin-bottom: 15px;
    display: flex;
    width: 1140px;
    height: 200px;
    border: 0.6px solid #d9d9d9;
    border-radius: 5px;
`;

const StyledHalfBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
`;

const StyledCenter = styled.div`
    margin-top: 20px;
    width: 0.6px;
    height: 160px;
    background-color: #d9d9d9;
`;

const StyledHeartImg = styled.img`
    width: 32px;
    height: 32px;
`;

const StyledEmptyImg = styled.img`
    margin-right: 3px;
    width: 26px;
    height: 26px;
`;

const StyledEvaluationSumText = styled.span`
    margin: 0 0 5px 10px;
    font-size: 34px;
    font-weight: bold;
`;

const ScoreContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
`;

const StyledScoreBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const StyledScoreText = styled.div`
    font-weight: 500;
    font-size: 14px;
    color: #000000;
`;

const StyledScorePercentBar = styled.div`
    margin: 0 8px;
    width: 350px;
    height: 10px;
    background-color: #d9d9d9;
    border-radius: 5px;
`;

const StyledScoreBarColor = styled.div<IStyled>`
    width: ${({ percent }) => `${percent * 100}%`};
    height: 10px;
    background-color: #0f3934;
    border-radius: 5px;
`;

const StyledReviewButton = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 75px;
    background: #0d6637;
    border-radius: 5px;
    font-weight: 700;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
`;
