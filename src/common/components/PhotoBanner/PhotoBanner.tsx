import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { IPhotoBanner } from './PhotoBanner.type';
import Modal from 'react-modal';
import PhotoItemModal from '../PhotoItemModal';

const PhotoBanner: React.FC<IPhotoBanner> = (props) => {
    const { data } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [pictureId, setPictureId] = useState(0);
    const dropdownListRef = useRef<any>(null);

    const navigate = useNavigate();

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
        <div>
            {data && (
                <Modal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
                    <div ref={dropdownListRef}>
                        <PhotoItemModal setIsOpenModal={setIsOpenModal} pictureId={pictureId} ref={dropdownListRef} />
                    </div>
                </Modal>
            )}
            {data && (
                <div style={{ width: '100%', height: 500, display: 'flex' }}>
                    {data[0].video ? (
                        <StyledVideo1
                            src={data[0].pictureContentUrl}
                            onClick={() => {
                                setIsOpenModal(true);
                                setPictureId(data[0].pictureId);
                            }}
                        />
                    ) : (
                        <StyledImg1
                            src={data[0].pictureContentUrl}
                            onClick={() => {
                                setIsOpenModal(true);
                                setPictureId(data[0].pictureId);
                            }}
                        />
                    )}
                    <StyledFirstBlock>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <StyledAvatarBlock>
                                <Avatar
                                    width="100%"
                                    borderRadius="100%"
                                    height="100%"
                                    picUrl={data[0].accountProfileUrl}
                                />
                            </StyledAvatarBlock>
                            <StyledNickname>{data[0].accountNickName}</StyledNickname>
                        </div>

                        <StyledContent>{data[0].pictureContentExplain}</StyledContent>
                    </StyledFirstBlock>

                    <div
                        style={{
                            width: 356,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        {data[1].video ? (
                            <StyledVideo2 src={data[1].pictureContentUrl} />
                        ) : (
                            <StyledImg2 src={data[1].pictureContentUrl} />
                        )}
                        <StyledSecondBlock
                            onClick={() => {
                                setIsOpenModal(true);
                                setPictureId(data[1].pictureId);
                            }}
                        >
                            <StyledSecondContent>{data[1].pictureContentExplain}</StyledSecondContent>
                        </StyledSecondBlock>

                        {data[2].video ? (
                            <StyledVideo3 src={data[2].pictureContentUrl} />
                        ) : (
                            <StyledImg3 src={data[2].pictureContentUrl} />
                        )}
                        <StyledThirdBlock
                            onClick={() => {
                                setIsOpenModal(true);
                                setPictureId(data[2].pictureId);
                            }}
                        >
                            <StyledSecondContent>{data[2].pictureContentExplain}</StyledSecondContent>
                        </StyledThirdBlock>
                    </div>
                </div>
            )}
        </div>
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

const StyledFirstBlock = styled.div`
    width: 451px;
    height: 189px;
    margin-top: 312px;
    background-color: white;
    padding: 30px 0 0 20px;
    box-sizing: border-box;
    position: absolute;
    cursor: pointer;
    z-index: 1;
`;

const StyledVideo1 = styled.video`
    width: 764px;
    height: 500px;
    background-color: gray;
    margin-right: 20px;
    object-fit: cover;
    cursor: pointer;
    position: relative;
`;

const StyledImg1 = styled.img`
    width: 764px;
    height: 500px;
    background-color: gray;
    margin-right: 20px;
    object-fit: cover;
    cursor: pointer;
    position: relative;
`;
const StyledVideo2 = styled.video`
    width: '100%';
    height: 240px;
    object-fit: cover;
    position: relative;
    z-index: 0;
`;

const StyledImg2 = styled.img`
    width: '100%';
    height: 240px;
    object-fit: cover;
    position: relative;
    z-index: 0;
`;

const StyledVideo3 = styled.video`
    width: '100%';
    height: 240px;
    object-fit: cover;
    position: relative;
    z-index: 0;
`;

const StyledImg3 = styled.img`
    width: '100%';
    height: 240px;
    object-fit: cover;
    position: relative;
    z-index: 0;
`;

const StyledSecondBlock = styled.div`
    position: absolute;
    width: 356px;
    height: 240px;
    background-color: rgb(0, 0, 0, 0.45);
    cursor: pointer;
    z-index: 10;
`;

const StyledThirdBlock = styled.div`
    position: absolute;
    top: 430px;
    width: 356px;
    height: 240px;
    background-color: rgb(0, 0, 0, 0.45);
    cursor: pointer;
    z-index: 10;
`;

const StyledAvatarBlock = styled.div`
    width: 30px;
    height: 30px;
`;
const StyledNickname = styled.div`
    margin: 0px 0 0 10px;
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #5d5d5d;
`;

const StyledContent = styled.div`
    margin: 16px 0 0;
    font-family: NotoSansKR;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #000;
`;

const StyledSecondContent = styled.div`
    font-family: NotoSansKR;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: white;
    padding: 160px 16px 20px;
`;
export default PhotoBanner;
