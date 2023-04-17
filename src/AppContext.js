import {createContext} from "react";

const AppContext = createContext({
    account: null,
    setAccount: () => {},
    managerContract: null,
    setManagerContract: () => {}
});

export default AppContext;