import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList, MagazineItem } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IMagazinesParams } from 'common/types';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = process.env.REACT_APP_BASE_URL;

const Magazine: React.FC = () => {
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 1);
    const [magazineGap, setMagazineGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 6);
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [loading, setLoading] = useState(false);
    const [magazines, setMagazines] = useState<IMagazinesParams[]>([]);

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASEURL}/api/magazine/search${location.search}`);
                setMagazines(response.data.value.content);
                console.log(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [location.search]);

    return (
        <StyledMagazineContainer pageAnim={pageAnim}>
            <StyledMagazineHeader>서비스 준비 중입니다</StyledMagazineHeader>
            {magazines && (
                <ItemList
                    width="100%"
                    imgHeight="70%"
                    cols={magazineCols}
                    horizontalGap={magazineGap}
                    verticalGap={magazineGap}
                    items={magazines}
                    RenderComponent={MagazineItem}
                />
            )}
        </StyledMagazineContainer>
    );
};

const StyledMagazineContainer = styled.div<{ pageAnim: any }>`
    height: 500px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

const StyledMagazineHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    padding-bottom: 15px;
    font-size: 20px;
`;

export default Magazine;
