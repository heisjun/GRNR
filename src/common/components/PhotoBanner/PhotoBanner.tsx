import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../Avatar';

const BASEURL = 'https://www.gardenersclub.co.kr/api';

const PhotoBanner = () => {
    interface IPopularPic {
        accountNickName: string;
        accountProfileUrl: string;
        pictureId: number;
        firstContent: {
            explain: string;
            pictureUrl: string;
        };
    }
    const navigate = useNavigate();
    const [popular1, setPopular1] = useState<IPopularPic[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASEURL}/api/picture/search?order=인기순`);
                setPopular1(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div style={{ width: '100%', height: 500, display: 'flex' }}>
                <div
                    style={{
                        width: 764,
                        height: 500,
                        backgroundColor: 'gray',
                        marginRight: 20,
                        backgroundImage: `url(${popular1 ? popular1[0].firstContent.pictureUrl : ''})`,
                        backgroundSize: 'cover',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(`./details/${popular1 ? popular1[0].pictureId : ''}`)}
                >
                    <StyledFirstBlock>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <StyledAvatarBlock>
                                <Avatar
                                    width="100%"
                                    borderRadius="100%"
                                    height="100%"
                                    picUrl={popular1 ? popular1[0].accountProfileUrl : ''}
                                />
                            </StyledAvatarBlock>
                            <StyledNickname>{popular1 ? popular1[0].accountNickName : ''}</StyledNickname>
                        </div>

                        <StyledContent>{popular1 ? popular1[0].firstContent.explain : ''}</StyledContent>
                    </StyledFirstBlock>
                </div>
                <div
                    style={{
                        width: 356,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: 240,
                            backgroundColor: 'gray',
                            backgroundImage: `url(${popular1 ? popular1[1].firstContent.pictureUrl : ''})`,
                            backgroundSize: 'cover',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate(`./details/${popular1 ? popular1[1].pictureId : ''}`)}
                    >
                        <StyledSecondBlock>
                            <StyledSecondContent>
                                {popular1 ? popular1[1].firstContent.explain : ''}
                            </StyledSecondContent>
                        </StyledSecondBlock>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            height: 240,
                            backgroundColor: 'gray',
                            backgroundImage: `url(${popular1 ? popular1[2].firstContent.pictureUrl : ''})`,
                            backgroundSize: 'cover',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate(`./details/${popular1 ? popular1[2].pictureId : ''}`)}
                    >
                        {' '}
                        <StyledSecondBlock>
                            <StyledSecondContent>
                                {popular1 ? popular1[2].firstContent.explain : ''}
                            </StyledSecondContent>
                        </StyledSecondBlock>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StyledFirstBlock = styled.div`
    width: 451px;
    height: 189px;
    margin-top: 312px;
    background-color: white;
    padding: 30px 0 0 20px;
    box-sizing: border-box;
`;

const StyledSecondBlock = styled.div`
    width: 356px;
    height: 240px;
    background-color: rgb(0, 0, 0, 0.45);
`;

const StyledAvatarBlock = styled.div`
    width: 30px;
    height: 30px;
`;
const StyledNickname = styled.div`
    margin: 0px 0 0 10px;
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #5d5d5d;
`;

const StyledContent = styled.div`
    margin: 16px 0 0;
    font-family: NotoSansKR;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #000;
`;

const StyledSecondContent = styled.div`
    font-family: NotoSansKR;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: white;
    padding: 160px 16px 20px;
`;
export default PhotoBanner;
