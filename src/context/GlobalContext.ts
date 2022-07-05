import dayjs, { Dayjs } from "dayjs";
import { NumericType } from "mongodb";
import React, { SetStateAction } from "react";
import {CalendarEvent} from '../components/models/dayEvent'

interface GlobalContext {
    monthIndex: number,
    setMonthIndex: (index: number) => void,
    smallCallendarMonthIndex: number | null,
    setSmallCallendarMonthIndex: (index: any ) => void,
    daySelected: Dayjs,
    setDaySelected: (day: any) => void,
    showEventModal: boolean,
    setShowEventModal: (show: boolean) => void,
    dayEvents: CalendarEvent[],
    setDayEvents: (dayEvents: CalendarEvent[]) => void,
    selectedDayEvent: CalendarEvent,
    setSelectedDayEvents: (dayEvents: CalendarEvent) => void,
    timeSpan: number,
    setTimeSpan: (timeSpan: number) => void,
    showTrainingModal: boolean,
    setShowTrainingModal: (show: boolean) => void,
    
}

const GlobalContext = React.createContext<GlobalContext>({
    monthIndex: 0,
    setMonthIndex: (index: number) => {},
    smallCallendarMonthIndex: null,
    setSmallCallendarMonthIndex: (index: any ) => {},
    daySelected: dayjs(),
    setDaySelected: (day: any) => {},
    showEventModal: false,
    setShowEventModal: (show: boolean) => {},
    dayEvents: [],
    setDayEvents: (dayEvents: CalendarEvent[]) => {},
    selectedDayEvent: new CalendarEvent("", dayjs(), dayjs(), 0, "", 0, ""),
    setSelectedDayEvents: (dayEvent: CalendarEvent) => {},
    timeSpan: 10000,
    setTimeSpan: (timeSpan: number) => {},
    showTrainingModal: false,
    setShowTrainingModal: (show: boolean) => {}
});

export default GlobalContext;
