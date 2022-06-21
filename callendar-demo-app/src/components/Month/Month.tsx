import dayjs from "dayjs";
import React from "react";
import Day from "../Day/day";

interface month {
  month: dayjs.Dayjs[][];
}

function Month(props: month) {
  
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {props.month.map((row: dayjs.Dayjs[], i: number) => (
        <React.Fragment key={i}>
            {row.map((day, j) => (<Day day={day} key={j} rowIdx={i}/>))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Month;
