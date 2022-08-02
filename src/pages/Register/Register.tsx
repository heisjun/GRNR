import styled from 'styled-components';
import { useState, useEffect, SetStateAction } from 'react';
import AgreeBox from 'common/components/AgreeBox';
import KeywordBox from 'common/components/KeywordBox';
import AddressBox from 'common/components/AddressBox';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;

const Register: React.FC = () => {
    const [allAgree, setAllAgree] = useState<boolean>(false);
    const [ageAgree, setAgeAgree] = useState<boolean>(false);
    const [serviceAgree, setServiceAgree] = useState<boolean>(false);
    const [privateAgree, setPrivateAgree] = useState<boolean>(false);
    const [adAgree, setAdAgree] = useState<boolean>(false);
    const [selected, setSelected] = useState('');
    const [getkeyword, setGetKeyword] = useState();
    const [getAddress, setGetAddress] = useState();
    const [error, setError] = useState<string>('');
    const [inputs, setInputs] = useState({
        email: '',
        nickname: '',
        detailAddress: '',
    });
    const { nickname, email, detailAddress } = inputs;
    const onSubmit = () => {
        const dataToSend = {
            email: `${inputs.email}@${selected}`,
            nickname: inputs.nickname,
            address: `${getAddress},${inputs.detailAddress}`,
            keyword: getkeyword,
        };
        if (!inputs.email || !selected) {
            setError('이메일을 입력하세요');
            return;
        } else if (!dataToSend.nickname) {
            setError('닉네임을 입력하세요');
            return;
        } else if (!getAddress) {
            setError('주소를 입력하세요');
            return;
        } else if (!ageAgree || !serviceAgree || !privateAgree) {
            setError('약관에 동의해주세요');
            return;
        } else {
            setError('');
            console.log(dataToSend);
        }
    };

    const handleSelect = (e: { target: { value: SetStateAction<string> } }) => {
        setSelected(e.target.value);
    };

    const handleInput = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
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

    useEffect(() => {
        ageAgree && serviceAgree && privateAgree && adAgree ? setAllAgree(true) : setAllAgree(false);
    }, [ageAgree, serviceAgree, privateAgree, adAgree]);

    return (
        <StyledRegisterContainer>
            <StyledTitleText>추가 정보 입력</StyledTitleText>
            <StyledRegisterBlock>
                <StyledTitleText>이메일</StyledTitleText>
                <StyledEmailInput>
                    <StyledInput placeholder="이메일" type="text" name="email" value={email} onChange={handleInput} />

                    <StyledNormalText>@</StyledNormalText>

                    <StyledSelector onChange={handleSelect} value={selected}>
                        <option key="null" value="null">
                            선택해주세요
                        </option>
                        <option key="google" value="google.com">
                            google.com
                        </option>
                        <option key="naver" value="naver.com">
                            naver.com
                        </option>
                    </StyledSelector>
                </StyledEmailInput>
            </StyledRegisterBlock>
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
            <StyledRegisterBlock>
                <StyledTitleText>주소</StyledTitleText>
                <AddressBox setGetAddress={setGetAddress} />
                <StyledInput
                    placeholder="상세주소를 입력하세요"
                    type="text"
                    name="detailAddress"
                    value={detailAddress}
                    onChange={handleInput}
                />
            </StyledRegisterBlock>
            <StyledRegisterBlock>
                <StyledTitleText>관심사</StyledTitleText>
                <StyledBodyText>관심있는 키워드를 설정해주세요</StyledBodyText>
                <KeywordBox setGetKeyword={setGetKeyword} />
            </StyledRegisterBlock>
            <StyledRegisterBlock>
                <StyledErrorMessage>{error}</StyledErrorMessage>
                <StyledButton onClick={onSubmit}>가입하기</StyledButton>
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
    margin-bottom: 1%;
`;

export default Register;
