import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const data = [
    {
        title: '1. 관리 난이도(Care level)',
        answer: '10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다.',
    },
    {
        title: '2. 물(Watering)',
        answer: '10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다.',
    },
    {
        title: '3. 빛과 공간(Light & Placement)',
        answer: '10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다.',
    },
    {
        title: '4. 온도(Temperature)',
        answer: '10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다.',
    },
    {
        title: '5. 습도(Humadity)',
        answer: '10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다.',
    },
    {
        title: '6. 독성(Toxcity)',
        answer: '10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다.',
    },
    {
        title: '7. 비료(Fertilizer)',
        answer: '10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다.',
    },
    {
        title: '8. 해충(Pest)',
        answer: '10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는 전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다.',
    },
];

const Faq: React.FC = () => {
    const [isActive, setIsActive] = useState([false]);
    const [toggle, setToggle] = useState<boolean>(true);

    function onOpenBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = true;
        setIsActive(newIsActive);
    }

    function onCloseBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = false;
        setIsActive(newIsActive);
    }

    return (
        <StyledGuideContainer>
            <StyledGuideTitle>
                <StyledBoldText>자주묻는 질문</StyledBoldText>
            </StyledGuideTitle>
            <StyledBorder />
            {data.map((item, index) => (
                <StyledQuestionTitleBlock>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex' }}>
                            <StyledQuestionIcon>FAQ.</StyledQuestionIcon>
                            <StyledQuestionTitle>{item.title}</StyledQuestionTitle>
                        </div>
                        {isActive[index] ? (
                            <StyledIcon src={'/btnDropUp.png'} onClick={() => onCloseBtn(index)} />
                        ) : (
                            <StyledIcon src={'/btnDropdown.png'} onClick={() => onOpenBtn(index)} />
                        )}
                    </div>
                    {isActive[index] && (
                        <div>
                            <StyledQuestionBorder />
                            <StyledQuestionAnswer>{item.answer}</StyledQuestionAnswer>
                        </div>
                    )}
                </StyledQuestionTitleBlock>
            ))}
        </StyledGuideContainer>
    );
};

const StyledBorder = styled.div`
    width: 1140px;
    height: 1px;
    padding: 0px;
    background-color: #272727;
`;

const StyledQuestionAnswer = styled.div`
    margin: 24px 24px 0px;
    font-family: AppleSDGothicNeo;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: #3d3d3d;
`;
const StyledQuestionBorder = styled.div`
    width: 1092px;
    height: 1px;
    margin: 20px 24px 24px;
    opacity: 0.65;
    background-color: #dadada;
`;
const StyledQuestionIcon = styled.div`
    margin: 4px 10px 0px 24px;
    font-family: AppleSDGothicNeo;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0d6637;
`;

const StyledQuestionTitleBlock = styled.div`
    width: 1140px;
    padding: 28px 0;
    border-bottom: 1px solid #272727;
    cursor: pointer;
`;

const StyledQuestionTitle = styled.div`
    height: 19px;
    margin: 3px 0px 0px 10px;
    font-family: AppleSDGothicNeo;
    font-size: 16px;
    font-weight: bold;
    color: #454545;
`;

const StyledBoldText = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #272727;
`;
const StyledGuideContainer = styled.div`
    width: 100%;
    margin-top: 120px;
    margin-bottom: 120px;
`;

const StyledGuideTitle = styled.div`
    text-align: center;
    margin-bottom: 34px;
`;

const StyledIcon = styled.img`
    width: 24px;
    height: 24px;
    margin: 0 24px 0px 0px;
    object-fit: contain;
    cursor: pointer;
`;

export default Faq;
