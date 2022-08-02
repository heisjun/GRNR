import Filter from 'common/components/Filters';
import React, { useState } from 'react';
import styled from 'styled-components';

const Picture: React.FC = () => {
    const [selected, setSelected] = useState('');
    return (
        <StyledPictureContainer>
            <StyledPictureHeader>
                <Filter selected={selected} setSelected={setSelected} />
            </StyledPictureHeader>
        </StyledPictureContainer>
    );
};

const StyledPictureContainer = styled.div`
    height: 500px;
`;

const StyledPictureHeader = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export default Picture;
