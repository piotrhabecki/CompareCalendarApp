import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props: any) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
