import { useState } from "react";
import AppContext from "./AppContext";

export default function AppContextProvider({children}){
    const [account, setAccount] = useState();
    const [managerContract, setManagerContract] = useState();

    const appContextValue = {
        account,
        setAccount,
        managerContract,
        setManagerContract
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
}

