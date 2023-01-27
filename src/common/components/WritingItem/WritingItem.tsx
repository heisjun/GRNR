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
    //const [videoUrl, setVideoUrl] = useState<any>(null);
    const [imgfile, setImgFile] = useState<File | null>(null);
    const imgRef = useRef<any>(null);
    const ALLOW_PHOTO_EXTENSION = 'jpg,jpeg,png,webp';
    const ALLOW_VIDEO_EXTENSION = 'mp4,mov';

    const photoExtensionValid = ({ name }: { name: string }): boolean => {
        const extension = removeFileName(name);

        if (!(ALLOW_PHOTO_EXTENSION.indexOf(extension) > -1) || extension === '') {
            return false;
        }
        return true;
    };

    const videoExtensionValid = ({ name }: { name: string }): boolean => {
        const extension = removeFileName(name);

        if (!(ALLOW_VIDEO_EXTENSION.indexOf(extension) > -1) || extension === '') {
            return false;
        }
        return true;
    };

    const removeFileName = (originalFileName: string): string => {
        const lastIndex = originalFileName.lastIndexOf('.');
        if (lastIndex < 0) {
            return '';
        }
        return originalFileName.substring(lastIndex + 1).toLowerCase();
    };

    const onChangeImage = () => {
        const reader = new FileReader();
        let file = imgRef.current.files[0];

        if (!photoExtensionValid(file)) {
            file = '';
            alert(`사진 파일만 업로드할 수 있습니다`);
            return;
        }

        if (file) reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        setImgFile(file);
    };

    const onChangeVideo = (e: any) => {
        const reader = new FileReader();
        let file = imgRef.current.files[0];

        if (!videoExtensionValid(file)) {
            file = '';
            alert(`동영상 파일만 업로드할 수 있습니다`);
            return;
        }

        reader.onload = () => {
            setImageUrl(reader.result);
        };
        if (imgRef.current.files[0]) {
            reader.readAsDataURL(file);
        }

        const preview = e.target.files[0];
        const url = URL.createObjectURL(preview);
        setImageUrl(url);

        setImgFile(file);
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
                    {type === 'PHOTO' ? (
                        <>
                            <StyledTypeIcon>
                                <img src={'/photoIcon.png'} />
                            </StyledTypeIcon>
                            <StyledPreviewTitle>{type}</StyledPreviewTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <StyledPreviewText>*최대 10장까지 업로드 가능합니다.</StyledPreviewText>
                                <StyledPreviewBtn onClick={onClickFileBtn}>
                                    <span>사진 업로드 하기</span>
                                </StyledPreviewBtn>
                            </div>
                        </>
                    ) : (
                        <>
                            <StyledTypeIcon>
                                <img src={'/videoIcon.png'} />
                            </StyledTypeIcon>
                            <StyledPreviewTitle>{type}</StyledPreviewTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <StyledPreviewText>
                                    *1GB 미만, 3초 ~60초 길이의 세로영상을 권장합니다.
                                </StyledPreviewText>
                                <StyledPreviewBtn onClick={onClickFileBtn}>
                                    <span>동영상 업로드 하기</span>
                                </StyledPreviewBtn>
                            </div>
                        </>
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
                    <StyledDeletePictureBtn onClick={() => setImageUrl(null)}>
                        <img src={'/deleteIcon.png'} />
                    </StyledDeletePictureBtn>
                )}
                {getContent[index].imgFile && (
                    <StyledModifyPictureBtn
                        onClick={(e) => {
                            onClickFileBtn(e);
                        }}
                    >
                        <img src={'/reviseIcon.png'} />
                    </StyledModifyPictureBtn>
                )}

                {type === 'PHOTO' ? (
                    !getContent[index].imgFile ? (
                        <Preview />
                    ) : (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <StyledImg src={getContent[index].imgFile} />
                            <StyledImgBtm test={getContent[index].imgFile} />
                        </div>
                    )
                ) : !getContent[index].imgFile ? (
                    <Preview />
                ) : (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <StyledVideo src={getContent[index].imgFile}></StyledVideo>
                        <StyledImgBtm test={getContent[index].imgFile} />
                    </div>
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
                {/*  {imageUrl && <StyledDeletePictureBtn onClick={() => setImageUrl(null)}>삭제</StyledDeletePictureBtn>} */}
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

const StyledTypeIcon = styled.div`
    width: 90px;
    height: 90px;
    background-color: white;
    margin-bottom: 20px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 37.5px;
    }
`;

const StyledBorder = styled.div`
    height: 1px;
    background-color: #ececec;
`;

const StyledInputContainer = styled.div`
    height: 352px;
    border: 1px solid #dcdcdc;
    padding: 16px 30px 0px 30px;
`;

const StyledBtnZone = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    top: 88%;
    z-index: 2;
    background: linear-gradient(white, black);
`;

const StyledDeletePictureBtn = styled.button`
    position: absolute;
    top: 88%;
    left: 3%;
    z-index: 1;
    border: none;
    background: none;
    cursor: pointer;
    img {
        width: 28px;
    }
`;

const StyledModifyPictureBtn = styled.button`
    position: absolute;
    top: 88%;
    left: 10%;
    z-index: 1;
    border: none;
    background: none;
    cursor: pointer;
    img {
        width: 28px;
    }
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
    position: relative;
`;
const StyledImgBtm = styled.div<{ test: string }>`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(20, 20, 20, 0) 85%, rgba(20, 20, 20, 0.5) 90%, rgba(20, 20, 20, 1) 100%),
        url(test);
    background-size: cover;
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
