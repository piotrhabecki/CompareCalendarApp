import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { CalendarEvent } from "../models/dayEvent";
import { AiFillExclamationCircle } from "react-icons/ai";
import Event from "./event";

interface day {
  day: dayjs.Dayjs;
  rowIdx: number;
}

function Day(props: day) {
  const {
    setDaySelected,
    setShowEventModal,
    showEventModal,
    dayEvents,
    setSelectedDayEvents,
    timeSpan,
    setTimeSpan,
  } = useContext(GlobalContext);

  const [devents, setDEvents] = useState<CalendarEvent[]>([]);
  const [highlightedEvents, setHighlightedEvents] = useState<CalendarEvent[]>(
    []
  );

  useEffect(() => {
    const format = "DD-MM-YY";

    const evts = Object.values(dayEvents).filter(
      (evt) => dayjs(evt.day).format(format) === props.day.format(format)
    );

    setDEvents(evts);
  }, [dayEvents, props.day, setTimeSpan]);

  useEffect(() => {
    const tempHEvents: CalendarEvent[] = [];
    devents.forEach((evt) => {
      if (evt.timeDelta >= timeSpan) {
        tempHEvents.push(evt);
      }
    });
    setHighlightedEvents(tempHEvents);
  }, [devents, timeSpan]);

  const getCurrentDayClass = () => {
    return props.day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  const clickOnDayHandler = () => {
    setDaySelected(props.day);
    setShowEventModal(!showEventModal);
  };

  const displayDay = (
    <p className="text-sm mt-1">{props.day.format("ddd").toUpperCase()}</p>
  );

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {props.rowIdx === 0 && displayDay}

        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {props.day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={clickOnDayHandler}>
        {devents.map((evt, i) => (
          <>
            {highlightedEvents.indexOf(evt) > -1 ? (
              <Event
                key={i}
                cssClass={`bg-yellow-200 p1 mr-3 text-gray-600 text-sm rounded mb-1 truncate text-center`}
                evt={evt}
                onSelectedDayEvents={setSelectedDayEvents}
                hasIcon={true}
              />
            ) : (
              <Event
                key={i}
                cssClass={`bg-${evt.label}-200 p1 mr-3 text-gray-600 text-sm rounded mb-1 truncate text-center`}
                evt={evt}
                onSelectedDayEvents={setSelectedDayEvents}
                hasIcon={false}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default Day;
