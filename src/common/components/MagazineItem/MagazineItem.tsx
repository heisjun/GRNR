import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { IMagazineItemParams } from 'common/types';
import Avatar from '../Avatar';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const MagazineItem: React.FC<IMagazineItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;
    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledMagazineItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Link to={`./details/${item.magazineId}`} style={{ textDecoration: 'none' }}>
                <StyledImageBlock
                    onMouseEnter={() => {
                        setImgAnim(ImageScaleUp);
                    }}
                    onMouseLeave={() => {
                        setImgAnim(ImageScaleDown);
                    }}
                >
                    <StyledImg src={'/sample2.jpg'} width="100%" height="100%" imgAnim={imgAnim} />
                </StyledImageBlock>
            </Link>

            <StyledTitleBlock>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StyledNickname>Leanne Simpson</StyledNickname>
                    <StyledBorder />
                    <StyledDate>2022.08.08</StyledDate>
                </div>
                <StyledTitleText>아레카야자를 곁들인 화이트 우드톤 홈 플랜트 디자인</StyledTitleText>
            </StyledTitleBlock>
            <StyledAvatarBlock>
                <Avatar width="100%" height="100%" borderRadius="100%" />
            </StyledAvatarBlock>
        </StyledMagazineItemContainer>
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

const StyledAvatarBlock = styled.div`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 70%;
    right: 5%;
    z-index: 30;
`;

const StyledBorder = styled.div`
    width: 1px;
    height: 16px;
    margin: 0px 20px;
    background-color: #ececec;
`;
const StyledNickname = styled.div`
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #5d5d5d;
`;

const StyledDate = styled.div`
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #9d9d9d;
`;
const StyledTitleText = styled.div`
    margin: 10px 20px 0 0;
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
`;

const StyledTitleBlock = styled.div`
    position: absolute;
    top: 84%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 10%;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    object-fit: cover;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledImageBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 366px;
    height: 222px;
    @media screen and (min-width: ${maxWidth}px) {
        width: 366px;
        height: 222px;
    }
`;

const StyledMagazineItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};

    @media screen and (min-width: ${maxWidth}px) {
        width: 366px;
    }
`;

export default MagazineItem;
