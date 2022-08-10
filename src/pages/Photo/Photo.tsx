import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Filters, ItemList, PhotoItem } from 'common/components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Photo: React.FC = () => {
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 1);
    const [photoHorizontalGap, setPhotoHorizontalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 0);
    const [photoVerticalGap, setPhotoVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);

    const [selected, setSelected] = useState('');

    const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

    const resizeHandler = () => {
        setPhotoCols(window.innerWidth > Number(boundaryWidth) ? 4 : 1);
        setPhotoHorizontalGap(window.innerWidth > Number(boundaryWidth) ? 2 : 0);
        setPhotoVerticalGap(window.innerWidth > Number(boundaryWidth) ? 4 : 4);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <StyledPhotoContainer>
            <StyledPhotoHeader>
                <Filters selected={selected} setSelected={setSelected} />
            </StyledPhotoHeader>
            <ItemList
                width="100%"
                imgHeight="150%"
                cols={photoCols}
                horizontalGap={photoHorizontalGap}
                verticalGap={photoVerticalGap}
                items={data}
                RenderComponent={PhotoItem}
            />
        </StyledPhotoContainer>
    );
};

const StyledPhotoContainer = styled.div`
    height: 500px;
`;

const StyledPhotoHeader = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export default Photo;
