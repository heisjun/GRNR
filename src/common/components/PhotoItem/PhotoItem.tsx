import styled from 'styled-components';
import { IItemParams } from 'common/types';

const PhotoItem: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;
    return (
        <StyledPhotoItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <StyledHeaderBlock>
                <StyledWriterBlock></StyledWriterBlock>
                <StyledFollowButton />
            </StyledHeaderBlock>
        </StyledPhotoItemContainer>
    );
};

const StyledFollowButton = styled.div`
    width: 10%;
    padding-bottom: 5%;
    border-radius: 10px;
    border-color: grey;
`;

const StyledWriterBlock = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const StyledHeaderBlock = styled.div`
    position: absolute;
    padding-bottom: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
`;

const StyledPhotoItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    background-color: silver;
`;

export default PhotoItem;
