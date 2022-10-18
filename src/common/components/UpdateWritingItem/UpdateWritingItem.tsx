import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CustomSelector from 'common/components/CustomSelector';
import TagBox from '../TagBox';
import { IUpdateWritingItem } from './UpdateWritingItem.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const option = [
    {
        id: 1,
        name: '공간(필수)',
        list: ['원룸', '거실', '침실', '주방', '발코니', '사무실', '가게', '야외'],
    },
];

const UpdateWritingItem: React.FC<IUpdateWritingItem> = (props) => {
    const { index, setGetContent, getContent, onRemove, type, beforeData } = props;
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [textValue, setTextValue] = useState(beforeData.explain ? beforeData.explain : '');
    const [getOption, setGetOption] = useState(beforeData.homePlace ? beforeData.homePlace : '');
    const [getImg, setGetImg] = useState<any>(beforeData.pictureUrl ? beforeData.pictureUrl : imageUrl);
    const [imgfile, setImgFile] = useState<File | null>(null); //파일오브젝트이고..
    const [realgetTag, setRealgetTag] = useState<{ tagName: string }[]>(beforeData.tagList);
    console.log('realgetTag:', realgetTag);

    const imgRef = useRef<any>(null);

    const handleSetValue = (e: any) => {
        setTextValue(e.target.value);
    };

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
            setGetImg(reader.result);
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

    const onClickFileBtn = (e: any) => {
        imgRef.current.click();
    };

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

    useEffect(() => {
        setGetContent(
            getContent.map((item, i) => {
                if (index === i) {
                    return {
                        ...getContent[index],
                        pictureId: beforeData.pictureId,
                        contentId: beforeData.contentId + index,
                        pictureUrl: getImg,
                        explain: textValue,
                        homePlace: getOption,
                        tagList: realgetTag,
                    };
                } else return item;
            }),
        );
        console.log('전달할내용:', getContent);
    }, [getImg, textValue, getOption, realgetTag]);

    return (
        <StyledPictureBody>
            <StyledImgBlock>
                {!getImg ? <Preview /> : <StyledImg src={getImg}></StyledImg>}
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

                {getImg && (
                    <StyledDeletePictureBtn
                        onClick={() => {
                            setImageUrl(null);
                            setGetImg(null);
                        }}
                    >
                        삭제
                    </StyledDeletePictureBtn>
                )}
                {getImg && (
                    <StyledModifyPictureBtn
                        onClick={(e) => {
                            onClickFileBtn(e);
                        }}
                    >
                        수정
                    </StyledModifyPictureBtn>
                )}
            </StyledImgBlock>
            <StyledContentBlock>
                <StyledFlexBlock>
                    <CustomSelector optionData={option} setGetOption={setGetOption} value={getOption} />
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
                    value={textValue}
                    onChange={(e) => handleSetValue(e)}
                />

                <TagBox realsetGetTag={setRealgetTag} realvalue={realgetTag} />
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

export default UpdateWritingItem;
