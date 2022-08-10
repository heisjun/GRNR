import { atom, selector } from 'recoil';

type IUserInfo = {
    isLogin: boolean;
};

export const UserInfo = atom<IUserInfo>({
    key: 'loginStatus',
    default: {
        isLogin: false,
    },
});
