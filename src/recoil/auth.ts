import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type IUserInfo = {
    isLogin: boolean;
};

const { persistAtom } = recoilPersist();

export const UserInfo = atom<IUserInfo>({
    key: 'loginStatus',
    default: {
        isLogin: false,
    },
    effects_UNSTABLE: [persistAtom],
});
