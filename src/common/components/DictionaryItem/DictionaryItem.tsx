import React from 'react';
import styled from 'styled-components';
import { IItemParams } from 'common/types';
import { FaChevronRight, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useState } from 'react';

const DictionaryItem: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;
    const [bookmark, setBookmark] = useState(false);
    const onToggle = () => setBookmark(!bookmark);

    return (
        <StyledMagazineItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <StyledPictureBlock src={item.urlToImage} />
            {!bookmark ? (
                <FaRegBookmark className="logo" onClick={onToggle} />
            ) : (
                <FaBookmark className="logo" onClick={onToggle} />
            )}
            <StyledTitleBlock>
                <StyledContent>
                    <StyledTitleText>{item.title}</StyledTitleText>
                    <FaChevronRight />
                </StyledContent>
            </StyledTitleBlock>
        </StyledMagazineItemContainer>
    );
};

const StyledTitleText = styled.div`
    color: grey;
    font-size: 13px;
    margin-left: 2%;
    font-weight: bold;
`;

const StyledPictureBlock = styled.img`
    position: absolute;
    top: 0%;
    height: 85%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px 5px 0px 0px;
`;
const StyledTitleBlock = styled.div`
    position: absolute;
    top: 85%;
    display: flex;
    align-items: center;
    width: 100%;
    height: 15%;
    background-color: white;
    border-radius: 0px 0px 5px 5px;
`;

const StyledContent = styled.div`
    justify-content: space-between;
    display: flex;
    padding: 5px;
    width: 100%;
    align-items: center;
`;

const StyledMagazineItemContainer = styled.div<{
    width: string;
    height?: string;
    paddingBottom?: string;
    bookmark?: boolean;
}>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border: solid 1.5px;
    border-radius: 5px;
    border-color: grey;
    background-color: white;
    .logo {
        color: white;
        position: absolute;
        top: 5%;
        height: 10%;
        left: 85%;
        width: 15%;
    }
`;

export default React.memo(DictionaryItem);
