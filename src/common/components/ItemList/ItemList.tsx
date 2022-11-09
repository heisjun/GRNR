import styled from 'styled-components';
import { IItemList } from './ItemList.type';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const ItemList: React.FC<IItemList> = (props) => {
    const { width, imgHeight, horizontalGap, verticalGap, cols, items, RenderComponent, setFunc } = props;
    const length = String((100 - (cols - 1) * horizontalGap) / cols - 0.1) + '%';
    return (
        <StyledItemListContainer width={width}>
            {items.map((item: any, index: number) => (
                <StyledItemBlock
                    key={index}
                    length={length}
                    marginRight={(index + 1) % cols === 0 ? 0 : horizontalGap}
                    marginBottom={verticalGap}
                >
                    <RenderComponent
                        width="100%"
                        paddingBottom={imgHeight}
                        item={item}
                        setFunc={setFunc}
                        items={items}
                    />
                </StyledItemBlock>
            ))}
        </StyledItemListContainer>
    );
};

const StyledItemBlock = styled.div<{ length: string; marginRight: number; marginBottom: number }>`
    width: ${({ length }) => length};
    margin-right: ${({ marginRight }) => marginRight}%;
    margin-bottom: ${({ marginBottom }) => (marginBottom !== 0 ? marginBottom - 0.5 : ``)}px;
    @media screen and (min-width: ${maxWidth}px) {
        margin-right: ${({ marginRight }) => marginRight}%;
        margin-bottom: ${({ marginBottom }) => marginBottom}px;
    }
`;

const StyledItemListContainer = styled.div<{ width: string }>`
    display: flex;
    flex-wrap: wrap;
    width: ${({ width }) => width};
`;

export default ItemList;
