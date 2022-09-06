import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { IDailyPlant } from './DailyPlant.type';

const DailyPlant: React.FC<IDailyPlant> = (props) => {
    const { width, height, borderRadius, paddingBottom, imgUrls } = props;
    const [crntPage, setCrntPage] = useState(0);
    const [imgAnim, setImgAnim] = useState<any>();

    const slideRef = useRef<any>(null);

    const slideTime = 5000;
    const pageNum = imgUrls.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setCrntPage((crntPage) => crntPage + 1);
        }, slideTime);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (crntPage >= pageNum) {
            setCrntPage(0);
        } else {
            slideRef.current.style.transition = 'all 0.5s ease-in-out';
            slideRef.current.style.transform = `translateX(-${(100 / pageNum) * crntPage}%)`;
        }
    }, [crntPage]);

    return (
        <StyledDailyPlantContainer
            width={width}
            height={height ? height : ''}
            paddingBottom={paddingBottom ? paddingBottom : ''}
            borderRadius={borderRadius}
        >
            <StyledImgContainer pageNum={pageNum}>
                <StyledImgBlock pageNum={pageNum} ref={slideRef}>
                    {imgUrls.map((item, index) => (
                        <StyledImg
                            key={index}
                            src={`${process.env.REACT_APP_BASE_SRC}/sample2.jpg`}
                            width={`${100 / pageNum}%`}
                            height="100%"
                            onMouseEnter={() => {
                                setImgAnim(ImageScaleUp);
                            }}
                            onMouseLeave={() => {
                                setImgAnim(ImageScaleDown);
                            }}
                            imgAnim={index === crntPage ? imgAnim : null}
                        />
                    ))}
                </StyledImgBlock>
                {crntPage !== 0 ? <StyledPrevButton onClick={() => setCrntPage(crntPage - 1)} /> : null}
                {crntPage !== pageNum - 1 ? <StyledNextButton onClick={() => setCrntPage(crntPage + 1)} /> : null}
                <StyledIndicatorBlock>
                    {imgUrls.map((item, index) => (
                        <StyledIndicator key={index} focused={index === crntPage} onClick={() => setCrntPage(index)} />
                    ))}
                </StyledIndicatorBlock>
            </StyledImgContainer>
        </StyledDailyPlantContainer>
    );
};

const ImageScaleUp = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.1);
    }
`;

const ImageScaleDown = keyframes`
    0% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    object-fit: cover;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledIndicator = styled.div<{ focused: boolean }>`
    width: 15%;
    padding-bottom: 15%;
    border-radius: 100%;
    background-color: ${({ focused }) => (focused ? 'grey' : 'silver')};
    cursor: pointer;
`;

const StyledIndicatorBlock = styled.div`
    position: absolute;
    width: 20%;
    height: 5%;
    top: 90%;
    left: 40%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const StyledPrevButton = styled.div`
    position: absolute;
    top: 45%;
    left: 0%;
    width: 10%;
    height: 8%;
    border-radius: 100%;
    cursor: pointer;
    &:hover {
        background-color: silver;
    }
`;

const StyledNextButton = styled.div`
    position: absolute;
    top: 45%;
    left: 90%;
    width: 10%;
    height: 8%;
    border-radius: 100%;
    cursor: pointer;
    &:hover {
        background-color: silver;
    }
`;

const StyledImgBlock = styled.div<{ pageNum: number }>`
    width: ${({ pageNum }) => pageNum * 100}%;
    height: 100%;
`;

const StyledImgContainer = styled.div<{ pageNum: number }>`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const StyledDailyPlantContainer = styled.div<{
    width: string;
    height: string;
    paddingBottom: string;
    borderRadius: string;
}>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border-radius: ${({ borderRadius }) => borderRadius};
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
`;

export default DailyPlant;
