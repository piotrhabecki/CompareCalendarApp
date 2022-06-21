import React from "react";
import { getMonth } from "../utilities/utils";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index: number) => {}
});

export default GlobalContext;
