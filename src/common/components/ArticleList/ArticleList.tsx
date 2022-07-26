import styled from 'styled-components';
import { IArticleList } from './ArticleList.type';
import { ArticleItem } from 'common/components';

const ArticleList: React.FC<IArticleList> = (props) => {
    const { width, picHeight, gap, cols, items } = props;
    const length = String((100 - (cols - 1) * gap) / cols - 0.1) + '%';
    return (
        <StyledArticleListContainer width={width}>
            {items.map((item, index) => (
                <StyledArticleItemBlock key={index} length={length} gap={(index + 1) % cols === 0 ? 0 : gap}>
                    <ArticleItem width="100%" paddingBottom={picHeight} item={item} />
                </StyledArticleItemBlock>
            ))}
        </StyledArticleListContainer>
    );
};

const StyledArticleItemBlock = styled.div<{ length: string; gap: number }>`
    width: ${({ length }) => length};
    margin-right: ${({ gap }) => gap}%;
    margin-bottom: ${({ gap }) => gap - 0.5}%;
`;

const StyledArticleListContainer = styled.div<{ width: string }>`
    display: flex;
    flex-wrap: wrap;
    width: ${({ width }) => width};
`;

export default ArticleList;
