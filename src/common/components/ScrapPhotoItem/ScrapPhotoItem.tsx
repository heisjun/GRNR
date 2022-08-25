import styled from 'styled-components';
import { IItemParams } from 'common/types';
import { Avatar } from 'common/components';

const ScrapPhotoItem: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;
    return (
        <StyledPhotoItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <StyledHeaderBlock>
                <StyledWriterBlock>
                    <StyeldAvatarBlock>
                        <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                    </StyeldAvatarBlock>
                    <StyledWriterText>taemin</StyledWriterText>
                </StyledWriterBlock>
            </StyledHeaderBlock>
            <StyledPhotoBlock></StyledPhotoBlock>
        </StyledPhotoItemContainer>
    );
};

const StyeldAvatarBlock = styled.div`
    width: 15%;
`;

const StyledWriterText = styled.div`
    margin-left: 5%;
    font-size: 13px;
    font-weight: bold;
    color: grey;
`;

const StyledWriterBlock = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const StyledHeaderBlock = styled.div`
    position: absolute;
    height: 14%;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
`;

const StyledPhotoBlock = styled.div`
    position: absolute;
    top: 15%;
    width: 100%;
    height: 78%;
    background-color: silver;
`;

const StyledPhotoItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

export default ScrapPhotoItem;
