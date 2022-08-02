import styled from 'styled-components';
import { IItemParams } from 'common/types';
import { Avatar } from 'common/components';

const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const TodaysPhoto: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;
    return (
        <StyledTodaysPhotoContainer width={width} height={height} paddingBottom={paddingBottom}>
            <StyledWriterBlock>
                <StyeldAvatarBlock>
                    <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                </StyeldAvatarBlock>
                <StyledNicknameBlock>taemin</StyledNicknameBlock>
            </StyledWriterBlock>
        </StyledTodaysPhotoContainer>
    );
};

const StyledNicknameBlock = styled.div`
    color: grey;
    font-size: 10px;
    margin-left: 3%;
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 1.1px;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: ${maxWidth * 0.011}px;
    }
`;

const StyeldAvatarBlock = styled.div`
    width: 10%;
`;

const StyledWriterBlock = styled.div`
    position: absolute;
    width: 95%;
    top: 85%;
    left: 5%;
    display: flex;
    align-items: center;
`;

const StyledTodaysPhotoContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
`;

export default TodaysPhoto;
