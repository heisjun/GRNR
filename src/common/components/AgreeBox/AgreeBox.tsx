import { IAgreeBox } from './AgreeBox.type';
import styled from 'styled-components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;

const AgreeBox: React.FC<IAgreeBox> = (props) => {
    const {
        allAgree,
        ageAgree,
        serviceAgree,
        privateAgree,
        adAgree,
        allHandleChange,
        setAgeAgree,
        setServiceAgree,
        setPrivateAgree,
        setAdAgree,
        handleChange,
    } = props;

    const inputList = [
        {
            id: 'agree-all',
            value: allAgree,
            clickEvent: allHandleChange,
            text: '전체동의',
            line: true,
        },
        {
            id: 'agree-age',
            value: ageAgree,
            clickEvent: () => handleChange(setAgeAgree),
            text: '만 14세 이상입니다 (필수)',
        },
        {
            id: 'agree-service',
            value: serviceAgree,
            clickEvent: () => handleChange(setServiceAgree),
            text: '이용약관 (필수)',
        },
        {
            id: 'agree-private',
            value: privateAgree,
            clickEvent: () => handleChange(setPrivateAgree),
            text: '개인정보 처리 방침 동의(필수)',
        },
        {
            id: 'agree-advertise',
            value: adAgree,
            clickEvent: () => handleChange(setAdAgree),
            text: '광고성 정보 수신 및 마케팅 활용 동의 (선택)',
        },
    ];
    return (
        <>
            {inputList.map((item) => (
                <StyledContainer key={item.id}>
                    <StyledLabel htmlFor={item.id}>
                        <input id={item.id} type="checkbox" checked={item.value} onChange={item.clickEvent} />

                        <StyledText>{item.text}</StyledText>
                    </StyledLabel>
                    {item.line ? <StyledLine /> : null}
                </StyledContainer>
            ))}
        </>
    );
};

const StyledContainer = styled.div`
    padding: 2%;
`;
const StyledLabel = styled.label`
    color: grey;
    display: flex;
`;

const StyledText = styled.div`
    padding: 5px;
    font-size: 1.3vw;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 2.5vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 15px;
    }
`;
const StyledLine = styled.hr`
    margin-bottom: -5;
`;

export default AgreeBox;
