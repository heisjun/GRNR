import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { IMypageTabBar } from './MypageTabBar.type';
import { SubTabBar } from 'domains';
import { mypageTabBarItems, mypageSubTabBarItems } from 'navigations/data';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const MypageTabBar: React.FC<IMypageTabBar> = (props) => {
    const { scrollDownToggle, setScrollDownToggle, setSubTabVisible } = props;
    const [overPage, setOverPage] = useState<number>(0);
    const [crntPage, setCrntPage] = useState<number>(0);
    const [crntPath, setCrntPath] = useState<string>('');

    const loc = useLocation();
    useEffect(() => {
        loc.pathname.replaceAll('/', '') === 'mypage'
            ? setCrntPath(mypageTabBarItems[0].link.split('/')[2])
            : setCrntPath(loc.pathname.split('/')[2]);

        for (let i = 0; i < mypageTabBarItems.length; i++) {
            if (mypageTabBarItems[i].link.split('/')[2] === crntPath) {
                setOverPage(i);
                setCrntPage(i);
            }
        }
    }, [loc, crntPath]);

    return (
        <StyledContainer>
            <StyledMypageTabBarContainer>
                <StyledMypageTabBarBlock>
                    {mypageTabBarItems.map((item, index) => (
                        <StyledMenuItemBlock key={index}>
                            <Link
                                to={item.link}
                                style={{ textDecoration: 'none' }}
                                onClick={() => {
                                    setCrntPage(index);
                                    setOverPage(index);
                                }}
                                onMouseEnter={() => setOverPage(index)}
                            >
                                <StyledMenuItemText color={item.link.split('/')[2] === crntPath ? 'grey' : 'silver'}>
                                    {item.name}
                                </StyledMenuItemText>
                            </Link>
                        </StyledMenuItemBlock>
                    ))}
                </StyledMypageTabBarBlock>
            </StyledMypageTabBarContainer>
            <StyledSubTabBarBlock>
                <SubTabBar
                    visible={!scrollDownToggle}
                    overPage={overPage}
                    crntPage={crntPage}
                    setScrollDownToggle={setScrollDownToggle}
                    setSubTabVisible={setSubTabVisible}
                    items={mypageSubTabBarItems}
                    justifyContent="center"
                />
            </StyledSubTabBarBlock>
        </StyledContainer>
    );
};

const StyledSubTabBarBlock = styled.div`
    width: 100%;
    left: 0px;
    z-index: 0;
    @media screen and (min-width: ${boundaryWidth}px) {
        top: 80px;
    }
`;

const StyledMenuItemText = styled.h2<{ color: string }>`
    font-size: 13px;
    color: ${({ color }) => color};
    cursor: pointer;
    &:hover {
        color: #bce55c;
    }
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 15px;
    }
`;

const StyledMenuItemBlock = styled.div`
    margin-right: 30px;
`;

const StyledMypageTabBarBlock = styled.div`
    display: flex;
    max-width: ${maxWidth}px;
`;

const StyledMypageTabBarContainer = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-bottom: solid 1px;
    border-color: silver;
    z-index: 1;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 50px;
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default MypageTabBar;
