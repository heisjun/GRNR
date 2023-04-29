import { useEffect } from 'react';
import styled from 'styled-components';

export const ReviewModal: React.FC = () => {
    // const { open, onClose } = props;

    return (
        <></>
        // <ModalContainer open={open}>
        //     <BackdropStyle open={open} onClick={onClose} />
        //     <DialogStyle open={open}>
        //         <DialogHeaderWrapperStyle>
        //             <DialogHeaderBoxStyle>
        //                 <DialogHeaderStyle></DialogHeaderStyle>
        //                 <CloseBox onClick={onClose}>{/* <CloseIconStyle fontSize="small" /> */}</CloseBox>
        //             </DialogHeaderBoxStyle>
        //         </DialogHeaderWrapperStyle>
        //         <DialogBodyStyle>sda</DialogBodyStyle>
        //     </DialogStyle>
        // </ModalContainer>
    );
};

interface IStyled {
    open?: boolean;
    textArea?: boolean;
    width?: number;
    bodyPadding?: boolean;
    bodyOverflow?: boolean;
    headerPadding?: string;
    headerLineHeight?: string;
    headerLeftBoxPosition?: string;
    titleTextColor?: string;
    windowAllVisible?: boolean;
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
    padding: ${({ headerPadding }) => (headerPadding !== '' ? headerPadding : '32px 32px 16px 32px')};
`;

const DialogHeaderBoxStyle = styled.div<IStyled>`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: ${({ headerLineHeight }) => (headerLineHeight !== '' ? headerLineHeight : 'inherit')};
`;

const DialogHeaderStyle = styled.div<IStyled>`
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    ${({ titleTextColor }) => titleTextColor && `color: ${titleTextColor};`};
`;

const CloseBox = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
`;

const DialogBodyStyle = styled.div<IStyled>`
    display: flex;
    flex-direction: column;
    align-items: ${({ textArea }) => !textArea && 'center'};
    justify-content: center;
    padding: ${({ bodyPadding }) => (bodyPadding ? '0 32px' : '0')};
    ${({ bodyOverflow }) => (bodyOverflow ? 'overflow: overlay;' : '')}
    text-align: center;
    line-height: 150%;
    pointer-events: all;
`;
