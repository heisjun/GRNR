import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IUserpageTabBar } from './UserpageTabBar.type';
import { userpageTabBarItems } from 'navigations/data';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const UserpageTabBar: React.FC<IUserpageTabBar> = (props) => {
    const { scrollDownToggle, setScrollDownToggle, setSubTabVisible } = props;
    const [overPage, setOverPage] = useState<number>(0);
    const [crntPage, setCrntPage] = useState<number>(0);
    const [crntPath, setCrntPath] = useState<string>('');
    const navigate = useNavigate();
    const accountId = sessionStorage.getItem('userId');

    const loc = useLocation();
    useEffect(() => {
        loc.pathname.replaceAll('/', '') === 'userpage'
            ? setCrntPath(userpageTabBarItems[0].link.split('/')[2])
            : setCrntPath(loc.pathname.split('/')[2]);

        for (let i = 0; i < userpageTabBarItems.length; i++) {
            if (userpageTabBarItems[i].link.split('/')[2] === crntPath) {
                setOverPage(i);
                setCrntPage(i);
            }
        }
    }, [loc, crntPath]);

    return (
        <StyledContainer>
            {!scrollDownToggle && (
                <StyledMypageTabBarContainer>
                    <StyledMypageTabBarBlock>
                        {userpageTabBarItems.map((item, index) => (
                            <StyledMenuItemBlock key={index}>
                                <StyledMenuItemText
                                    color={item.link.split('/')[2] === crntPath ? '#0d6637' : '#676767'}
                                    onClick={() => navigate(`${item.link}/${accountId}`)}
                                >
                                    {item.name}
                                </StyledMenuItemText>
                            </StyledMenuItemBlock>
                        ))}
                    </StyledMypageTabBarBlock>
                </StyledMypageTabBarContainer>
            )}
        </StyledContainer>
    );
};

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

export default UserpageTabBar;
