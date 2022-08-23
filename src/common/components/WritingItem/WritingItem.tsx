import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CustomSelector from 'common/components/CustomSelector';
import { IWritingItem } from './WritingItem.type';

const option = [
    {
        id: 1,
        name: '공간(필수)',
        list: ['실내 어두운 곳', '거실 내측', '거실 창측', '발코니'],
    },
];

const WritingItem: React.FC<IWritingItem> = (props) => {
    const { index, setGetContent, getContent } = props;
    const [textValue, setTextValue] = useState('');
    const handleSetValue = (e: any) => {
        setTextValue(e.target.value);
    };
    const [getOption, setGetOption] = useState('');
    const [imageUrl, setImageUrl] = useState<any>(null);
    const imgRef = useRef<any>(null);

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
    };

    useEffect(() => {
        setGetContent(
            getContent.map((item, i) => {
                if (index === i) {
                    return {
                        ...getContent[index],
                        imgFile: imageUrl,
                        details: textValue,
                        loc: getOption,
                    };
                } else return item;
            }),
        );
    }, [imageUrl, textValue, getOption]);

    const onClickFileBtn = (e: any) => {
        imgRef.current.click();
    };

    return (
        <StyledPictureBody>
            <StyledImgBlock>
                {imageUrl && <StyledDeleteBtn onClick={() => setImageUrl(null)}>삭제</StyledDeleteBtn>}
                <StyledImg
                    src={imageUrl ? imageUrl : '/sample2.jpg'}
                    onClick={(e) => {
                        onClickFileBtn(e);
                    }}
                ></StyledImg>
                <input type="file" accept="image/*" ref={imgRef} onChange={onChangeImage} style={{ display: 'none' }} />
            </StyledImgBlock>
            <StyledContentBlock>
                <CustomSelector optionData={option} setGetOption={setGetOption} />
                <StyledInputBlock
                    placeholder="사진에 대해 설명해주세요"
                    value={textValue}
                    onChange={(e) => handleSetValue(e)}
                />
            </StyledContentBlock>
        </StyledPictureBody>
    );
};

const StyledDeleteBtn = styled.button`
    position: absolute;
    top: 85%;
    left: 3%;
`;

const StyledPictureBody = styled.div`
    display: flex;
    margin-bottom: 30px;
`;

const StyledImgBlock = styled.div`
    width: 48%;
    margin-right: 4%;
    position: relative;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 280px;
`;
const StyledContentBlock = styled.div`
    width: 48%;
`;

const StyledInputBlock = styled.textarea`
    width: 98%;
    margin-top: 20px;
    font-size: 15px;
    padding: 5px;
    background: #fff;
    border: 1px solid lightgrey;
    font-weight: 400;
    color: gray;
    border-radius: 5px;
    height: 150px;
`;

export default WritingItem;
