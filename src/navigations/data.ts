export const headerItems = [
    {
        name: '커뮤니티',
        link: '/community',
    },
];

export const subTabBarItems = [
    [
        { name: '인기', value: 'popular' },
        { name: '팔로잉', value: 'following' },
        { name: '사진', value: 'photo' },
        { name: '매거진',  value: 'magazine' },
        { name: '식물사전', link: '/community/dictionary', value: 'dictionary' },
        { name: 'Q&A', value: 'question' },
    ],
    [
        { name: '사진', link: '/upload/photo', value: 'photo' },
        { name: '동영상', link: '/upload/video', value: 'video' },
    ],
];

export const mypageTabBarItems = [
    {
        name: '프로필'
    },
    {
        name: '설정'
    },
];

export const userpageTabBarItems = [
    {
        name: '모두보기',
        link: '/userpage',
    },
    {
        name: '사진',
        link: '/userpage/photo',
    },
    {
        name: '매거진',
        link: '/userpage/magazine',
    },
    {
        name: 'Q&A',
        link: '/userpage/question',
    },
    {
        name: '스크랩북',
        link: '/userpage/scrapbook',
    },
];

export const mypageSubTabBarItems = [
    [
        { name: '나의 피드', link: '/mypage/profile/myfeed', value: 'myfeed' },
        { name: '사진', link: '/mypage/profile/photo', value: 'photo' },
        { name: '매거진', link: '/mypage/profile/magazine', value: 'magazine' },
        { name: 'Q&A', link: '/mypage/profile/question', value: 'question' },
        { name: '스크랩북', link: '/mypage/profile/scrapbook', value: 'scrapbook' },
        { name: '좋아요', link: '/mypage/profile/like', value: 'like' },
    ],
    [
        { name: '나의 일정 관리', link: '/mypage/mygarden/plans', value: 'plans' },
        { name: '나의 식물 관리', link: '/mypage/mygarden/plants', value: 'plants' },
    ],
    [{ name: '설정1', link: '/mypage/setting/setting1', value: 'setting1' }],
];
