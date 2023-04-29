import Modal from 'react-modal';
import styled from 'styled-components';

interface DialogBoxProps {
    showDialog: boolean;
    cancelNavigation: any;
    confirmNavigation: any;
    content: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ showDialog, cancelNavigation, confirmNavigation, content }) => {
    return (
        <Modal isOpen={showDialog} style={customStyles}>
            <StyledModalContainer>
                <StyledDeleteItemBtn onClick={cancelNavigation}>X</StyledDeleteItemBtn>
                <StyledContentBlock>
                    <StyledTitle>페이지를 벗어나시겠습니까?</StyledTitle>
                    <Styledcontent>{content}</Styledcontent>
                    <StyledConfirmBtn onClick={confirmNavigation}>확인</StyledConfirmBtn>
                </StyledContentBlock>
            </StyledModalContainer>
        </Modal>
    );
};

const StyledDeleteItemBtn = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid lightgrey;
    font-weight: 400;
    color: gray;
    border: none;
    cursor: pointer;
    font-size: 20px;
    :hover {
        background-color: red;
        color: white;
    }
`;

const StyledConfirmBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-top: 10px;
    font-size: 15px;
    border: none;
    background-color: #0d6637;
    color: white;
    width: 50px;
    height: 30px;
    cursor: pointer;
    :hover {
    }
`;

const StyledTitle = styled.div`
    font-size: 18px;
`;
const Styledcontent = styled.div`
    font-size: 18px;
`;

const StyledModalContainer = styled.div`
    padding-top: 25px;
`;

const StyledContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const customStyles = {
    content: {
        left: '0',
        margin: 'auto',
        width: '550px',
        height: '140px',
        padding: '0',
    },
};
export default DialogBox;
