import dayjs from "dayjs";
import React from "react";

interface day {
  day: dayjs.Dayjs;
  rowIdx: number;
}



function Day(props: day) {

  const getCurrentDayClass = () => {
    return props.day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7' : "";
  }

  const displayDay = <p className="text-sm mt-1">{props.day.format('ddd').toUpperCase()}</p>

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {props.rowIdx === 0 && displayDay}
        
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>{props.day.format("DD")}</p>
      </header>
    </div>
  );
}

export default Day;
