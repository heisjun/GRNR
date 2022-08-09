import { atom } from 'recoil';

type IUserInfo = {
    isLogin: boolean;
};

export const UserInfo = atom<IUserInfo>({
    key: 'LoginToggle',
    default: {
        isLogin: false,
    },
});
