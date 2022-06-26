import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../../utilities/utils";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const {
    monthIndex,
    daySelected,
    setSmallCallendarMonthIndex,
    setDaySelected,
  } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setCurrentMonthIndex(Number(currentMonthIdx) - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(Number(currentMonthIdx) + 1);
  };

  const getDayClass = (day: Dayjs) => {
    const format = "DD-MM-YY";
    const dayToBeSelected = daySelected && daySelected.format(format);
    const currentDay = day.format(format);

    if (dayjs().format(format) === currentDay)
      return "bg-blue-500 rounded-full text-white";

    if (currentDay === dayToBeSelected)
      return "bg-blue-100 rounded-full text-blue-600 font-bold";

    return "";
  };

  const setSmallCalendarMonthHandler = (day: Dayjs) => {
    setSmallCallendarMonthIndex(currentMonthIdx);
    setDaySelected(day);
  };

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
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
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, index) => (
          <span key={index} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, j) => (
              <button
                key={j}
                onClick={() => {
                  setSmallCalendarMonthHandler(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="texy-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
