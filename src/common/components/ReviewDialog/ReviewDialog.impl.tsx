import styled from 'styled-components';
import { IReviewDialogProps } from './ReviewDialog.interface';

export const ReviewDialogModal: React.FC<IReviewDialogProps> = (props) => {
    const { open, onClose, resetBtn } = props;

    return (
        <ModalContainer open={open}>
            <BackdropStyle open={open} onClick={() => onClose(false)} />
            <DialogStyle open={open}>
                <DialogBodyStyle>
                    <TextBox>리뷰를 작성하지 않고 나가겠습니까?</TextBox>
                    <TextBox style={{ marginBottom: '17px' }}> 작성한 내용은 저장되지 않습니다.</TextBox>
                    <ButtonContainer>
                        <CancelBtnStyle onClick={() => onClose(false)}>취소</CancelBtnStyle>
                        <LeaveBtStyle onClick={resetBtn}>나가기</LeaveBtStyle>
                    </ButtonContainer>
                </DialogBodyStyle>
            </DialogStyle>
        </ModalContainer>
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
    z-index: 4000;
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
    width: 300px;
    height: 150px;
    box-shadow: 0 6px 20px 0 rgb(0 0 0 / 10%);
    display: flex;
    flex-direction: column;
    font-size: 14px;
    opacity: ${({ open }) => (open ? 1 : 0)};
    transform: ${({ open }) => (open ? 'translateY(0) translateZ(0)' : 'translateY(40px) translateZ(0)')};
    transition: all 0.3s;
`;

const DialogBodyStyle = styled.div<IStyled>`
    padding: 16px 16px 9px 16px;
`;

const TextBox = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CancelBtnStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 129px;
    height: 50px;
    background: #ffffff;
    border: 0.3px solid #d9d9d9;
    border-radius: 5px;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    cursor: pointer;
`;

const LeaveBtStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 129px;
    height: 50px;
    background: #0d6637;
    border-radius: 5px;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    cursor: pointer;
`;
