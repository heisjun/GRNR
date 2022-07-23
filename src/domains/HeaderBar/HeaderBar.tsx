import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { IHeaderBar } from './HeaderBar.type';
import { SubTabBar } from 'domains';
import { headerItems } from 'common/data';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const HeaderBar: React.FC<IHeaderBar> = (props) => {
    const { children } = props;
    const [scrollDownToggle, setScrollDownToggle] = useState<boolean>(false);
    const [prevPosY, setPrevPosY] = useState<number>(0);
    const [crntPosY, setCrntPosY] = useState<number>(0);
    const [fadeAnim, setFadeAnim] = useState<any>();
    const [overPage, setOverPage] = useState<number>(0);
    const [crntPage, setCrntPage] = useState<number>(0);

    const scrollHandler = () => {
        setCrntPosY(window.scrollY);
    };

    useEffect(() => {
        if (crntPosY >= 50 && crntPosY > prevPosY) {
            setScrollDownToggle(true);
        } else {
            setScrollDownToggle(false);
        }
        setPrevPosY(crntPosY);
    }, [crntPosY]);

    useEffect(() => {
        scrollDownToggle === true ? setFadeAnim(headerFadeOut) : setFadeAnim(headerFadeIn);
    }, [scrollDownToggle]);

    useEffect(() => {
        setFadeAnim(null);
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    useEffect(() => {
        setOverPage(crntPage);
    }, [crntPage]);

    return (
        <StyledContainer onMouseLeave={() => setOverPage(crntPage)}>
            <StyledHeaderBarContainer fadeAnim={fadeAnim}>
                <StyledHeaderBar>
                    <StyledMenuButton />
                    <StyledTitleBlock>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <StyledTitleText>로고</StyledTitleText>
                        </Link>
                    </StyledTitleBlock>

                    {headerItems.map((item, index) => (
                        <StyledMenuItemBlock key={index}>
                            <Link
                                to={item.link}
                                style={{ textDecoration: 'none' }}
                                onClick={() => setCrntPage(index)}
                                onMouseEnter={() => setOverPage(index)}
                            >
                                <StyledMenuItemText color={index === crntPage ? 'black' : 'silver'}>
                                    {item.name}
                                </StyledMenuItemText>
                            </Link>
                        </StyledMenuItemBlock>
                    ))}

                    <StyledSearchButton />
                    <StyledCartButton />
                </StyledHeaderBar>
            </StyledHeaderBarContainer>
            <StyledSubTabBarBlock>
                <SubTabBar page={overPage} visible={!scrollDownToggle} />
            </StyledSubTabBarBlock>
            <StyledContentContainer>
                <StyledContentBlock>{children}</StyledContentBlock>
            </StyledContentContainer>
        </StyledContainer>
    );
};

const headerFadeIn = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const headerFadeOut = keyframes`
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-100%);
    }
`;

const StyledSubTabBarBlock = styled.div`
    position: fixed;
    width: 100%;
    top: 50px;
    @media screen and (min-width: ${boundaryWidth}px) {
        top: 80px;
    }
`;

const StyledMenuButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: ${boundaryWidth}px) {
        display: none;
    }
`;

const StyledSearchButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: ${boundaryWidth}px) {
        display: none;
    }
`;

const StyledCartButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: ${boundaryWidth}px) {
        display: none;
    }
`;

const StyledTitleText = styled.h1`
    font-size: 20px;
    cursor: pointer;
    color: black;
    &:hover {
        color: #bce55c;
    }
`;

const StyledTitleBlock = styled.div`
    @media screen and (max-width: ${boundaryWidth}px) {
        margin: 0 auto;
    }
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 25px;
    }
`;

const StyledMenuItemText = styled.text<{ color: string }>`
    font-size: 15px;
    cursor: pointer;
    color: ${({ color }) => color};
    &:hover {
        color: #bce55c;
    }
`;

const StyledMenuItemBlock = styled.h2`
    margin-left: 50px;
    @media screen and (max-width: ${boundaryWidth}px) {
        display: none;
    }
`;

const StyledContentBlock = styled.div`
    width: 100%;
    @media screen and (min-width: ${boundaryWidth}px) {
        padding: 0px 30px 0px 30px;
    }
    @media screen and (min-width: ${maxWidth}px) {
        width: ${maxWidth}px;
    }
`;

const StyledContentContainer = styled.div`
    background-color: white;
    display: flex;
    margin-top: 100px;
    justify-content: center;
    @media screen and (min-width: ${boundaryWidth}px) {
        margin-top: 150px;
    }
`;

const StyledHeaderBarContainer = styled.div<{ fadeAnim: any }>`
    position: fixed;
    top: 0px;
    display: flex;
    z-index: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    @media screen and (max-width: ${boundaryWidth}px) {
        animation: ${({ fadeAnim }) => fadeAnim} 0.1s;
        animation-fill-mode: forwards;
    }
`;

const StyledHeaderBar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-right: 20px;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 80px;
        padding: 0px 30px 0px 30px;
    }
    @media screen and (min-width: ${maxWidth}px) {
        width: ${maxWidth}px;
    }
`;
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default HeaderBar;
