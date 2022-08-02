import styled from 'styled-components';
import { IItemParams } from 'common/types';
import { Avatar } from 'common/components';

const TodaysArticle: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;
    return (
        <StyledTodaysArticleContainer width={width}>
            <StyledArticleItemBlock height={height} paddingBottom={paddingBottom} />
            <StyledSummaryContainer>
                <StyledTitleBlock>식물이 주는 영감을 통해 작업합니다.</StyledTitleBlock>
                <StyledWriterBlock>
                    <StyeldAvatarBlock>
                        <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
                    </StyeldAvatarBlock>
                    <StyledWriterText>taemin</StyledWriterText>
                </StyledWriterBlock>
            </StyledSummaryContainer>
        </StyledTodaysArticleContainer>
    );
};

const StyeldAvatarBlock = styled.div`
    width: 9%;
`;

const StyledWriterText = styled.div`
    margin-left: 2%;
    font-size: 13px;
    color: grey;
`;

const StyledWriterBlock = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2px;
`;

const StyledTitleBlock = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: grey;
`;

const StyledSummaryContainer = styled.div`
    margin-top: 10px;
`;

const StyledArticleItemBlock = styled.div<{ height?: string; paddingBottom?: string }>`
    width: 100%;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

const StyledTodaysArticleContainer = styled.div<{ width: string }>`
    width: ${({ width }) => width};
`;

export default TodaysArticle;
