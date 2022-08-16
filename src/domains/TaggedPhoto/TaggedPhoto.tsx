import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IItemParams } from 'common/types';
import { Avatar } from 'common/components';

const TaggedPhoto: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledTaggedPhotoContainer>
            <StyledImageContainer width={width} height={height} paddingBottom={paddingBottom}>
                <StyledImageBlock
                    onMouseEnter={() => {
                        setImgAnim(ImageScaleUp);
                    }}
                    onMouseLeave={() => {
                        setImgAnim(ImageScaleDown);
                    }}
                >
                    <StyledImg src="/sample2.jpg" width="100%" height="100%" imgAnim={imgAnim} />
                </StyledImageBlock>
            </StyledImageContainer>
            <StyledTagBoxesBlock>
                <StyledTagBox />
                <StyledTagBox />
                <StyledTagBox />
                <StyledTagBox />
            </StyledTagBoxesBlock>
            <StyledDetailsText>
                동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 남산 위에 저 소나무 철갑을 두 른 듯 바람
                서리 불변함 은 우리 기상 일세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전 하세 남산위에 저
                소나무 철갑을 두른듯 바람서리 불변함은 우리
            </StyledDetailsText>
            <StyledBorderLine />
            <StyledUserInfoBlock>
                <StyledProfileBlock>
                    <StyledWriterBlock>
                        <StyeldAvatarBlock>
                            <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                        </StyeldAvatarBlock>
                        <StyledWriterText>taemin</StyledWriterText>
                    </StyledWriterBlock>
                </StyledProfileBlock>
                <StyledFollowButtonBlock>
                    <StyledFollowButton>
                        <StyledFollowText>팔로우 +</StyledFollowText>
                    </StyledFollowButton>
                </StyledFollowButtonBlock>
            </StyledUserInfoBlock>
            <StyledBorderLine />
        </StyledTaggedPhotoContainer>
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

const StyledDetailsText = styled.div`
    font-size: 15px;
    font-weight: 100;
    color: grey;
`;

const StyledTagBoxesBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3% 0% 3% 0%;
`;

const StyledTagBox = styled.div`
    width: 20%;
    padding-bottom: 20%;
    border-radius: 35%;
    border: solid 1px;
    border-color: silver;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledImageBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 5px;
`;

const StyledImageContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    background-color: grey;
    border-radius: 5px;
`;

const StyledTaggedPhotoContainer = styled.div``;

export default TaggedPhoto;
