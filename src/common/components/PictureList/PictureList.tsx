import styled from 'styled-components';
import { IPictureList } from './PictureList.type';
import { PictureItem } from 'common/components';

const PictureList: React.FC<IPictureList> = (props) => {
    const { width, height, gap, cols, items } = props;
    const length = String((100 - (cols - 1) * gap) / cols - 0.1) + '%';
    return (
        <StyledPictureListContainer width={width}>
            {items.map((item, index) => (
                <StyledPictureItemBlock key={index} length={length} gap={(index + 1) % cols === 0 ? 0 : gap}>
                    <PictureItem width="100%" paddingBottom={height} item={item} />
                </StyledPictureItemBlock>
            ))}
        </StyledPictureListContainer>
    );
};

const StyledPictureItemBlock = styled.div<{ length: string; gap: number }>`
    width: ${({ length }) => length};
    margin-right: ${({ gap }) => gap}%;
    margin-bottom: ${({ gap }) => gap - 0.5}%;
`;

const StyledPictureListContainer = styled.div<{ width: string }>`
    display: flex;
    flex-wrap: wrap;
    width: ${({ width }) => width};
`;

export default PictureList;
