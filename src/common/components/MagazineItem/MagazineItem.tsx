import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { IItemParams } from 'common/types';

const MagazineItem: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledMagazineItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Link to="./details" style={{ textDecoration: 'none' }}>
                <StyledImageBlock
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
                </StyledImageBlock>
            </Link>
            <StyledTitleBlock>
                <StyledTitleText>아레카야자를 곁들인 화이트 우드톤 홈 플랜트 디자인</StyledTitleText>
            </StyledTitleBlock>
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

const StyledTitleText = styled.div`
    color: grey;
    font-size: 13px;
    margin-left: 2%;
`;

const StyledTitleBlock = styled.div`
    position: absolute;
    top: 90%;
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    background-color: white;
    border-radius: 0px 0px 5px 5px;
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
    width: 100%;
    height: 100%;
`;

const StyledMagazineItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border: solid 1.5px;
    border-radius: 5px;
    border-color: grey;
    background-color: silver;
`;

export default MagazineItem;
