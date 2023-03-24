import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useBlocker } from './useBlocker';

export const useCallbackPrompt = (when: boolean): [boolean, () => void, () => void] => {
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState(false);
    const [blockedLocation, setBlockedLocation] = useState<any>(null);

    const cancelNavigation = useCallback(() => {
        setShowPrompt(false);
        setBlockedLocation(null);
    }, []);

    const blocker = useCallback(
        (tx: any) => {
            if (tx.location.pathname !== location.pathname) {
                setBlockedLocation(tx);
                setShowPrompt(true);
            }
        },
        [location],
    );

    const confirmNavigation = useCallback(() => {
        if (blockedLocation) {
            blockedLocation.retry();
            cancelNavigation(); // 클린업
        }
    }, [blockedLocation]);

    useBlocker(blocker, when);

    return [showPrompt, confirmNavigation, cancelNavigation];
};
