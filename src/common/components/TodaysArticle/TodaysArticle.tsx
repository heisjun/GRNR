import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { IItemParams } from 'common/types';
import { Avatar } from 'common/components';

const TodaysArticle: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledTodaysArticleContainer width={width}>
            <StyledArticleItemBlock height={height} paddingBottom={paddingBottom}>
                <Link to="community/magazine/details" style={{ textDecoration: 'none' }}>
                    <StyledImgBlock
                        onMouseEnter={() => {
                            setImgAnim(ImageScaleUp);
                        }}
                        onMouseLeave={() => {
                            setImgAnim(ImageScaleDown);
                        }}
                    >
                        <StyledImg
                            src={`${process.env.REACT_APP_BASE_SRC}/sample2.jpg`}
                            width="100%"
                            height="100%"
                            imgAnim={imgAnim}
                        />
                    </StyledImgBlock>
                </Link>
            </StyledArticleItemBlock>
            <StyledSummaryContainer>
                <StyledTitleBlock>식물이 주는 영감을 통해 작업합니다.</StyledTitleBlock>
                <StyledWriterBlock>
                    <StyeldAvatarBlock>
                        <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                    </StyeldAvatarBlock>
                    <StyledWriterText>gardener</StyledWriterText>
                </StyledWriterBlock>
            </StyledSummaryContainer>
        </StyledTodaysArticleContainer>
    );
};

const ImageScaleUp = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.1);
    }
`;

const ImageScaleDown = keyframes`
    0% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

const StyeldAvatarBlock = styled.div`
    width: 9%;
`;

const StyledWriterText = styled.div`
    margin-left: 2%;
    font-size: 13px;
    color: grey;
`;

const StyledWriterBlock = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2px;
`;

const StyledTitleBlock = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: grey;
`;

const StyledSummaryContainer = styled.div`
    margin-top: 10px;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    object-fit: cover;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledImgBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const StyledArticleItemBlock = styled.div<{ height?: string; paddingBottom?: string }>`
    position: relative;
    width: 100%;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

const StyledTodaysArticleContainer = styled.div<{ width: string }>`
    width: ${({ width }) => width};
`;

export default TodaysArticle;
