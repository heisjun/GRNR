import React, { useState, useRef, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import Modal from 'react-modal';
import { IAddressBox } from './AddressBox.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;

const AddressBox: React.FC<IAddressBox> = (props) => {
    const { setGetAddress } = props;
    const sendAddress = () => {
        setGetAddress(roadAddress);
    };
    const [roadAddress, setRoadAddress] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const completeHandler = (data: any) => {
        setRoadAddress(data.roadAddress);
        setIsOpen(false);
    };

    // 검색 클릭
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const dropdownListRef = useRef<any>(null);

    //외부 영역 클릭시 드롭다운 비활성화
    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (dropdownListRef.current && !dropdownListRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownListRef]);

    useEffect(() => {
        sendAddress();
    }, [roadAddress]);

    return (
        <StyledAddressBoxContainer ref={dropdownListRef}>
            <StyledInput value={roadAddress} readOnly placeholder="도로명 주소" onClick={toggle} />
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                <DaumPostcode onComplete={completeHandler} style={{ height: '100%' }} />
            </Modal>
        </StyledAddressBoxContainer>
    );
};
const StyledAddressBoxContainer = styled.div``;

const StyledInput = styled.input`
    width: 97%;
    font-size: 1.3vw;
    padding: 5px;
    margin-bottom: 5px;
    background: lightgrey;
    border-color: lightgrey;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 2.5vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 15px;
    }
`;

// Modal 스타일
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        left: '0',
        margin: 'auto',
        width: '400px',
        height: '500px',
        padding: '0',
        overflow: 'hidden',
    },
};

export default AddressBox;
