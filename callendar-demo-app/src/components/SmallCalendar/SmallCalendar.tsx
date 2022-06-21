import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../../utilities/utils";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex(Number(currentMonthIdx) - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(Number(currentMonthIdx) + 1);
  };

  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <button>
          <span className="cursor-pointer text-gray-600 mx-2">
            <BsChevronLeft onClick={handlePrevMonth} />
          </span>
        </button>
        <button>
          <span className="cursor-pointer text-gray-600 mx-2">
            <BsChevronRight onClick={handleNextMonth} />
          </span>
        </button>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, index) => (
          <span key={index} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        
      </div>
    </div>
  );
};

export default SmallCalendar;
