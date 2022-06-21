import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { useContext } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import LOGO from "../../../assets/LOGO.png";
import GlobalContext from "../../context/GlobalContext";

function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(Number(monthIndex) - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(Number(monthIndex) + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month() ? monthIndex + 0.1 : dayjs().month()
    );
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <div className="mr-2 w-12 h12">
        {" "}
        <Image src={LOGO} alt="logo" />
      </div>
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <button>
        <span className="cursor-pointer text-gray-600 mx-2">
          {<BsChevronLeft onClick={handlePrevMonth} />}
        </span>
      </button>
      <button className="px-10">
        <span className="cursor-pointer text-gray-800 mx-2">
          {<BsChevronRight onClick={handleNextMonth} />}
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}

export default CalendarHeader;
