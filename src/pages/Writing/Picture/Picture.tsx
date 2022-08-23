import CustomSelector from 'common/components/CustomSelector';
import WritingItem from 'common/components/WritingItem';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IUploadPicData } from 'common/types';

const option1 = [
    {
        id: 1,
        name: '분류',
        list: ['입보기식물', '꽃보기식물', '열매보기식물', '선인장&다육식물'],
    },
];
const option2 = [
    {
        id: 1,
        name: '장소',
        list: ['실내 어두운 곳', '거실 내측', '거실 창측', '발코니'],
    },
];

const Picture: React.FC = () => {
    const [getOption1, setGetOption1] = useState('');
    const [getOption2, setGetOption2] = useState('');

    const [getContent, setGetContent] = useState<IUploadPicData[]>([
        { loc: '', hashtag: [], details: '', imgFile: null },
    ]);

    const [countList, setCountList] = useState([0]);

    const onAddWritingItem = () => {
        const countArr = [...countList];
        let counter = countArr.slice(-1)[0];
        counter += 1;
        countArr.push(counter);
        setCountList(countArr);
        setGetContent([...getContent, { loc: '', hashtag: [], details: '', imgFile: null }]);
    };

    useEffect(() => {
        console.log('testing:', getContent);
        console.log(countList.length);
    }, [onAddWritingItem, getContent, countList]);

    return (
        <StyledPictureContainer>
            <StyledPictureHeader>
                <CustomSelector optionData={option1} setGetOption={setGetOption1} />
                <CustomSelector optionData={option2} setGetOption={setGetOption2} />
            </StyledPictureHeader>
            {countList &&
                countList.map((i: number) => (
                    <div key={i}>
                        <WritingItem
                            index={i}
                            setGetContent={setGetContent}
                            getContent={getContent}
                            countNum={countList.length}
                        />
                    </div>
                ))}
            <StyledAddBtn onClick={onAddWritingItem}>추가하기</StyledAddBtn>
        </StyledPictureContainer>
    );
};

const StyledPictureContainer = styled.div`
    height: 2000px;
`;

const StyledPictureHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: -20px;
    padding-bottom: 15px;
`;

const StyledAddBtn = styled.button`
    width: 100%;
    border: none;
    font-size: 20px;
    color: gray;
    padding: 15px;
    :hover {
        background: lightgray;
        color: white;
    }
`;

export default Picture;
