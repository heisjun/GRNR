import { useEffect, useContext } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import type { History, Blocker, Transition } from 'history';
import history from './history';

export const useBlocker = (blocker: Blocker, when = true): void => {
    const navigator = useContext(NavigationContext).navigator as History;

    useEffect(() => {
        if (!when) return;

        const unblock = history.block((tx: Transition) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                },
            };

            blocker(autoUnblockingTx);
        });

        return unblock;
    }, [navigator, blocker, when]);
};
