import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Filters, ItemList, PhotoItem } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Photo: React.FC = () => {
    const [photos, setPhotos] = useState('');
    const [loading, setLoading] = useState(false);

    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 1);
    const [photoHorizontalGap, setPhotoHorizontalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 0);
    const [photoVerticalGap, setPhotoVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);

    const [pageAnim, setPageAnim] = useState<any>(FadeIn);

    const [selected, setSelected] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://43.201.2.18/api/api/picture/search`);
                setPhotos(response.data.value.content);
                console.log(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const data = [
        {
            pictureId: 1,
            pictureContentDtoList: [
                {
                    pictureId: 1,
                    contentId: 1,
                    pictureUrl: '사진글1_사진1.jpg',
                    explain: '첫번째 사진글의 사진1입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그2',
                        },
                    ],
                },
                {
                    pictureId: 1,
                    contentId: 2,
                    pictureUrl: '사진글1_사진2.jpg',
                    explain: '첫번째 사진글의 사진2입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그1',
                        },
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그2',
                        },
                    ],
                },
                {
                    pictureId: 1,
                    contentId: 3,
                    pictureUrl: '사진글1_사진3.jpg',
                    explain: '첫번째 사진글의 사진3입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그2',
                        },
                    ],
                },
            ],
            accountNickName: 'junhyuck',
            scrapCount: 0,
            likeCount: 0,
            viewCount: 0,
        },
        {
            pictureId: 2,
            pictureContentDtoList: [
                {
                    pictureId: 2,
                    contentId: 1,
                    pictureUrl: '사진글2_사진1.jpg',
                    explain: '두번째 사진글의 사진1입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그2',
                        },
                    ],
                },
                {
                    pictureId: 2,
                    contentId: 2,
                    pictureUrl: '사진글1_사진2.jpg',
                    explain: '첫번째 사진글의 사진2입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그1',
                        },
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그2',
                        },
                    ],
                },
                {
                    pictureId: 2,
                    contentId: 3,
                    pictureUrl: '사진글1_사진3.jpg',
                    explain: '첫번째 사진글의 사진3입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그2',
                        },
                    ],
                },
            ],
            accountNickName: 'taemin',
            scrapCount: 0,
            likeCount: 0,
            viewCount: 0,
        },
        {
            pictureId: 3,
            pictureContentDtoList: [
                {
                    pictureId: 3,
                    contentId: 1,
                    pictureUrl: '사진글2_사진1.jpg',
                    explain: '세번째 사진글의 사진1입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그2',
                        },
                    ],
                },
                {
                    pictureId: 3,
                    contentId: 2,
                    pictureUrl: '사진글1_사진2.jpg',
                    explain: '첫번째 사진글의 사진2입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그1',
                        },
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그2',
                        },
                    ],
                },
                {
                    pictureId: 3,
                    contentId: 3,
                    pictureUrl: '사진글1_사진3.jpg',
                    explain: '첫번째 사진글의 사진3입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그2',
                        },
                    ],
                },
            ],
            accountNickName: 'oooootttt_',
            scrapCount: 0,
            likeCount: 0,
            viewCount: 0,
        },
        {
            pictureId: 4,
            pictureContentDtoList: [
                {
                    pictureId: 4,
                    contentId: 1,
                    pictureUrl: '사진글2_사진1.jpg',
                    explain: '네번째 사진글의 사진1입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그2',
                        },
                    ],
                },
                {
                    pictureId: 4,
                    contentId: 2,
                    pictureUrl: '사진글1_사진2.jpg',
                    explain: '첫번째 사진글의 사진2입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그1',
                        },
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그2',
                        },
                    ],
                },
                {
                    pictureId: 4,
                    contentId: 3,
                    pictureUrl: '사진글1_사진3.jpg',
                    explain: '첫번째 사진글의 사진3입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그2',
                        },
                    ],
                },
            ],
            accountNickName: 'oooootttt_',
            scrapCount: 0,
            likeCount: 0,
            viewCount: 0,
        },
        {
            pictureId: 5,
            pictureContentDtoList: [
                {
                    pictureId: 5,
                    contentId: 1,
                    pictureUrl: '사진글2_사진1.jpg',
                    explain: '다섯번째 사진글의 사진1입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진1 태그2',
                        },
                    ],
                },
                {
                    pictureId: 5,
                    contentId: 2,
                    pictureUrl: '사진글1_사진2.jpg',
                    explain: '첫번째 사진글의 사진2입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그1',
                        },
                        {
                            pictureContentId: 2,
                            tagName: '사진2 태그2',
                        },
                    ],
                },
                {
                    pictureId: 5,
                    contentId: 3,
                    pictureUrl: '사진글1_사진3.jpg',
                    explain: '첫번째 사진글의 사진3입니다.',
                    homePlace: 'ONE_ROOM',
                    tagList: [
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그1',
                        },
                        {
                            pictureContentId: 1,
                            tagName: '사진3 태그2',
                        },
                    ],
                },
            ],
            accountNickName: 'oooootttt_',
            scrapCount: 0,
            likeCount: 0,
            viewCount: 0,
        },
    ];

    const PhotoFilter = [
        {
            id: 1,
            name: '정렬',
            list: ['인기순', '최신순'],
        },
        {
            id: 2,
            name: '공간',
            list: ['원룸', '거실', '침실', '주방', '욕실', '베란다', '사무실', '가게', '야외정원'],
        },
    ];

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

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledPhotoContainer pageAnim={pageAnim}>
            <StyledPhotoHeader>
                <Filters setGetFilter={setSelected} data={PhotoFilter} />
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

const StyledPhotoContainer = styled.div<{ pageAnim: any }>`
    height: 500px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

const StyledPhotoHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: -20px;
    padding-bottom: 15px;
`;

export default Photo;
