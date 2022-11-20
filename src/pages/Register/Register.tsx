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
const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH);

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [allAgree, setAllAgree] = useState<boolean>(false);
    const [ageAgree, setAgeAgree] = useState<boolean>(false);
    const [serviceAgree, setServiceAgree] = useState<boolean>(false);
    const [privateAgree, setPrivateAgree] = useState<boolean>(false);
    const [adAgree, setAdAgree] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [disabledToggle, setDisabledToggle] = useState<boolean>(true);
    const [addressData, setAddressData] = useState<[]>([]);
    const [error, setError] = useState<string>('');
    const [userInfo, setUserInfo] = useState('');
    const [nickError, setNickError] = useState(false);
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
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            setCheck(response.data.value);
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
        } else if (nickError) {
            setError('닉네임을 확인해주세요');
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

        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    //비밀번호 유효성 검사
    const checkPassword = (e: any) => {
        const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const regExp2 = /[~!@#$%^&*()+|<>?:{}]/;
        if (regExp.test(e.target.value) || regExp2.test(e.target.value)) {
            setUserInfo('닉네임을 확인해 주세요');
            setNickError(true);
        } else {
            setUserInfo('');
            setNickError(false);
        }
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
            const { data } = await axios.get(`${BASEURL}/api/address/view?home=${address}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            setAddressData(data.value.content);
            setDisabledToggle(false);
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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <StyledRegisterContainer>
                <StyledContentText>추가 정보 입력</StyledContentText>
                <StyledBorderLine />
                <StyledRegisterBlock>
                    <StyledTitleText>닉네임</StyledTitleText>
                    <StyledInput
                        placeholder="닉네임을 입력해주세요(영어, 숫자, 밑줄, 점으로 구성됩니다)"
                        type="text"
                        name="nickname"
                        value={nickname}
                        onChange={handleInput}
                        onBlur={checkPassword}
                        error={nickError}
                    />
                    <StyledErrorMessage>{userInfo}</StyledErrorMessage>
                </StyledRegisterBlock>

                <div style={{ marginTop: '5%', paddingBottom: 10 }}>
                    <StyledTitleText>주소</StyledTitleText>
                    <StyledInput
                        placeholder="시,군,구,동 입력"
                        type="text"
                        name="detailAddress"
                        value={detailAddress}
                        onChange={handleInput}
                        error={false}
                    />
                </div>
                {!disabledToggle && (
                    <div ref={dropdownListRef}>
                        <div
                            style={{
                                height: 100,
                                overflow: 'auto',
                                fontSize: '1vw',
                                paddingLeft: 5,
                                maxHeight: 100,
                            }}
                        >
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
                    <StyledTitleText>관심사(중복선택 가능)</StyledTitleText>
                    {/*  <KeywordBox data={KeywordData} setGetKeyword={setGetKeyword} columns={2} gap={5} /> */}
                    <StyledBorderLine />
                </StyledRegisterBlock>
                <StyledRegisterBlock>
                    <StyledTitleText>이용약관</StyledTitleText>
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
                <StyledRegisterBlock>
                    <StyledErrorMessage>{error}</StyledErrorMessage>
                    <StyledButton onClick={handleClick}>가입하기</StyledButton>
                </StyledRegisterBlock>
            </StyledRegisterContainer>
        </div>
    );
};

const StyledRegisterContainer = styled.div`
    width: 420px;
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 50px;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

const StyledRegisterBlock = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const StyledTitleText = styled.div`
    font-size: 16px;
    color: #545a5e;
    font-weight: bold;
    margin-bottom: 10px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 3vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 16px;
    }
`;

const StyledContentText = styled.div`
    text-align: center;
    font-size: 28px;
    color: black;
    font-weight: bold;
    padding-top: 40px;
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 28px;
    }
`;

const StyledInput = styled.input<{ error: boolean }>`
    width: 100%;
    font-size: 14px;
    padding-left: 15px;
    box-sizing: border-box;
    height: 50px;
    ${(props) =>
        props.error &&
        `border: 1px solid red;
  `};
`;

const StyledAgreeBox = styled.div`
    width: 100%;
`;

const StyledButton = styled.button`
    width: 100%;
    font-size: 16px;
    background-color: #d8d8d8;
    color: #969696;
    font-weight: 500;
    border: none;
    padding: 14px;
    :hover {
        background-color: #0d6637;
        color: white;
    }
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 3vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 16px;
    }
`;

const StyledErrorMessage = styled.div`
    color: red;
    font-size: 15px;
    margin-bottom: 2px;
    height: 20px;
`;

const StyledBorderLine = styled.div`
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 30px 0px 10px 0px;
`;

export default Register;
