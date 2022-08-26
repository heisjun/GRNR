import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList, MagazineItem } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Magazine: React.FC = () => {
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 1);
    const [magazineGap, setMagazineGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 6);

    const [pageAnim, setPageAnim] = useState<any>(FadeIn);

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

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledMagazineContainer pageAnim={pageAnim}>
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

const StyledMagazineContainer = styled.div<{ pageAnim: any }>`
    height: 5000px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

export default Magazine;
