import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { Avatar } from 'common/components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AlarmcountState } from 'recoil/count';
import Modal from 'react-modal';
import PhotoItemModal from 'common/components/PhotoItemModal';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const MyAlarm: React.FC = () => {
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const navigate = useNavigate();
    interface IAlram {
        alarmContent: string;
        alarmLink: string;
        alarmTime: string;
        alarmCheck: false;
        alarmId: number;
        postPic: string;
        video: boolean;
        accountPic: string;
    }
    const [alarm, setAlarm] = useState<IAlram[]>([]);
    const [alarmCount, setAlarmCount] = useRecoilState(AlarmcountState);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dropdownListRef = useRef<any>(null);

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

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASEURL}/api/alarm/view`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                setAlarm(response.data.value);
                console.log(response.data.value);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    const onCheckAlarm = async (alarmId: number, alarmCheck: boolean, userId: string) => {
        {
            userId ? localStorage.setItem('userId', userId) : console.log('프로필아님');
        }
        if (alarmCheck) {
            console.log('이미 읽은거');
        } else {
            const res = await axios.put(
                `${BASEURL}/api/alarm/view/one/checkClick/${alarmId}
        `,
                {},
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            setAlarmCount(alarmCount - 1);

            if (res.status === 201) console.log(res.data);
        }
    };

    return (
        <StyledAlarmContainer pageAnim={pageAnim}>
            {/* <Modal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
                <div ref={dropdownListRef}>
                    <PhotoItemModal setIsOpenModal={setIsOpenModal} pictureId={item.pictureId} ref={dropdownListRef} />
                </div>
            </Modal> */}
            <div style={{ width: 1140, margin: 'auto' }}>
                <StyledMagazineHeader>내소식</StyledMagazineHeader>
                {alarm.map((item, index) => (
                    <>
                        {item.video === null ? (
                            <StyledAlarmBlock
                                key={index}
                                onClick={() => {
                                    onCheckAlarm(item.alarmId, item.alarmCheck, item.alarmLink.split('/userpage/')[1]);
                                    navigate(`/${item.alarmLink.split('kr/')[1]}`);
                                }}
                                check={item.alarmCheck}
                            >
                                <div style={{ width: 60, marginRight: 19 }}>
                                    <Avatar
                                        width="100%"
                                        paddingBottom="100%"
                                        borderRadius="100%"
                                        picUrl={item.accountPic}
                                    />
                                </div>
                                <div style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                    <StyledUserNickname>{item.alarmContent}</StyledUserNickname>
                                    <StyledUserInfo>{item.alarmTime}</StyledUserInfo>
                                </div>
                                <div style={{ height: 100 }}>
                                    {item.postPic && <StyledThumbnail src={item.postPic} />}
                                </div>
                            </StyledAlarmBlock>
                        ) : (
                            <StyledAlarmBlock
                                key={index}
                                onClick={() => {
                                    onCheckAlarm(item.alarmId, item.alarmCheck, item.alarmLink.split('/userpage/')[1]);
                                    navigate(`/${item.alarmLink.split('kr/')[1]}`);
                                }}
                                check={item.alarmCheck}
                            >
                                <div style={{ width: 60, marginRight: 19 }}>
                                    <Avatar
                                        width="100%"
                                        paddingBottom="100%"
                                        borderRadius="100%"
                                        picUrl={item.accountPic}
                                    />
                                </div>
                                <div style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                    <StyledUserNickname>{item.alarmContent}</StyledUserNickname>
                                    <StyledUserInfo>{item.alarmTime}</StyledUserInfo>
                                </div>
                                <div style={{ height: 100 }}>
                                    {item.postPic && <StyledThumbnailVideo src={item.postPic} />}
                                </div>
                            </StyledAlarmBlock>
                        )}
                    </>

                    /*  <StyledAlarmBlock
                        key={index}
                        onClick={() => {
                            onCheckAlarm(item.alarmId, item.alarmCheck, item.alarmLink.split('/userpage/')[1]);
                            navigate(`/${item.alarmLink.split('kr/')[1]}`);
                        }}
                        check={item.alarmCheck}
                    >
                        <div style={{ width: 60, marginRight: 19 }}>
                            <Avatar width="100%" paddingBottom="100%" borderRadius="100%" picUrl={item.accountPic} />
                        </div>
                        <div style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                            <StyledUserNickname>{item.alarmContent}</StyledUserNickname>
                            <StyledUserInfo>{item.alarmTime}</StyledUserInfo>
                        </div>
                        <div>
                            {item.video ? (
                                <StyledThumbnailVideo src={item.postPic} />
                            ) : (
                                <StyledThumbnail src={item.postPic} />
                            )}
                        </div>
                    </StyledAlarmBlock> */
                ))}
            </div>
        </StyledAlarmContainer>
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

const StyledThumbnail = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
`;

const StyledThumbnailVideo = styled.video`
    width: 100px;
    height: 100px;
    object-fit: cover;
`;

const StyledAlarmContainer = styled.div<{ pageAnim: any }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
    margin-bottom: 120px;
`;

const StyledMagazineHeader = styled.div`
    display: flex;
    font-size: 30px;
    font-weight: bold;
    color: #272727;
    margin-top: 30px;
    margin-bottom: 50px;
`;

const StyledAlarmBlock = styled.div<{ check: boolean }>`
    display: flex;
    padding-bottom: 15px;
    padding-top: 15px;
    padding-left: 15px;
    align-items: center;
    border-bottom: 1px solid #ececec;
    background-color: ${({ check }) => (check ? 'white' : '#e7f5ee;')};
    cursor: pointer;
`;

const StyledUserNickname = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #272727;
    margin-bottom: 4px;
`;

const StyledUserInfo = styled.div`
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #424242;
`;

export default MyAlarm;
