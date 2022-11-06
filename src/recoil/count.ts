import { atom } from 'recoil';
import uuid from 'react-uuid';

export const likecountState = atom({
    key: `likecountState${uuid()}`,
    default: 0,
});
