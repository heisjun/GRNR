import styled from 'styled-components';
import { IArticleItem } from './ArticleItem.type';
const ArticleItem: React.FC<IArticleItem> = (props) => {
    const { width, height, paddingBottom, item } = props;
    return (
        <StyledArticleItemContainer width={width}>
            <StyledArticleItemBlock height={height} paddingBottom={paddingBottom} />
            <StyledSummaryContainer>
                <StyledTitleBlock>아티클 타이틀</StyledTitleBlock>
                <StyledWriterBlock>작성자</StyledWriterBlock>
            </StyledSummaryContainer>
        </StyledArticleItemContainer>
    );
};

const StyledWriterBlock = styled.div`
    font-size: 13px;
    font-weight: bold;
    color: grey;
`;

const StyledTitleBlock = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: grey;
`;

const StyledSummaryContainer = styled.div``;

const StyledArticleItemBlock = styled.div<{ height?: string; paddingBottom?: string }>`
    width: 100%;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

const StyledArticleItemContainer = styled.div<{ width: string }>`
    width: ${({ width }) => width};
`;

export default ArticleItem;
