import styled from 'styled-components';
import { IPictureList } from './PictureList.type';
import { PictureItem } from 'common/components';
const PictureList: React.FC<IPictureList> = (props) => {
    const { width, height, gap, cols, items } = props;
    const length = String((100 - (cols - 1) * gap - 0) / cols - 0.1) + '%';
    return (
        <StyledPictureListContainer width={width} height={height}>
            {items.map((item, index) => (
                <StyledPictureItemBlock
                    key={index}
                    length={length}
                    marginRight={(index + 1) % cols === 0 ? '' : `${gap}%`}
                >
                    <PictureItem width="100%" paddingBottom="100%" item={item} />
                </StyledPictureItemBlock>
            ))}
        </StyledPictureListContainer>
    );
};

const StyledPictureItemBlock = styled.div<{ length: string; marginRight: string }>`
    width: ${({ length }) => length};
    height: ${({ length }) => length};
    margin-right: ${({ marginRight }) => marginRight};
`;

const StyledPictureListContainer = styled.div<{ width: string; height: string }>`
    display: flex;
    flex-wrap: wrap;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export default PictureList;
