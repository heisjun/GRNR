import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList, DictionaryItem } from 'common/components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Dictionary: React.FC = () => {
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [magazineGap, setMagazineGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 6);
    const mgzData = [{}, {}, {}, {}, {}, {}, {}, {}];

    const resizeHandler = () => {
        setMagazineCols(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
        setMagazineGap(window.innerWidth > Number(boundaryWidth) ? 4 : 6);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <StyledDictionaryContainer>
            <ItemList
                width="100%"
                imgHeight="80%"
                cols={magazineCols}
                horizontalGap={magazineGap}
                verticalGap={magazineGap}
                items={mgzData}
                RenderComponent={DictionaryItem}
            />
        </StyledDictionaryContainer>
    );
};

const StyledDictionaryContainer = styled.div`
    height: 5000px;
`;

export default Dictionary;
