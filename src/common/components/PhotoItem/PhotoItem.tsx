import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { IPhotoItemParams } from 'common/types';
import { Avatar } from 'common/components';

const PhotoItem: React.FC<IPhotoItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <>
            <StyledPhotoItemContainer width={width} height={height} paddingBottom={paddingBottom}>
                <StyledHeaderBlock>
                    <StyledWriterBlock>
                        <StyeldAvatarBlock>
                            <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                        </StyeldAvatarBlock>
                        <StyledWriterText>{item.accountNickName}</StyledWriterText>
                    </StyledWriterBlock>
                    <StyledFollowButton>
                        <StyledFollowText>팔로우+</StyledFollowText>
                    </StyledFollowButton>
                </StyledHeaderBlock>
                <Link to={`./details/${item.pictureId}`} style={{ textDecoration: 'none' }}>
                    <StyledPhotoBlock
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
                    </StyledPhotoBlock>
                </Link>
                <StyledFooterBlock>
                    <StyledDetailsBlock>
                        <StyledDetailsText>{item.pictureContentDtoList[0].explain}</StyledDetailsText>
                    </StyledDetailsBlock>
                    <StyledButtonsBlock>
                        <StyledLikeButton src={`${process.env.REACT_APP_BASE_SRC}/like.png`} />
                        <StyledLikeButton src={`${process.env.REACT_APP_BASE_SRC}/comment.png`} />
                        <StyledLikeButton src={`${process.env.REACT_APP_BASE_SRC}/scrap.png`} />
                    </StyledButtonsBlock>
                </StyledFooterBlock>
            </StyledPhotoItemContainer>
        </>
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

const StyledLikeButton = styled.img`
    cursor: pointer;
    margin: 0 auto;
`;

const StyeldAvatarBlock = styled.div`
    width: 15%;
`;

const StyledWriterText = styled.div`
    margin-left: 5%;
    font-size: 13px;
    font-weight: bold;
    color: grey;
`;

const StyledFollowText = styled.div`
    font-size: 10px;
    color: grey;
`;

const StyledFollowButton = styled.div`
    width: 22%;
    height: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px;
    border-radius: 15px;
    border-color: grey;
    cursor: pointer;
    &:hover {
        background-color: silver;
    }
`;

const StyledWriterBlock = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const StyledHeaderBlock = styled.div`
    position: absolute;
    height: 15%;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
`;

const StyledDetailsText = styled.div`
    font-size: 11px;
    font-weight: 500;
    color: grey;
    padding-top: 5%;
`;

const StyledDetailsBlock = styled.div`
    width: 100%;
    height: 55%;
`;

const StyledButtonsBlock = styled.div`
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledPhotoBlock = styled.div`
    position: absolute;
    top: 15%;
    width: 100%;
    height: 65%;
    background-color: silver;
    overflow: hidden;
`;

const StyledFooterBlock = styled.div`
    position: absolute;
    top: 75%;
    height: 25%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`;

const StyledPhotoItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

export default PhotoItem;
