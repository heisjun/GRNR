import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList, MagazineItem } from 'common/components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Magazine: React.FC = () => {
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 1);
    const [magazineGap, setMagazineGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 6);
    const mgzData = [{}, {}, {}, {}, {}, {}, {}, {}];

    const resizeHandler = () => {
        setMagazineCols(window.innerWidth > Number(boundaryWidth) ? 2 : 1);
        setMagazineGap(window.innerWidth > Number(boundaryWidth) ? 2 : 6);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <StyledMagazineContainer>
            <ItemList
                width="100%"
                imgHeight="70%"
                cols={magazineCols}
                horizontalGap={magazineGap}
                verticalGap={magazineGap}
                items={mgzData}
                RenderComponent={MagazineItem}
            />
        </StyledMagazineContainer>
    );
};

const StyledMagazineContainer = styled.div`
    height: 5000px;
`;

export default Magazine;
