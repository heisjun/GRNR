import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'common/components';
import { IModalComments } from './ModalComments.type';

const ModalComments: React.FC<IModalComments> = (props) => {
    const { close } = props;
    return (
        <StyledCommentContainer>
            <StyledCommentHeader>
                <StyledCommentText>댓글 3개</StyledCommentText>
                <StyledCloseBtn onClick={() => close(false)}>X</StyledCloseBtn>
            </StyledCommentHeader>
            <StyledCommentBody></StyledCommentBody>

            <StyledCommentFooter>
                <StyledFooterWrapper>
                    <StyledFooterContents>
                        <StyledAvatarWrapper>
                            <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                        </StyledAvatarWrapper>
                        <StyledCommentWrapper>
                            <StyledWritingArea></StyledWritingArea>
                        </StyledCommentWrapper>
                    </StyledFooterContents>
                </StyledFooterWrapper>
            </StyledCommentFooter>
        </StyledCommentContainer>
    );
};

const StyledCloseBtn = styled.div`
    cursor: pointer;
    color: gray;
    padding: 5px;
`;

const StyledWritingArea = styled.input`
    margin-left: 10px;
    border-radius: 20px;
    height: 30px;
    padding-left: 10px;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: gray;
    width: 90%;
`;

const StyledFooterContents = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const StyledNickname = styled.span`
    color: gray;
    font-size: 14px;
    font-weight: 500;
    padding-right: 5px;
`;

const StyledCommentContainer = styled.div`
    height: 100%;
`;

const StyledCommentHeader = styled.div`
    height: 12%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
`;

const StyledCommentBody = styled.div`
    height: 78%;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
`;

const StyledCommentFooter = styled.div`
    height: 10%;
`;

const StyledFooterWrapper = styled.div`
    padding: 7px;
`;

const StyledAvatarWrapper = styled.div`
    width: 8%;
`;

const StyledCommentWrapper = styled.div`
    width: 92%;
`;
const StyledCommentText = styled.div`
    font-size: 15px;
    color: gray;
`;

export default ModalComments;
