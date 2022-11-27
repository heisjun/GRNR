import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BASEURL = 'https://www.gardenersclub.co.kr/api';

const PhotoBanner = () => {
    const [popular1, setPopular1] = useState();
    const [popular2, setPopular2] = useState();
    const [popular3, setPopular3] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASEURL}/api/picture/search?order=인기순`);
                setPopular1(response.data.value.content[0].firstContent.pictureUrl);
                setPopular2(response.data.value.content[1].firstContent.pictureUrl);
                setPopular3(response.data.value.content[2].firstContent.pictureUrl);
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
                        backgroundColor: 'gray',
                        marginRight: 20,
                        backgroundImage: `url(${popular1})`,
                        backgroundSize: 'cover',
                    }}
                ></div>
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
                            backgroundImage: `url(${popular2})`,
                            backgroundSize: 'cover',
                        }}
                    ></div>
                    <div
                        style={{
                            width: '100%',
                            height: 240,
                            backgroundColor: 'gray',
                            backgroundImage: `url(${popular3})`,
                            backgroundSize: 'cover',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default PhotoBanner;
