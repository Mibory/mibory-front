import { createContext, type ReactNode } from "react";
import { useIsStandalone } from "../hooks/useIsStandalone";

type TAppContext = {
    isStandalone: boolean;
}

export const AppContext = createContext<TAppContext|undefined>(undefined);

export function AppProvider({children}: {children: ReactNode}) {
    const isStandalone = useIsStandalone();

    return (
        <AppContext.Provider value={{isStandalone}}>
            {children}
        </AppContext.Provider>
    );
}