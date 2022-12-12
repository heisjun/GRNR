import { atom } from 'recoil';

export const followingcountState = atom({
    key: `followingState`,
    default: 0,
});

export const followercountState = atom({
    key: `followerState`,
    default: 0,
});
