import { Avatar } from 'common/components';
import Slider from 'common/components/Slider';
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { FaHeart, FaRegHeart, FaRegCommentDots, FaBookmark, FaRegBookmark, FaGratipay } from 'react-icons/fa';
import { IFollowingItem } from './FollowingItem.type';
import ModalComments from '../ModalComments';

const FollowingItem: React.FC<IFollowingItem> = (props) => {
    const { data } = props;
    const [isOpenComments, setIsOpenComments] = useState(false);

    return (
        <StyledFollowingFeeds>
            <StyledModalBlock visible={isOpenComments}>
                <StyledModalContent visible={isOpenComments}>
                    {isOpenComments && <ModalComments close={setIsOpenComments} />}
                </StyledModalContent>
            </StyledModalBlock>
            <StyledFeedsBlock>
                <StyledBlockHeader>
                    <StyledHeaderItem>
                        <Avatar width="9%" paddingBottom="9%" borderRadius="100%" />
                        <StyledNickname> {data.nickname}</StyledNickname>
                        <StyledTime> {data.time}</StyledTime>
                    </StyledHeaderItem>
                    <StyledHeaderItem2>
                        <StyledClickText color="lightgray">신고</StyledClickText>
                        <StyledClickText color="gray">팔로우</StyledClickText>
                    </StyledHeaderItem2>
                </StyledBlockHeader>
                <Slider imgdata={data.picUrl} textdata={data.text} />
                <StyledBlockFooter>
                    <StyledFooterItem>
                        <FaRegHeart style={{ fontSize: '30' }} />
                        <div>{data.like}</div>
                    </StyledFooterItem>
                    <StyledFooterItem onClick={() => setIsOpenComments(true)}>
                        <FaRegCommentDots style={{ fontSize: '30' }} />
                    </StyledFooterItem>
                    <StyledFooterItem>
                        <FaRegBookmark style={{ fontSize: '30' }} />
                        <div>{data.bookmark}</div>
                    </StyledFooterItem>
                </StyledBlockFooter>
            </StyledFeedsBlock>
        </StyledFollowingFeeds>
    );
};

const SlideUp = keyframes`
    from{
        transform: translateY(500px);
    }
    to{
        transform:translateY(0px);
    }
`;
const StyledModalBlock = styled.div<{ visible: boolean }>`
    ${(props) =>
        props.visible &&
        css`
            width: 440px;
            height: 700px;
            margin-bottom: 40px;
            background-color: rgba(0, 0, 0, 0.6);
            position: absolute;
            z-index: 20;
            overflow: hidden;
        `}
`;

const StyledModalContent = styled.div<{ visible: boolean }>`
    ${(props) =>
        props.visible &&
        css`
            width: 440px;
            height: 500px;
            top: 200px;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            margin-bottom: 40px;
            background-color: white;
            position: absolute;
            animation-name: ${SlideUp};
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
        `}
`;

const StyledFollowingFeeds = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledFeedsBlock = styled.div`
    border: 1px solid gray;
    width: 440px;
    height: 700px;
    margin-bottom: 40px;
    background-color: white;
`;

const StyledBlockHeader = styled.div`
    display: flex;
    padding: 3%;
    height: 4%;
`;

const StyledHeaderItem = styled.div`
    display: flex;
    width: 80%;
    align-items: center;
`;

const StyledNickname = styled.div`
    color: gray;
    font-size: 14px;
    font-weight: 400;
    padding-left: 10px;
    padding-right: 10px;
`;

const StyledClickText = styled.div<{ color: string }>`
    color: ${(props) => props.color};
    font-size: 14px;
    font-weight: 400;
`;

const StyledTime = styled.div`
    color: lightgray;
    font-size: 12px;
`;

const StyledHeaderItem2 = styled.div`
    display: flex;
    width: 20%;
    align-items: center;
    justify-content: space-between;
`;

const StyledBlockFooter = styled.div`
    height: 7.5%;
    display: flex;
    align-items: center;
`;

const StyledFooterItem = styled.div`
    display: flex;
    width: 33.3%;
    height: 55px;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    border-top: 1px solid gray;
    border-right: 0.5px solid gray;
`;

export default FollowingItem;
