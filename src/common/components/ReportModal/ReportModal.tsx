import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IReportModal } from './ReportModal.type';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const ReportModal: React.FC<IReportModal> = (props) => {
    const { setOpenModal, reportId, category, type } = props;
    const navigate = useNavigate();
    const [filterValue, setFilterValue] = useState({ report: '' });
    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFilterValue({ report: value });
    };

    const onClickReport = async (reportId: number) => {
        if (type === 'photo') {
            console.log('사진신고중');
            const res = await axios.put(
                `${BASEURL}/api/picture/${reportId}/report?report=${filterValue.report}
        `,
                {},
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            setOpenModal(false);
            window.location.replace('/community/photo');
            if (res.status === 201) console.log(res.data);
        } else if (type === 'comment') {
            console.log('댓글신고중');
            const res = await axios.put(
                `${BASEURL}/api/${category}/comment/${reportId}/report?report=신고된 댓글입니다
            `,
                {},
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            setOpenModal(false);
            window.location.replace('./');
            if (res.status === 201) console.log(res.data);
        }
    };

    return (
        <StyledReportContainer>
            <StyledReportTitle>신고 사유를 선택하세요</StyledReportTitle>
            <StyledReasonContainer>
                <StyledReasonItem>
                    <input value="주제와 맞지 않음" name="report" type="radio" onChange={handleChange} />
                    주제와 맞지 않음
                </StyledReasonItem>
                <StyledReasonItem>
                    <input value="정보가 부정확함" name="report" type="radio" onChange={handleChange} />
                    정보가 부정확함
                </StyledReasonItem>
                <StyledReasonItem>
                    <input value="지나친 광고성 게시물" name="report" type="radio" onChange={handleChange} />
                    지나친 광고성 게시물
                </StyledReasonItem>
                <StyledReasonItem>
                    <input value="욕설/비방이 심함" name="report" type="radio" onChange={handleChange} />
                    욕설/비방이 심함
                </StyledReasonItem>
                <StyledReasonItem>
                    <input value="외설적인 게시물" name="report" type="radio" onChange={handleChange} />
                    외설적인 게시물
                </StyledReasonItem>
                <StyledReasonItem>
                    <input value="기타" name="report" type="radio" onChange={handleChange} />
                    기타
                </StyledReasonItem>
            </StyledReasonContainer>
            <StyledButtonContainer>
                <StyledReportButton onClick={() => onClickReport(Number(reportId))}>신고하기</StyledReportButton>
                <StyledReportButton onClick={() => setOpenModal(false)}>닫기</StyledReportButton>
            </StyledButtonContainer>
        </StyledReportContainer>
    );
};

const StyledReportContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;

const StyledReportTitle = styled.div`
    font-size: 30;
    margin-bottom: 25px;
    font-weight: bold;
`;

const StyledReasonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledReasonItem = styled.div`
    font-size: 15px;
    padding-bottom: 10px;
    font-weight: 300;
    input {
        cursor: pointer;
        accent-color: green;
    }
`;

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 200px;
`;

const StyledReportButton = styled.button`
    padding: 5px;
    margin-top: 10px;
    font-size: 15px;
    border: none;
    cursor: pointer;
    :hover {
        background-color: #0d6637;
        color: white;
    }
`;
export default ReportModal;
