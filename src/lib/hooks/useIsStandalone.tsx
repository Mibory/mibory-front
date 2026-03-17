import { useEffect, useState } from "react";

export function useIsStandalone() {
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        const checkStandalone = () => {
            const isIOSStandalone = (window.navigator as any).standalone === true;
            const isWebStandalone = window.matchMedia('(display-mode: standalone)').matches;
            
            setIsStandalone(isIOSStandalone || isWebStandalone);
        };

        checkStandalone();
    }, []);

    return isStandalone;
}