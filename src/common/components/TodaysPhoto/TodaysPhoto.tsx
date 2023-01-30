import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { ITodaysPhotoParams } from 'common/types';
import { Avatar } from 'common/components';

const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH);
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const TodaysPhoto: React.FC<ITodaysPhotoParams> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [hover, setHover] = useState<boolean>(false);

    return (
        <StyledTodaysPhotoContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Link to={`/community/photo/details/${item.pictureId}`} style={{ textDecoration: 'none' }}>
                <StyledImgBlock
                    onMouseEnter={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    {hover && (
                        <StyledHoverBackgrouond>
                            <StyledProfileBlock>
                                <StyledAvatarBlock>
                                    <Avatar
                                        width="100%"
                                        paddingBottom="100%"
                                        borderRadius="100%"
                                        picUrl={item.accountProfileUrl}
                                    />
                                </StyledAvatarBlock>
                                <StyledNicknameBlock>{item.accountNickName}</StyledNicknameBlock>
                            </StyledProfileBlock>
                            <StyledBorderLine />
                            <StyledDetailsText>{item.firstContent.explain}</StyledDetailsText>
                        </StyledHoverBackgrouond>
                    )}
                    {item.firstContent.video ? (
                        <StyledVideo src={item.firstContent.pictureUrl} width="100%" height="100%" />
                    ) : (
                        <StyledImg src={item.firstContent.pictureUrl} width="100%" height="100%" />
                    )}
                </StyledImgBlock>
            </Link>
        </StyledTodaysPhotoContainer>
    );
};

const StyledImg = styled.img`
    cursor: pointer;
    object-fit: cover;
`;

const StyledVideo = styled.video`
    cursor: pointer;
    object-fit: cover;
`;

const StyledImgBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const StyledTodaysPhotoContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    @media screen and (min-width: ${maxWidth}px) {
        width: 270px;
        height: 260px;
        padding-bottom: 0;
    }
`;

const StyledBorderLine = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 16px;
    border-bottom: solid 1px;
    border-color: #ececec;
    opacity: 0.34;
`;
const StyledHoverBackgrouond = styled.div`
    background-color: rgb(0, 0, 0, 0.45);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const StyledProfileBlock = styled.div`
    display: flex;
    padding: 10px;
    margin-top: 55%;
    align-items: center;
`;
const StyledAvatarBlock = styled.div`
    width: 36px;
    position: relative;
    z-index: 20;
    padding-right: 10px;
`;

const StyledNicknameBlock = styled.div`
    color: white;
    font-size: 14px;
    font-weight: 500;
`;

const StyledDetailsText = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: white;
    padding-left: 10px;
`;

export default TodaysPhoto;
