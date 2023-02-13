import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH);

const MyProfileEdit: React.FC = () => {
    interface Iprofile {
        accountId: number;
        nickName: string;
        address: string;
        homePage: null;
        selfInfo: string;
        profileUrl: string;
    }
    const [error, setError] = useState<string>('');
    const [userInfo, setUserInfo] = useState('');
    const [nickError, setNickError] = useState(false);
    const [check, setCheck] = useState();
    const [profile, setProfile] = useState<Iprofile>();
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [imgfile, setImgFile] = useState<File | null>(null);
    const imgRef = useRef<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await axios.get(`${BASEURL}/api/profile/view`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                setProfile(profileData.data.value);
                setInputs({
                    ...inputs,
                    nickname: profileData.data.value.nickName,
                    introduction: profileData.data.value.selfInfo,
                    email: profileData.data.value.email.split('@')[0],
                    domain: profileData.data.value.email.split('@')[1],
                });
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    const [inputs, setInputs] = useState({
        nickname: '',
        introduction: '',
        email: '',
        domain: '',
    });
    const { nickname, introduction, email, domain } = inputs;

    const CheckNickname = async () => {
        try {
            const response = await axios.get(`${BASEURL}/api/login/nickName/duplicate?nickName=${inputs.nickname}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            setCheck(response.data.value);
        } catch (e) {
            alert('사용할 수 없는 닉네임 입니다');
        }
    };

    const handleClick = async () => {
        if (!imgfile) {
            CheckNickname();
            const formData = new FormData();
            const dataToSend = {
                nickName: inputs.nickname,
                selfInfo: inputs.introduction,
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
            } else {
                setError('');
            }
            const accountUpdateDto = JSON.stringify(dataToSend);
            console.log(accountUpdateDto);
            formData.append('accountUpdateDto', new Blob([accountUpdateDto], { type: 'application/json' }));

            const res = await axios.put(`${BASEURL}/api/profile/update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            alert('수정되었습니다');
            window.location.replace('/mypage/profile/edit');
            if (res.status === 201) console.log(res.data);
        } else {
            CheckNickname();
            const formData = new FormData();
            const dataToSend = {
                nickName: inputs.nickname,
                selfInfo: inputs.introduction,
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
            } else {
                setError('');
            }
            const accountUpdateDto = JSON.stringify(dataToSend);
            console.log(accountUpdateDto);
            console.log(imgfile);
            formData.append('accountUpdateDto', new Blob([accountUpdateDto], { type: 'application/json' }));
            formData.append('file', imgfile);

            const res = await axios.put(`${BASEURL}/api/profile/update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            alert('수정되었습니다');
            window.location.replace('/mypage/profile/edit');
            if (res.status === 201) console.log(res.data);
        }
    };

    const handleInput = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        setImgFile(file);
    };

    const onClickFileBtn = (e: any) => {
        imgRef.current.click();
    };

    const checkPassword = (e: any) => {
        CheckNickname();
        const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const regExp2 = /[~!@#$%^&*()+|<>?:{}]/;
        if (regExp.test(e.target.value) || regExp2.test(e.target.value)) {
            setUserInfo('닉네임은 영어, 숫자, 밑줄, 점으로 구성됩니다');
            setNickError(true);
        } else if (check === '다른 유저가 사용하는 닉네임입니다. 다른 닉네임으로 만들어주세요') {
            setUserInfo('다른 유저가 사용하는 닉네임입니다.');
            setNickError(true);
        } else {
            setUserInfo('');
            setNickError(false);
        }
    };
    return (
        <StyledMyphotoContainer>
            <StyledContextContainer>
                <StyledContexTitle>회원정보수정</StyledContexTitle>
                <div style={{ width: '100%', display: 'flex' }}>
                    <StyledRegisterContainer>
                        <StyledRegisterBlock>
                            <StyledTitleText>이메일</StyledTitleText>
                            <StyledEmailBlock>
                                <StyledInput type="text" value={email} onChange={handleInput} error={false} readOnly />
                                <span>@</span>
                                <StyledInput type="text" value={domain} onChange={handleInput} error={false} readOnly />
                            </StyledEmailBlock>
                            <StyledEmailMessage>
                                이메일을 변경하시려면 운영자에게 이메일을 보내주세요
                            </StyledEmailMessage>
                        </StyledRegisterBlock>
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
                        <StyledRegisterBlock>
                            <StyledTitleText>프로필이미지</StyledTitleText>
                            {imageUrl ? (
                                <StyledImg src={imageUrl} onClick={onClickFileBtn}></StyledImg>
                            ) : (
                                <StyledImg src={profile?.profileUrl} onClick={onClickFileBtn}></StyledImg>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={imgRef}
                                onChange={onChangeImage}
                                style={{ display: 'none' }}
                            />
                        </StyledRegisterBlock>
                        <StyledRegisterBlock>
                            <StyledTitleText>한줄소개</StyledTitleText>
                            <StyledInput
                                type="text"
                                name="introduction"
                                value={introduction}
                                onChange={handleInput}
                                error={false}
                            />
                        </StyledRegisterBlock>

                        <StyledRegisterBlock>
                            <StyledErrorMessage>{error}</StyledErrorMessage>
                            <StyledButton onClick={handleClick}>회원정보수정</StyledButton>
                        </StyledRegisterBlock>
                    </StyledRegisterContainer>
                </div>
            </StyledContextContainer>
        </StyledMyphotoContainer>
    );
};

const StyledImg = styled.img`
    width: 180px;
    height: 180px;
    border-radius: 100%;
    border: 1px solid #dbdbdb;
    cursor: pointer;
    :hover {
        opacity: 0.5;
    }
`;

const StyledEmailBlock = styled.div`
    display: flex;
    align-items: center;
    span {
        color: #bdbdbd;
        margin: 0 5px;
    }
`;

const StyledContexTitle = styled.div`
    font-family: NotoSansKR;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
    margin-bottom: 30px;
`;

const StyledContextContainer = styled.div`
    width: 796px;
`;

const StyledMyphotoContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledRegisterContainer = styled.div`
    width: 800px;
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
    font-size: 18px;
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

const StyledButton = styled.button`
    width: 100%;
    font-size: 16px;
    background-color: #d8d8d8;
    color: #969696;
    font-weight: 500;
    border: none;
    padding: 14px;
    cursor: pointer;
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

const StyledEmailMessage = styled.div`
    color: #969696;
    font-size: 15px;
    margin-bottom: 2px;
    height: 20px;
    margin-top: 14px;
`;

export default MyProfileEdit;
