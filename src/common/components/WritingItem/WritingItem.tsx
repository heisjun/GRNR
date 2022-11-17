import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CustomSelector from 'common/components/CustomSelector';
import { IWritingItem } from './WritingItem.type';
import TagBox from '../TagBox';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const option = [
    {
        id: 1,
        name: '공간',
        list: ['원룸', '거실', '침실', '주방', '욕실', '베란다', '사무실', '가게', '야외정원'],
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
    const [realgetTag, setRealgetTag] = useState<{ tagName: string }[]>([]);
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [videoUrl, setVideoUrl] = useState<any>(null);
    const [imgfile, setImgFile] = useState<File | null>(null);
    const imgRef = useRef<any>(null);

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        setImgFile(file);
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
                        realImg: imgfile,
                        realhashtag: realgetTag,
                    };
                } else return item;
            }),
        );
    }, [imageUrl, textValue, getOption, getTag, imgfile, realgetTag]);

    const Preview = () => {
        return (
            <StyledPreviewContainer>
                <StyledPreviewBlock>
                    <StyledPreviewTitle>{type}</StyledPreviewTitle>
                    {type === 'PHOTO' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <StyledPreviewText>*최대 ~~장까지 업로드 가능합니다.</StyledPreviewText>
                            <StyledPreviewBtn onClick={onClickFileBtn}>
                                <span>사진 업로드 하기</span>
                            </StyledPreviewBtn>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <StyledPreviewText>*~GB 미만, —초 ~ 길이의 —영상을 권장합니다.</StyledPreviewText>
                            <StyledPreviewBtn onClick={onClickFileBtn}>
                                <span>동영상 업로드 하기</span>
                            </StyledPreviewBtn>
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
                {imageUrl && <StyledDeletePictureBtn onClick={() => setImageUrl(null)}>삭제</StyledDeletePictureBtn>}
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
                <StyledInputContainer>
                    <StyledInputBlock
                        placeholder="사진에 대해 설명해주세요"
                        value={textValue}
                        onChange={(e) => handleSetValue(e)}
                    />
                    <StyledBorder />
                    <TagBox realsetGetTag={setRealgetTag} realvalue={getContent[index].realhashtag} />
                </StyledInputContainer>
            </StyledContentBlock>
        </StyledPictureBody>
    );
};

const StyledBorder = styled.div`
    height: 1px;
    background-color: #ececec;
`;

const StyledInputContainer = styled.div`
    height: 352px;
    border: 1px solid #dcdcdc;
    padding: 16px 30px 0px 30px;
`;

const StyledDeletePictureBtn = styled.button`
    position: absolute;
    top: 85%;
    left: 3%;
    z-index: 1;
`;

const StyledModifyPictureBtn = styled.button`
    position: absolute;
    top: 85%;
    left: 15%;
    z-index: 1;
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
    flex-direction: column;
    margin-bottom: 30px;
`;

const StyledImgBlock = styled.div`
    position: relative;
    height: 414px;
    @media screen and (max-width: ${boundaryWidth}px) {
        width: 100%;
    }
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
`;

const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const StyledContentBlock = styled.div``;

const StyledFlexBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
`;

const StyledInputBlock = styled.textarea`
    box-sizing: border-box;
    resize: none;
    width: 100%;
    height: 291px;
    font-size: 15px;
    border: none;
    background: #fff;
    font-weight: 400;
    color: gray;
`;

const StyledPreviewContainer = styled.div`
    background-color: #e6e6e6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

const StyledPreviewTitle = styled.div`
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: bold;
    color: #272727;
    margin-bottom: 6px;
`;

const StyledPreviewText = styled.div`
    font-family: NotoSansKR;
    font-size: 14px;
    color: #858585;
`;

const StyledPreviewBtn = styled.div`
    cursor: pointer;
    box-sizing: border-box;
    width: 140px;
    height: 42px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0d6637;
    span {
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fff;
    }
`;

export default WritingItem;
