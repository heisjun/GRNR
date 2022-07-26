import styled from 'styled-components';
import { IPictureItem } from './PictureItem.type';
import { Avatar } from 'common/components';

const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;

const PictureItem: React.FC<IPictureItem> = (props) => {
    const { width, height, paddingBottom, item } = props;
    return (
        <StyledPictureItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <StyledWriterBlock>
                <StyeldAvatarBlock>
                    <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                </StyeldAvatarBlock>
                <StyledNicknameBlock>정태민</StyledNicknameBlock>
            </StyledWriterBlock>
        </StyledPictureItemContainer>
    );
};

const StyledNicknameBlock = styled.div`
    font-weight: bold;
    color: grey;
    font-size: 1.2vw;
    margin-left: 10px;
    @media screen and (min-width: ${maxWidth}px) {
        font-size: ${maxWidth * 0.012}px;
    }
`;

const StyeldAvatarBlock = styled.div`
    width: 20%;
`;

const StyledWriterBlock = styled.div`
    position: absolute;
    width: 60%;
    top: 80%;
    left: 5%;
    display: flex;
    align-items: center;
`;

const StyledPictureItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
`;

export default PictureItem;
