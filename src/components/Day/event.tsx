import React from 'react';
import { CalendarEvent } from '../models/dayEvent';
import {AiFillExclamationCircle} from 'react-icons/ai'
import dayjs from 'dayjs';

interface event {
    cssClass: string;
    key: number;
    evt: CalendarEvent;
    onSelectedDayEvents: (evt: CalendarEvent) => void
    hasIcon: boolean;
}

const Event = (props: event) => {
    return (
        <div
        key={props.key}
        className={props.cssClass}
        onClick={() => {
          props.onSelectedDayEvents(props.evt);
        }}
      >
        {dayjs(props.evt.timeStart).format("HH:mm")} -{" "}
        {dayjs(props.evt.timeEnd).format("HH:mm")}
        <p>{props.evt.timeDelta} minutes {props.hasIcon  ? <AiFillExclamationCircle /> : null}</p>
      </div>
    );
};

export default Event;