import { useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";
import { CalendarEvent } from "../components/models/dayEvent";

function ContextWrapper(props: any) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCallendarMonthIndex, setSmallCallendarMonthIndex] =
    useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  const [selectedDayEvent, setSelectedDayEvents] = useState<CalendarEvent>(
    new CalendarEvent("", dayjs(), dayjs(), 0, "", 0)
  );
  const [timeSpan, setTimeSpan] = useState<number>(1000)
  const [showTrainingModal, setShowTrainingModal] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        smallCallendarMonthIndex,
        daySelected,
        showEventModal,
        dayEvents,
        selectedDayEvent,
        timeSpan,
        showTrainingModal,
        setShowTrainingModal,
        setTimeSpan,
        setDayEvents,
        setShowEventModal,
        setDaySelected,
        setMonthIndex,
        setSmallCallendarMonthIndex,
        setSelectedDayEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
