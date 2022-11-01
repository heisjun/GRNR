import styled from 'styled-components';
import { useState, useEffect, SetStateAction, useCallback, useRef } from 'react';
import { AgreeBox } from 'domains';
import KeywordBox from 'common/components/KeywordBox';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { default as callApi } from 'common/api';
import { getDebouncedFunc } from 'common/funcs';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;
const TOKEN = localStorage.getItem('accesstoken');

const KeywordData = [
    {
        id: 1,
        tagName: '키워드1',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 2,
        tagName: '키워드2',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 3,
        tagName: '키워드3',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 4,
        tagName: '키워드4',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 5,
        tagName: '키워드5',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 6,
        tagName: '키워드6',
        keyword: '#키워드 #키워드 #키워드',
    },
];

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [allAgree, setAllAgree] = useState<boolean>(false);
    const [ageAgree, setAgeAgree] = useState<boolean>(false);
    const [serviceAgree, setServiceAgree] = useState<boolean>(false);
    const [privateAgree, setPrivateAgree] = useState<boolean>(false);
    const [adAgree, setAdAgree] = useState<boolean>(false);
    const [getkeyword, setGetKeyword] = useState();
    const [disabledToggle, setDisabledToggle] = useState<boolean>(false);
    const [addressData, setAddressData] = useState<[]>([]);
    const [error, setError] = useState<string>('');
    const [check, setCheck] = useState();
    const [inputs, setInputs] = useState({
        nickname: '',
        detailAddress: '',
    });
    const { nickname, detailAddress } = inputs;
    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);
    const dropdownListRef = useRef<any>(null);

    const CheckNickname = async () => {
        try {
            const response = await axios.get(
                `https://www.gardenersclub.co.kr/api/api/login/nickName/duplicate?nickName=${inputs.nickname}`,
            );
            setCheck(response.data.value);
            console.log(response.data.value);
        } catch (e) {
            console.log(e);
        }
    };

    const handleClick = async () => {
        CheckNickname();
        const dataToSend = {
            address: `${inputs.detailAddress}`,
            nickName: inputs.nickname,
            tos: 'yes',
        };
        if (!dataToSend.nickName) {
            setError('닉네임을 입력하세요');
            return;
        } else if (check === '다른 유저가 사용하는 닉네임입니다. 다른 닉네임으로 만들어주세요') {
            setError('이미 사용중인 닉네임입니다. 다른 닉네임으로 만들어주세요');
            return;
        } else if (!inputs.detailAddress) {
            setError('주소를 입력하세요');
            return;
        } else if (!ageAgree || !serviceAgree || !privateAgree) {
            setError('약관에 동의해주세요');
            return;
        } else {
            setError('');
        }
        const addRegisterDto = JSON.stringify(dataToSend);
        console.log(addRegisterDto);

        const body = {
            address: `${inputs.detailAddress}`,
            nickName: inputs.nickname,
            tos: 'yes',
        };

        const res = await axios.put(`https://www.gardenersclub.co.kr/api/api/register`, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        setLoginStatus({ ...loginStatus, isLogin: true });
        window.location.replace('/');

        if (res.status === 201) console.log(res.data);
    };

    const handleInput = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setDisabledToggle(false);
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const allHandleChange = () => {
        if (allAgree) {
            setAllAgree(false);
            setAgeAgree(false);
            setServiceAgree(false);
            setPrivateAgree(false);
            setAdAgree(false);
        } else {
            setAllAgree(true);
            setAgeAgree(true);
            setServiceAgree(true);
            setPrivateAgree(true);
            setAdAgree(true);
        }
    };

    const handleChange = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        setState((state) => !state);
    };

    const onClickAddressItem = (address: string) => {
        setInputs({
            ...inputs,
            detailAddress: address,
        });
        setDisabledToggle(true);
    };

    const loadAddressData = async (address: string) => {
        try {
            const { data } = await callApi.searchAddress(address);
            setAddressData(data.value.content);
        } catch (e) {
            console.log(e);
        }
    };

    const dloadClassData = useCallback(getDebouncedFunc(loadAddressData, 500), []); // 자동완성값 디바운싱 함수

    useEffect(() => {
        if (inputs.detailAddress !== '') {
            dloadClassData(inputs.detailAddress); // 검색값이 있으면 자동완성값 로딩
        } else {
            setAddressData([]);
        }
    }, [inputs.detailAddress]);

    useEffect(() => {
        ageAgree && serviceAgree && privateAgree && adAgree ? setAllAgree(true) : setAllAgree(false);
    }, [ageAgree, serviceAgree, privateAgree, adAgree]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (dropdownListRef.current && !dropdownListRef.current.contains(e.target as Node)) {
                setDisabledToggle(true);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownListRef]);

    return (
        <StyledRegisterContainer>
            <StyledTitleText>추가 정보 입력</StyledTitleText>
            <StyledRegisterBlock>
                <StyledTitleText>닉네임</StyledTitleText>

                <StyledBodyText>다른 사용자와 겹치지 않는 닉네임을 입력해주세요</StyledBodyText>
                <StyledInput
                    placeholder="영어 밑줄 온점 외 입력 불가"
                    type="text"
                    name="nickname"
                    value={nickname}
                    onChange={handleInput}
                />
            </StyledRegisterBlock>
            <StyledRegisterBlock>
                <StyledTitleText>약관동의</StyledTitleText>
                <StyledAgreeBox>
                    <AgreeBox
                        allAgree={allAgree}
                        allHandleChange={allHandleChange}
                        ageAgree={ageAgree}
                        setAgeAgree={setAgeAgree}
                        serviceAgree={serviceAgree}
                        setServiceAgree={setServiceAgree}
                        privateAgree={privateAgree}
                        setPrivateAgree={setPrivateAgree}
                        adAgree={adAgree}
                        setAdAgree={setAdAgree}
                        handleChange={handleChange}
                    />
                </StyledAgreeBox>
            </StyledRegisterBlock>
            <div style={{ marginTop: '5%', paddingBottom: 10 }}>
                <StyledTitleText>주소</StyledTitleText>
                {/* <AddressBox setGetAddress={setGetAddress} /> */}
                <StyledInput
                    placeholder="주소를 입력하세요"
                    type="text"
                    name="detailAddress"
                    value={detailAddress}
                    onChange={handleInput}
                />
            </div>
            {!disabledToggle && (
                <div ref={dropdownListRef}>
                    <div style={{ height: 'auto', overflow: 'auto', fontSize: '1vw', paddingLeft: 5, maxHeight: 100 }}>
                        {addressData &&
                            addressData.map((item: any, index: number) => {
                                return (
                                    <div onClick={() => onClickAddressItem(item.home)} key={index}>
                                        {item.home}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}

            <StyledRegisterBlock>
                <StyledTitleText>관심사</StyledTitleText>
                <StyledBodyText>관심있는 키워드를 설정해주세요</StyledBodyText>
                <KeywordBox data={KeywordData} setGetKeyword={setGetKeyword} columns={2} gap={5} />
            </StyledRegisterBlock>
            <StyledRegisterBlock>
                <StyledErrorMessage>{error}</StyledErrorMessage>
                <StyledButton onClick={handleClick}>가입하기</StyledButton>
            </StyledRegisterBlock>
        </StyledRegisterContainer>
    );
};

const StyledRegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20%;
    margin-right: 20%;
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-left: 10%;
        margin-right: 10%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        margin-left: 270px;
        margin-right: 270px;
    }
`;

const StyledRegisterBlock = styled.div`
    margin-top: 5%;
    margin-bottom: 5%;
`;

const StyledTitleText = styled.div`
    font-size: 1.5vw;
    color: grey;
    font-weight: bold;
    margin-bottom: 1%;
    margin-top: 1%;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 3vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 15px;
    }
`;

const StyledNormalText = styled.div`
    font-size: 1.4vw;
    color: grey;
    padding: 5px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 2.8vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 16px;
    }
`;
const StyledInput = styled.input`
    width: 97%;
    font-size: 1.3vw;
    padding: 5px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 2.5vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 15px;
    }
`;

const StyledSelector = styled.select`
    width: 100%;
    font-size: 1.3vw;
    color: grey;
    padding: 5px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 2.5vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 15px;
    }
`;

const StyledBodyText = styled.div`
    font-size: 1.3vw;
    color: grey;
    margin-bottom: 1%;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 2.5vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 15px;
    }
`;

const StyledEmailInput = styled.div`
    display: flex;
`;

const StyledAgreeBox = styled.div`
    border: 1px solid grey;
    width: 100%;
`;

const StyledButton = styled.button`
    width: 100%;
    font-size: 1.7vw;
    background-color: grey;
    color: white;
    font-weight: 500;
    border: none;
    padding: 3%;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 3vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 15px;
    }
`;

const StyledErrorMessage = styled.div`
    color: red;
    font-size: 15px;
    margin-bottom: 2px;
    height: 20px;
`;

export default Register;
