import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { IReviewModalProps } from './ReviewModal.interface';

import CloseImg from 'assets/icon/close.png';
import GreenCloseImg from 'assets/icon/greenClose.png';
import LogoImg from 'assets/icon/logo.png';
import EmptyIcon from '../../../../assets/icon/emptyHeart.png';
import HeartIcon from 'assets/icon/heart.png';
import Plus from 'assets/icon/plus.png';
import Trash from 'assets/icon/trash.png';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { ReviewDialogModal } from 'common/components/ReviewDialog/ReviewDialog.impl';

interface ITagList {
    tagName: string;
}

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

export const ReviewModal: React.FC<IReviewModalProps> = (props) => {
    const { open, onClose, data, requestReview } = props;
    const [satisfaction, setSatisfaction] = useState(0);
    const [tagList, setTagList] = useState<ITagList[]>([]);
    const [imgFile, setFileImg] = useState<any>();
    const [requestFile, setRequestFile] = useState<any>();
    const [contents, setContents] = useState('');
    const [error, setError] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    const fileInput = useRef<any>(null);

    const initData = () => {
        setSatisfaction(0);
        setTagList([]);
        setFileImg(undefined);
        setRequestFile(undefined);
        setContents('');
        setError(false);
    };

    const initClose = () => {
        initData();
        onClose();
    };

    const openConfirmModal = () => {
        setConfirmModal(true);
    };

    const handleConfirmClose = () => {
        onClose();
        initClose();
        setConfirmModal(false);
    };

    const reviewSubmit = async () => {
        const formData = new FormData();

        if (satisfaction !== 0 && imgFile !== undefined && tagList.length >= 1 && contents !== '') {
            await axios.post(
                `${BASEURL}/api/plantDicReview/save`,
                {
                    plantReviewSaveDto: {
                        plantDicId: data.plantDicId,
                        evaluation: satisfaction,
                        reviewText: contents,
                        tagDtoList: tagList,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzbnNJZCI6IlFSNzBUS2ZacjVfcWp4U3J5VHQ5RDU2Q2tzODlkVk5pamJLWlJMRDVhRTgiLCJleHAiOjE2ODI4NzU3MzN9.OEcOpop0xGLBXNv5XLnIGj9wjf-zVr0RWGRg9_KYrzEOaghwBCjLIzMsOjjbpG69B9uFfX7OIujNFZJalf-Ltw',
                    },
                },
            );
            initClose();
            requestReview();
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        if (!open) document.body.style.overflow = 'unset';
    });

    const handleSatisfaction = (score: number) => {
        setSatisfaction(score);
    };

    const selectTag = (tag: string) => {
        for (const i in tagList) {
            if (tagList[i].tagName === tag) {
                return false;
            }
        }
        setTagList(tagList.concat({ tagName: tag }));
    };

    const removeTag = (tag: string) => {
        setTagList(tagList.filter((item) => item.tagName !== tag));
    };

    const handleFileUpload = () => {
        fileInput.current.click();
    };

    const changeFile = (e: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setRequestFile(reader.result);
        };
        if (!e.target.files || e.target.files.length === 0) {
            setFileImg(undefined);
            return;
        }
        setFileImg(URL.createObjectURL(e.target.files[0]));
        setRequestFile(e.target.files[0]);
    };

    const removeFile = () => {
        setFileImg(undefined);
        setRequestFile(undefined);
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
                ],
            },
        }),
        [],
    );

    const renderEvaluationSum = () => {
        if (satisfaction === 0) {
            return (
                <>
                    <StyledEmptyImg onClick={() => handleSatisfaction(1)} src={EmptyIcon} />
                    <StyledEmptyImg onClick={() => handleSatisfaction(2)} src={EmptyIcon} />
                    <StyledEmptyImg onClick={() => handleSatisfaction(3)} src={EmptyIcon} />
                    <StyledEmptyImg onClick={() => handleSatisfaction(4)} src={EmptyIcon} />
                    <StyledEmptyImg onClick={() => handleSatisfaction(5)} src={EmptyIcon} />
                </>
            );
        }
        if (satisfaction === 1) {
            return (
                <>
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(2)} src={EmptyIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(3)} src={EmptyIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(4)} src={EmptyIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(5)} src={EmptyIcon} alt="" />
                </>
            );
        }
        if (satisfaction === 2) {
            return (
                <>
                    <StyledHeartImg onClick={() => handleSatisfaction(1)} src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(3)} src={EmptyIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(4)} src={EmptyIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(5)} src={EmptyIcon} alt="" />
                </>
            );
        }
        if (satisfaction === 3) {
            return (
                <>
                    <StyledHeartImg onClick={() => handleSatisfaction(1)} src={HeartIcon} alt="" />
                    <StyledHeartImg onClick={() => handleSatisfaction(2)} src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(4)} src={EmptyIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(5)} src={EmptyIcon} alt="" />
                </>
            );
        }
        if (satisfaction === 4) {
            return (
                <>
                    <StyledHeartImg onClick={() => handleSatisfaction(1)} src={HeartIcon} alt="" />
                    <StyledHeartImg onClick={() => handleSatisfaction(2)} src={HeartIcon} alt="" />
                    <StyledHeartImg onClick={() => handleSatisfaction(3)} src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                    <StyledEmptyImg onClick={() => handleSatisfaction(5)} src={EmptyIcon} alt="" />
                </>
            );
        }
        if (satisfaction === 5) {
            return (
                <>
                    <StyledHeartImg onClick={() => handleSatisfaction(1)} src={HeartIcon} alt="" />
                    <StyledHeartImg onClick={() => handleSatisfaction(2)} src={HeartIcon} alt="" />
                    <StyledHeartImg onClick={() => handleSatisfaction(3)} src={HeartIcon} alt="" />
                    <StyledHeartImg onClick={() => handleSatisfaction(4)} src={HeartIcon} alt="" />
                    <StyledHeartImg src={HeartIcon} alt="" />
                </>
            );
        }
    };

    return (
        <>
            <ModalContainer open={open}>
                <BackdropStyle open={open} />
                <DialogStyle open={open}>
                    <DialogHeaderWrapperStyle>
                        <CloseBox onClick={openConfirmModal}>
                            <CloseIconStyle src={CloseImg} />
                        </CloseBox>
                    </DialogHeaderWrapperStyle>
                    <DialogBodyStyle>
                        <LogoBoxStyle>
                            <div>
                                <img src={LogoImg} />
                            </div>
                            <h4>가드너스 리뷰 - {data.plantName}</h4>
                        </LogoBoxStyle>
                        <PlantInfoContainerStyle>
                            <PlantImgBoxStyle>
                                <img src={data.plantContentFeedDtoList[0].plantPicUrl} />
                            </PlantImgBoxStyle>
                            <div>
                                <PlantInfoBoxStyle>
                                    <InfoTextStyle>{data.scientificName}</InfoTextStyle>
                                </PlantInfoBoxStyle>
                                <KoNameStyle>{data.plantName}</KoNameStyle>
                                <CateGoryStyle>출신(origin)</CateGoryStyle>
                                <InfoTextStyle>{data?.distribution}</InfoTextStyle>
                                <CateGoryStyle>분류(Taxonomy)</CateGoryStyle>
                                <InfoTextStyle>
                                    {data?.korClass}({data?.enClass}) - {data?.korOrder}({data?.enOrder}) -{' '}
                                    {data?.korFamily}({data?.enFamily})
                                </InfoTextStyle>
                            </div>
                        </PlantInfoContainerStyle>
                        <div style={{ paddingInline: '40px' }}>
                            <LineStyle />
                        </div>
                        <EvaluationContainerStyle>
                            <EvaluationTextStyle error={error} style={{ marginBottom: '15px' }}>
                                평가하기(필수)
                                {error && <ErrorText>필수 입력 항목입니다.</ErrorText>}
                            </EvaluationTextStyle>

                            <SatisfactionBoxStyle>
                                <SatisfactionTextStyle>만족도</SatisfactionTextStyle>
                                {renderEvaluationSum()}
                            </SatisfactionBoxStyle>
                            <EvaluationTextStyle error={error} style={{ marginBottom: '18px' }}>
                                키워드 선택(필수) {error && <ErrorText>필수 입력 항목입니다.</ErrorText>}
                            </EvaluationTextStyle>
                            <KeyWordContainerStyle>
                                {data?.classification !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.classification)}>
                                        {data?.classification}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.classification_flower !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.classification_flower)}>
                                        {data?.classification_flower}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.classification_fruit !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.classification_fruit)}>
                                        {data?.classification_fruit}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.classification_leaf !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.classification_leaf)}>
                                        {data?.classification_leaf}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.classification_succulent !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.classification_succulent)}>
                                        {data?.classification_succulent}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.toxicityHarmless !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.toxicityHarmless)}>
                                        {data?.toxicityHarmless}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.toxicitySeriousness !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.toxicitySeriousness)}>
                                        {data?.toxicitySeriousness}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.toxicitySlight !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.toxicitySlight)}>
                                        {data?.toxicitySlight}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.toxicityIngestion !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.toxicityIngestion)}>
                                        {data?.toxicityIngestion}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.toxicitySkin !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.toxicitySkin)}>
                                        {data?.toxicitySkin}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.cat !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.cat)}>{data?.cat}</KeyWordBoxStyle>
                                )}
                                {data?.dog !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.dog)}>{data?.dog}</KeyWordBoxStyle>
                                )}
                                {data?.classification_succulent !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.classification_succulent)}>
                                        {data?.classification_succulent}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.difficulty !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.difficulty)}>
                                        {data?.difficulty}
                                    </KeyWordBoxStyle>
                                )}
                                {data?.growSpeed !== 'null' && (
                                    <KeyWordBoxStyle onClick={() => selectTag(data?.growSpeed)}>
                                        {data?.growSpeed}
                                    </KeyWordBoxStyle>
                                )}
                            </KeyWordContainerStyle>
                            <EvaluationTextStyle error={error} style={{ marginBottom: '11px' }}>
                                선택한 키워드 {error && <ErrorText>필수 입력 항목입니다.</ErrorText>}
                            </EvaluationTextStyle>
                            <SelectKeywordContainer>
                                {tagList.map((item, idx) => (
                                    <SelectKeyWordBoxStyle key={idx}>
                                        {item.tagName}
                                        <img src={GreenCloseImg} onClick={() => removeTag(item.tagName)} />
                                    </SelectKeyWordBoxStyle>
                                ))}
                            </SelectKeywordContainer>
                            <div style={{ paddingRight: '80px' }}>
                                <LineStyle />
                            </div>
                            <EvaluationTextStyle error={error} style={{ marginBottom: '15px', marginTop: '5px' }}>
                                사진 첨부(필수) {error && <ErrorText>필수 입력 항목입니다.</ErrorText>}
                            </EvaluationTextStyle>
                            <TextStyle>가드너 님의 정원 속 함꼐 하는 식물의 모습을 공유해 주세요.(최대 1장)</TextStyle>
                            <FileUploadContainer>
                                <FileStyle onClick={() => (!imgFile ? handleFileUpload() : null)}>
                                    {!imgFile ? (
                                        <PlusIconStyle src={Plus} />
                                    ) : (
                                        <>
                                            <PlantImgStyle src={imgFile} />
                                            <div onClick={removeFile}>
                                                <TrashIcon src={Trash} />
                                            </div>
                                        </>
                                    )}
                                </FileStyle>
                                <FileUploadButton
                                    accept="image/jpg,image/png,image/jpeg,image/gif"
                                    ref={fileInput}
                                    onChange={changeFile}
                                    type="file"
                                />
                            </FileUploadContainer>
                            <EvaluationTextStyle error={error} style={{ marginBottom: '15px' }}>
                                리뷰 작성(필수) {error && <ErrorText>필수 입력 항목입니다.</ErrorText>}
                            </EvaluationTextStyle>
                            <QuillWrapper
                                value={contents}
                                onChange={(content: string, delta: any, source: any, editor: any) =>
                                    setContents(editor.getHTML())
                                }
                                modules={modules}
                                theme="snow"
                                placeholder="다른 가드너를 위해 당신의 식물과 함께 한 시간들에 대해 자세히 공유해주세요. (최소 20자)"
                            />
                            <StyledReviewButton onClick={reviewSubmit}>리뷰 제출하기</StyledReviewButton>
                        </EvaluationContainerStyle>
                    </DialogBodyStyle>
                </DialogStyle>
            </ModalContainer>
            <ReviewDialogModal open={confirmModal} onClose={setConfirmModal} resetBtn={handleConfirmClose} />
        </>
    );
};

interface IStyled {
    open?: boolean;
}

const ModalContainer = styled.div<IStyled>`
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: ${({ open }) => (open ? 1 : 0)};
    transition: all 0.3s;
    pointer-events: all;
`;

const BackdropStyle = styled.div<IStyled>`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
`;

const DialogStyle = styled.div<IStyled>`
    background: #fff;
    width: 760px;
    height: auto;
    overflow: scroll;
    box-shadow: 0 6px 20px 0 rgb(0 0 0 / 10%);
    min-width: 376px;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 32px);
    display: flex;
    flex-direction: column;
    font-size: 14px;
    opacity: ${({ open }) => (open ? 1 : 0)};
    transform: ${({ open }) => (open ? 'translateY(0) translateZ(0)' : 'translateY(40px) translateZ(0)')};
    transition: all 0.3s;
`;

const DialogHeaderWrapperStyle = styled.div<IStyled>`
    display: flex;
    justify-content: flex-end;
    padding: 10px 0 0 0;
    width: 100%;
    height: 50px;
`;

const CloseBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

const CloseIconStyle = styled.img`
    width: 18px;
    height: 18px;
    cursor: pointer;
`;

const DialogBodyStyle = styled.div<IStyled>`
    width: 100%;
`;

const LogoBoxStyle = styled.div`
    padding: 0 40px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    div {
        img {
            width: 180px;
            height: 36px;
        }
    }
    h4 {
        font-weight: 700;
        font-size: 13px;
        line-height: 18px;
        color: #0f3934;
    }
`;

const PlantInfoContainerStyle = styled.div`
    padding: 0 40px;
    display: flex;
    width: 100%;
    height: 160px;
`;

const PlantImgBoxStyle = styled.div`
    margin-right: 12px;
    width: 160px;
    height: 160px;
    img {
        width: 160px;
        height: 160px;
        object-fit: cover;
    }
`;

const PlantInfoBoxStyle = styled.div`
    margin-top: 5px;
`;

const InfoTextStyle = styled.div`
    margin-bottom: 6px;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
`;

const KoNameStyle = styled.div`
    margin-bottom: 6px;
    font-weight: 700;
    font-size: 16px;
`;

const CateGoryStyle = styled.div`
    margin-bottom: 3px;
    font-weight: 600;
    font-size: 11px;
    line-height: 150%;
`;

const LineStyle = styled.hr`
    margin: 15px 0;
    width: 100%;
`;

const EvaluationContainerStyle = styled.div`
    padding: 0 40px;
    width: 100%;
`;

const EvaluationTextStyle = styled.div<{ error: boolean }>`
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    color: ${({ error }) => (!error ? '#000' : '#F06060')};
`;

const SatisfactionBoxStyle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

const SatisfactionTextStyle = styled.div`
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    margin-right: 20px;
`;

const StyledHeartImg = styled.img`
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

const StyledEmptyImg = styled.img`
    margin-right: 3px;
    width: 26px;
    height: 26px;
    cursor: pointer;
`;

const KeyWordContainerStyle = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
`;

const KeyWordBoxStyle = styled.div`
    margin: 0 3px 10px 0;
    padding: 3px 15px 5px 15px;
    background: #d9d9d9;
    border-radius: 19px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
`;

const SelectKeywordContainer = styled.div`
    padding: 12px 13px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 9px;
    width: 680px;
    border: 1px solid #d9d9d9;
    min-height: 30px;
    border-radius: 5px;
`;

const SelectKeyWordBoxStyle = styled.div`
    margin: 0 3px 10px 0;
    padding: 3px 8px 5px 17px;
    border: 1px solid #0d6637;
    border-radius: 14px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #0d6637;
    img {
        margin-left: 10px;
        width: 12px;
        height: 12px;
        cursor: pointer;
    }
`;

const TextStyle = styled.div`
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 10px;
`;

const FileUploadContainer = styled.div`
    display: flex;
    margin-bottom: 32px;
`;

const FileUploadButton = styled.input`
    display: none;
`;

const FileStyle = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 160px;
    border-radius: 0px 0px 5px 5px;
    background: #f5f5f5;
    border-radius: 0px 0px 5px 5px;
    cursor: pointer;
`;

const PlusIconStyle = styled.img`
    width: 36px;
    height: 36px;
`;

const PlantImgStyle = styled.img`
    width: 160px;
    height: 160px;
    object-fit: cover;
`;

const TrashIcon = styled.img`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const StyledReviewButton = styled.div`
    width: 680px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    background: #0d6637;
    border-radius: 5px;
    font-weight: 500;
    font-size: 17px;
    line-height: 23px;
    color: #fff;
    cursor: pointer;
`;

const ErrorText = styled.span`
    position: relative;
    bottom: 4px;
    margin-left: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #f06060;
`;

const QuillWrapper = styled(ReactQuill).attrs(() => ({
    theme: 'snow',
}))`
    width: 680px;
    height: 210px;
    display: flex;
    flex-direction: column;
    margin-bottom: 38px;
`;
