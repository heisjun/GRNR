export const headerItems = [
    {
        name: '커뮤니티',
        link: '/community',
    },
    {
        name: '스토어',
        link: '/store',
    },
    {
        name: '업로드',
        link: '/upload',
    },
];

export const subTabBarItems = [
    [
        { name: '인기', link: '/community/popular', value: 'popular' },
        { name: '팔로잉', link: '/community/following', value: 'following' },
        { name: '사진', link: '/community/photo', value: 'photo' },
        { name: '매거진', link: '/community/magazine', value: 'magazine' },
        { name: '식물사전', link: '/community/dictionary', value: 'dictionary' },
        { name: 'Q&A', link: '/community/question', value: 'question' },
    ],
    [
        { name: '스토어 메뉴1', link: '/store/menu1', value: 'menu1' },
        { name: '스토어 메뉴2', link: '/store/menu2', value: 'menu2' },
        { name: '스토어 메뉴3', link: '/store/menu3', value: 'menu3' },
    ],
    [
        { name: '사진', link: '/upload/photo', value: 'photo' },
        { name: '동영상', link: '/upload/video', value: 'video' },
    ],
];

export const mypageTabBarItems = [
    {
        name: '프로필',
        link: '/mypage/profile',
    },
    {
        name: '마이가든',
        link: '/mypage/mygarden',
    },
    {
        name: '설정',
        link: '/mypage/setting',
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
