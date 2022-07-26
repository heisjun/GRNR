import styled from 'styled-components';
import { IAvatar } from './Avatar.interface';

const Avatar: React.FC<IAvatar> = (props) => {
    const { picUrl, width, height, paddingBottom, borderRadius } = props;
    return (
        <StyledAvatarContainer width={width} height={height} paddingBottom={paddingBottom} borderRadius={borderRadius}>
            <StyledAvatarImage src="sample.jpg" borderRadius={borderRadius} />
        </StyledAvatarContainer>
    );
};

const StyledAvatarImage = styled.img<{ borderRadius: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ borderRadius }) => borderRadius};
    border-color: silver;
    border-style: solid;
    border-width: 1.5px;
`;

const StyledAvatarContainer = styled.div<{
    width: string;
    height?: string;
    paddingBottom?: string;
    borderRadius: string;
}>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

export default Avatar;
