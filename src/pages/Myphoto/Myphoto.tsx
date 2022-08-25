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

const StyledProfileBlock = styled.div`
    position: relative;
    width: 90%;
    padding-bottom: 170%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 75%;
    height: 5000px;
`;

const StyledMyphotoContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
`;

export default Myphoto;
