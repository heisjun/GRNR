import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IReportModal } from './ReportModal.type';

const BASEURL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_USER_TOKEN;

const ReportModal: React.FC<IReportModal> = (props) => {
    const { setOpenModal, reportId } = props;
    const [filterValue, setFilterValue] = useState({ report: '' });
    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFilterValue({ report: value });
        console.log(filterValue.report);
    };

    const onPhotoReport = async (pictureId: number) => {
        const res = await axios.put(
            `${BASEURL}/api/picture/${pictureId}/report?report=${filterValue.report}
        `,
            {},
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${TOKEN}`,
                },
            },
        );

        if (res.status === 201) console.log(res.data);
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
                <StyledReportButton onClick={() => onPhotoReport(Number(reportId))}>신고하기</StyledReportButton>
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
    padding-bottom: 20;
    font-weight: bold;
    height: 10%;
`;

const StyledReasonContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 60%;
`;

const StyledReasonItem = styled.div`
    font-size: 15px;
    padding-bottom: 10px;
    font-weight: 300;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 30%;
    width: 100%;
`;

const StyledReportButton = styled.button`
    padding: 5px;
    margin-top: 10px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    :hover {
        background-color: gray;
        color: white;
    }
`;
export default ReportModal;
