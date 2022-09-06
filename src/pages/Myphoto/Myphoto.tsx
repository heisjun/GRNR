import styled from 'styled-components';
import { ItemList, MyphotoItem } from 'common/components';
import { Profile } from 'domains';
import { IMyphotoParams } from 'common/types';

const Myphoto: React.FC = () => {
    const data: IMyphotoParams[] = [
        {
            imgUr: 'test',
            like: 123,
            comment: 1253,
            scrap: 1,
        },
        {
            imgUr: 'test',
            like: 123,
            comment: 123,
            scrap: 123,
        },
        {
            imgUr: 'test',
            like: 123,
            comment: 123,
            scrap: 123,
        },
        {
            imgUr: 'test',
            like: 123,
            comment: 123,
            scrap: 123,
        },
        {
            imgUr: 'test',
            like: 123,
            comment: 123,
            scrap: 123,
        },
        {
            imgUr: 'test',
            like: 123,
            comment: 123,
            scrap: 123,
        },
        {
            imgUr: 'test',
            like: 123,
            comment: 123,
            scrap: 123,
        },
    ];

    return (
        <StyledMyphotoContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledTitleBlock>
                    <StyledTitleText>사진</StyledTitleText>
                    <StyledTitleNumber>{data.length}</StyledTitleNumber>
                </StyledTitleBlock>
                <ItemList
                    width="100%"
                    imgHeight="115%"
                    cols={3}
                    horizontalGap={4}
                    verticalGap={2}
                    items={data}
                    RenderComponent={MyphotoItem}
                />
            </StyledContextContainer>
        </StyledMyphotoContainer>
    );
};

const StyledTitleText = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: grey;
`;

const StyledTitleNumber = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: silver;
    margin-left: 5px;
`;

const StyledTitleBlock = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
`;

const StyledProfileBlock = styled.div`
    position: relative;
    width: 85%;
    padding-bottom: 150%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 73%;
    height: 5000px;
    margin-left: 2%;
`;

const StyledMyphotoContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
`;

export default Myphoto;
