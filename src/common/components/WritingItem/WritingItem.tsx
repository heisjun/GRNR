import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CustomSelector from 'common/components/CustomSelector';
import { IWritingItem } from './WritingItem.type';
import TagBox from '../TagBox';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const option = [
    {
        id: 1,
        name: '공간(필수)',
        list: ['실내 어두운 곳', '거실 내측', '거실 창측', '발코니'],
    },
];

const WritingItem: React.FC<IWritingItem> = (props) => {
    const { index, setGetContent, getContent, onRemove, type } = props;
    const [textValue, setTextValue] = useState('');
    const handleSetValue = (e: any) => {
        setTextValue(e.target.value);
    };
    const [getOption, setGetOption] = useState('');
    const [getTag, setGetTag] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [videoUrl, setVideoUrl] = useState<any>(null);
    const imgRef = useRef<any>(null);

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
    };

    const onChangeVideo = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        if (imgRef.current.files[0]) {
            reader.readAsDataURL(imgRef.current.files[0]);
        }

        const preview = e.target.files[0];
        const url = URL.createObjectURL(preview);
        setImageUrl(url);
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
                        hashtag: getTag,
                    };
                } else return item;
            }),
        );
    }, [imageUrl, textValue, getOption, getTag]);

    const Preview = () => {
        return (
            <StyledPreviewContainer onClick={onClickFileBtn}>
                <StyledPreviewBlock>
                    <div>{type}</div>
                    {type === 'PHOTO' ? (
                        <div>
                            {'('}*최대 몇 장 까지{')'}
                        </div>
                    ) : (
                        <div>
                            {'('}*~GB 미만, ...초 ...길이의 영상을 권장합니다{')'}
                        </div>
                    )}
                </StyledPreviewBlock>
            </StyledPreviewContainer>
        );
    };

    const onClickFileBtn = (e: any) => {
        imgRef.current.click();
    };

    return (
        <StyledPictureBody>
            <StyledImgBlock>
                {getContent[index].imgFile && (
                    <StyledDeletePictureBtn onClick={() => setImageUrl(null)}>삭제</StyledDeletePictureBtn>
                )}
                {getContent[index].imgFile && (
                    <StyledModifyPictureBtn
                        onClick={(e) => {
                            onClickFileBtn(e);
                        }}
                    >
                        수정
                    </StyledModifyPictureBtn>
                )}
                {type === 'PHOTO' ? (
                    !getContent[index].imgFile ? (
                        <Preview />
                    ) : (
                        <StyledImg src={getContent[index].imgFile}></StyledImg>
                    )
                ) : !getContent[index].imgFile ? (
                    <Preview />
                ) : (
                    <StyledVideo src={getContent[index].imgFile}></StyledVideo>
                )}

                {type === 'PHOTO' ? (
                    <input
                        type="file"
                        accept="image/*"
                        ref={imgRef}
                        onChange={onChangeImage}
                        style={{ display: 'none' }}
                    />
                ) : (
                    <input
                        type="file"
                        accept=".mov,.mp4"
                        ref={imgRef}
                        onChange={onChangeVideo}
                        style={{ display: 'none' }}
                    />
                )}
            </StyledImgBlock>
            <StyledContentBlock>
                <StyledFlexBlock>
                    <CustomSelector optionData={option} setGetOption={setGetOption} value={getContent[index].loc} />
                    {onRemove && (
                        <StyledDeleteItemBtn
                            onClick={() => {
                                onRemove(index);
                            }}
                        >
                            X
                        </StyledDeleteItemBtn>
                    )}
                </StyledFlexBlock>
                <StyledInputBlock
                    placeholder="사진에 대해 설명해주세요"
                    value={getContent[index].details}
                    onChange={(e) => handleSetValue(e)}
                />
                <TagBox setGetTag={setGetTag} value={getContent[index].hashtag} />
            </StyledContentBlock>
        </StyledPictureBody>
    );
};

const StyledDeletePictureBtn = styled.button`
    position: absolute;
    top: 85%;
    left: 3%;
    z-index: 10;
`;

const StyledModifyPictureBtn = styled.button`
    position: absolute;
    top: 85%;
    left: 15%;
    z-index: 10;
`;

const StyledDeleteItemBtn = styled.button`
    padding: 5px;
    background-color: #fff;
    border: 1px solid lightgrey;
    font-weight: 400;
    color: gray;
    border: none;
    cursor: pointer;
    font-size: 15px;
    :hover {
        background-color: red;
        color: white;
    }
`;

const StyledPictureBody = styled.div`
    display: flex;
    margin-bottom: 30px;
    @media screen and (max-width: ${boundaryWidth}px) {
        display: contents;
    }
`;

const StyledImgBlock = styled.div`
    width: 48%;
    margin-right: 4%;
    position: relative;
    @media screen and (max-width: ${boundaryWidth}px) {
        width: 100%;
    }
`;

const StyledImg = styled.img`
    width: 100%;
    height: 280px;
    border-radius: 5px;
`;

const StyledVideo = styled.video`
    width: 100%;
    height: 280px;
    border-radius: 5px;
`;
const StyledContentBlock = styled.div`
    width: 48%;
    @media screen and (max-width: ${boundaryWidth}px) {
        width: 100%;
    }
`;

const StyledFlexBlock = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-top: 10px;
    }
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
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-top: 10px;
    }
`;

const StyledPreviewContainer = styled.div`
    background-color: lightgray;
    height: 100%;
`;

const StyledPreviewBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 280px;
    color: gray;
    font-size: 15px;
`;

export default WritingItem;
