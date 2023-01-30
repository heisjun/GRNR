import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { IMyfeedItemParams } from 'common/types';
import Modal from 'react-modal';
import PhotoItemModal from '../PhotoItemModal';

const UserfeedItem: React.FC<IMyfeedItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dropdownListRef = useRef<any>(null);

    const [imgAnim, setImgAnim] = useState<any>();

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (dropdownListRef.current && !dropdownListRef.current.contains(e.target as Node)) {
                setIsOpenModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownListRef]);

    return (
        <StyledTodaysPhotoContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Modal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
                <div ref={dropdownListRef}>
                    <PhotoItemModal setIsOpenModal={setIsOpenModal} pictureId={item.pictureId} ref={dropdownListRef} />
                </div>
            </Modal>
            <Link to={`/community/photo/details/${item.pictureId}`} style={{ textDecoration: 'none' }}>
                <StyledImgBlock
                    onMouseEnter={() => {
                        setImgAnim(ImageScaleUp);
                    }}
                    onMouseLeave={() => {
                        setImgAnim(ImageScaleDown);
                    }}
                >
                    {item.video ? (
                        <StyledVideo src={item.pictureUrl} width="100%" height="100%" />
                    ) : (
                        <StyledImg src={item.pictureUrl} width="100%" height="100%" imgAnim={imgAnim} />
                    )}
                </StyledImgBlock>
                <StyledStatsBlock>
                    <StyledStatBlock>
                        <StyledLikeButton src={'/btnBlankHeart.png'} />
                        <StyledCountText>{item.likeCount}</StyledCountText>
                    </StyledStatBlock>
                    <StyledStatBlock>
                        <StyledLikeButton src={'/btnComment.png'} />
                        <StyledCountText>{item.commentCount}</StyledCountText>
                    </StyledStatBlock>
                    <StyledStatBlock>
                        <StyledLikeButton src={'/btnBlankBookmark.png'} />
                        <StyledCountText>{item.scrapCount}</StyledCountText>
                    </StyledStatBlock>
                </StyledStatsBlock>
            </Link>
        </StyledTodaysPhotoContainer>
    );
};

const customStyles = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '100px',
        width: '1140px',
        height: '750px',
        padding: '0',
        overflow: 'hidden',
        borderRadius: '0px',
    },
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

const StyledCountText = styled.div`
    font-size: 14px;
    margin-left: 8px;
    color: #4d4d4d;
`;

const StyledLikeButton = styled.img`
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

const StyledStatBlock = styled.div`
    display: flex;
    align-items: center;
`;

const StyledStatsBlock = styled.div`
    position: absolute;
    top: 184px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 56px;
    background-color: white;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    object-fit: cover;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledVideo = styled.video`
    cursor: pointer;
    object-fit: cover;
`;

const StyledImgBlock = styled.div`
    overflow: hidden;
    width: 184px;
    height: 184px;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.06);
`;

const StyledTodaysPhotoContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: 184px;
    height: 240px;
`;

export default UserfeedItem;
