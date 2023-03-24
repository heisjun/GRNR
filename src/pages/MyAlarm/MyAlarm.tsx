import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { Avatar } from 'common/components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AlarmcountState } from 'recoil/count';
import { useInView } from 'react-intersection-observer';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const MyAlarm: React.FC = () => {
    const [observerRef, observerInview] = useInView();
    const [size, setSize] = useState<number>(12);
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const navigate = useNavigate();
    interface IAlram {
        alarmContent: string;
        alarmLink: string;
        time: string;
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

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASEURL}/api/alarm/view`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                params: {
                    page: 0,
                    size: size,
                },
            });
            setAlarm(response.data.value.content);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (observerInview) {
            setSize((prev) => prev + 12);
            fetchData();
        }
    }, [observerInview]);

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
            <div style={{ justifyContent: 'center', alignContent: 'center' }}>
                <StyledMagazineHeader>내소식</StyledMagazineHeader>
                {alarm.length === 0 ? (
                    <StyledAlarmInfo>최근 내 소식이 없습니다.</StyledAlarmInfo>
                ) : (
                    <>
                        {alarm.map((item, index) => (
                            <>
                                {item.video === null ? (
                                    <StyledAlarmBlock
                                        key={index}
                                        onClick={() => {
                                            onCheckAlarm(
                                                item.alarmId,
                                                item.alarmCheck,
                                                item.alarmLink.split('/userpage/')[1],
                                            );
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
                                            <StyledUserNickname>
                                                <span>{item.alarmContent.split('님이')[0]}</span>
                                                님이{item.alarmContent.split('님이')[1]}
                                            </StyledUserNickname>
                                            <StyledUserInfo>{item.time}</StyledUserInfo>
                                        </div>
                                        <div style={{ height: 90 }}>
                                            {item.postPic && <StyledThumbnail src={item.postPic} />}
                                        </div>
                                    </StyledAlarmBlock>
                                ) : (
                                    <StyledAlarmBlock
                                        key={index}
                                        onClick={() => {
                                            onCheckAlarm(
                                                item.alarmId,
                                                item.alarmCheck,
                                                item.alarmLink.split('/userpage/')[1],
                                            );
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
                                            <StyledUserNickname>
                                                <span>{item.alarmContent.split('님이')[0]}</span>
                                                님이{item.alarmContent.split('님이')[1]}
                                            </StyledUserNickname>
                                            <StyledUserInfo>{item.time}</StyledUserInfo>
                                        </div>
                                        <div style={{ height: 90 }}>
                                            {item.postPic && <StyledThumbnailVideo src={item.postPic} />}
                                        </div>
                                    </StyledAlarmBlock>
                                )}

                                <div ref={observerRef} />
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
                    </>
                )}
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

const StyledAlarmInfo = styled.div`
    display: flex;
    box-sizing: border-box;
    padding-bottom: 42px;
    padding-top: 43px;
    font-size: 20px;
    margin-bottom: 9px;
    width: 720px;
    height: 600px;
    cursor: pointer;
`;

const StyledThumbnail = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    margin-right: 40px;
`;

const StyledThumbnailVideo = styled.video`
    width: 90px;
    height: 90px;
    object-fit: cover;
    margin-right: 40px;
`;

const StyledAlarmContainer = styled.div<{ pageAnim: any }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
    padding-bottom: 120px;
    background-color: #f5f5f5;
`;

const StyledMagazineHeader = styled.div`
    display: flex;
    font-size: 30px;
    font-weight: bold;
    color: #272727;
    margin-top: 40px;
    margin-bottom: 20px;
`;

const StyledAlarmBlock = styled.div<{ check: boolean }>`
    display: flex;
    box-sizing: border-box;
    padding-bottom: 42px;
    padding-top: 43px;
    padding-left: 40px;
    align-items: center;
    background-color: ${({ check }) => (check ? 'white' : '#e7f5ee')};
    border: ${({ check }) => (check ? 'solid 1px #dbdbdb' : 'solid 2px #0d6637')};
    margin-bottom: 9px;
    width: 720px;
    height: 145px;
    cursor: pointer;
`;

const StyledUserNickname = styled.div`
    font-size: 18px;
    font-weight: normal;
    color: #272727;
    margin-bottom: 4px;
    span {
        color: #0d6637;
        font-weight: bold;
        font-style: italic;
        margin-right: 2px;
    }
`;

const StyledUserInfo = styled.div`
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #818181;
    margin-top: 8px;
`;

export default MyAlarm;
