import styled from 'styled-components';
import { IItemParams } from 'common/types';

const MagazineItem: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;
    return (
        <StyledMagazineItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <StyledTitleBlock>
                <StyledTitleText>아레카야자를 곁들인 화이트 우드톤 홈 플랜트 디자인</StyledTitleText>
            </StyledTitleBlock>
        </StyledMagazineItemContainer>
    );
};

const StyledTitleText = styled.div`
    color: grey;
    font-size: 13px;
    margin-left: 2%;
`;

const StyledTitleBlock = styled.div`
    position: absolute;
    top: 90%;
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    background-color: white;
`;

const StyledMagazineItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border: solid 1.5px;
    border-radius: 5px;
    border-color: grey;
    background-color: silver;
`;

export default MagazineItem;
