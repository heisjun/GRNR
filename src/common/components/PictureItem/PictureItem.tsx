import styled from 'styled-components';
import { IPictureItem } from './PictureItem.type';
const PictureItem: React.FC<IPictureItem> = (props) => {
    const { width, height, paddingBottom, item } = props;
    return (
        <StyledPictureItemContainer
            width={width}
            height={height ? height : ''}
            paddingBottom={paddingBottom ? paddingBottom : ''}
        ></StyledPictureItemContainer>
    );
};

const StyledPictureItemContainer = styled.div<{ width: string; height: string; paddingBottom?: string }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
`;

export default PictureItem;
