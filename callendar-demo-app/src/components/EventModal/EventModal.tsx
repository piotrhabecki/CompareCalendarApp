import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import {
  MdDragHandle,
  MdOutlineSchedule,
  MdCheck,
  MdBookmarkBorder,
} from "react-icons/md";
import { VscTrash } from "react-icons/vsc";
import GlobalContext from "../../context/GlobalContext";
import { useRouter } from "next/router";
import { CalendarEvent } from "../models/dayEvent";

const LABEL_CLASSES = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const {
    setShowEventModal,
    showEventModal,
    daySelected,
    setDayEvents,
    selectedDayEvent,
    setSelectedDayEvents,
  } = useContext(GlobalContext);

  const [startHour, setStartHour] = useState(
    selectedDayEvent.day > 0
      ? dayjs(selectedDayEvent.timeStart).format("HH:mm")
      : dayjs(new Date(Date.now())).format("HH:mm")
  );
  const [endHour, setEndHour] = useState(
    selectedDayEvent.day > 0
      ? dayjs(selectedDayEvent.timeEnd).format("HH:mm")
      : dayjs(new Date(Date.now())).format("HH:mm")
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedDayEvent.day > 0 ? selectedDayEvent.label : LABEL_CLASSES[0]
  );

  const closeventModalHandler = () => {
    setShowEventModal(!showEventModal);
  };

  const changeTimeStartHourHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setStartHour(event.target.value);
  };

  const changeTimeEndHourHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEndHour(event.target.value);
  };

  const checkCustomCalendarInPath = () => {
    if (router.pathname.indexOf("/calendars/") > -1) return true;

    return false;
  };

  const getAllCalendarsEvents = async (calendarId: string) => {
    const response = await fetch(
      `/api/getCalendarEvents?calendarId=${calendarId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data[0].events;
  };

  const createCustomCalendar = async () => {
    const response = await fetch("/api/createNewCalendar", {
      method: "POST",
      body: JSON.stringify({ id: uuidv4() }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    return data.id;
  };

  const prepareEvent = (eventId: string) => {
    let sh = startHour.split(":");
    let eh = endHour.split(":");

    let timeStart = daySelected;
    timeStart = timeStart.hour(+sh[0]);
    timeStart = timeStart.minute(+sh[1]);

    let timeEnd = daySelected;
    timeEnd = timeEnd.hour(+eh[0]);
    timeEnd = timeEnd.minute(+eh[1]);

    return {
      id: eventId,
      timeStart: timeStart,
      timeEnd: timeEnd,
      timeDelta: timeEnd.diff(timeStart, "minutes"),
      label: selectedLabel,
      day: daySelected.valueOf(),
    };
  };

  const redirectToBegining = () => {
    router.replace("/");
  };

  const deleteEvent = async () => {
    const customCalendar = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1,
      window.location.href.length
    );

    const response = await fetch("/api/deleteCalendarEvent", {
      method: "DELETE",
      body: JSON.stringify({
        id: customCalendar,
        eventId: selectedDayEvent.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    const events = await getAllCalendarsEvents(customCalendar);

    setSelectedDayEvents(new CalendarEvent("", dayjs(), dayjs(), 0, "", 0));
    setShowEventModal(!showEventModal);

    events.length === 0 ? redirectToBegining() : setDayEvents(events);
  };

  const updateDayEvent = async (calendarId: string) => {
    const response = await fetch("/api/updateCalendarEvent", {
      method: "POST",
      body: JSON.stringify({
        id: calendarId,
        event: prepareEvent(selectedDayEvent.id),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    setDayEvents(await getAllCalendarsEvents(calendarId));
    return data.id;
  };

  const createCalendarEvent = async (calendarId: string) => {
    console.log(calendarId)
    await fetch("/api/addCalendarEvent", {
      method: "PUT",
      body: JSON.stringify({ id: calendarId, event: prepareEvent(uuidv4()) }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await setDayEvents(await getAllCalendarsEvents(calendarId));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let customCalendar = "";
    let isOnCustomCalendar = await checkCustomCalendarInPath();

    isOnCustomCalendar
      ? (customCalendar = window.location.href.substring(
          window.location.href.lastIndexOf("/") + 1,
          window.location.href.length
        ))
      : (customCalendar = await createCustomCalendar());
        console.log(selectedDayEvent.day )
    if (selectedDayEvent.day !== 0) {
      await updateDayEvent(customCalendar);
    } else {
      await createCalendarEvent(customCalendar);
    }

    !isOnCustomCalendar && router.push(`/calendars/${customCalendar}`);

    setShowEventModal(!showEventModal);

  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-1/4"
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">
            <MdDragHandle />
          </span>
          <div>
            {selectedDayEvent.day > 0 && (
              <span
                onClick={deleteEvent}
                className="text-gray-400 cursor-pointer"
              >
                <VscTrash />
              </span>
            )}
          </div>
          <button>
            <span onClick={closeventModalHandler} className="text-gray-400">
              <AiOutlineCloseCircle />
            </span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <span className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500">
              Time Span
            </span>
            <span className="text-gray-400">
              <MdOutlineSchedule />
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <div>Time start</div>
            <input
              type="time"
              name="start event hour"
              placeholder={dayjs(new Date()).format("HH, mm")}
              value={startHour}
              required
              onChange={changeTimeStartHourHandler}
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <div>Time end</div>
            <input
              type="time"
              name="end event hour"
              placeholder={dayjs(new Date()).format("HH, mm")}
              value={endHour}
              required
              onChange={changeTimeEndHourHandler}
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <span className="text-gray-400">
              <MdBookmarkBorder />
            </span>
            <div className="flex gap-x-2">
              {LABEL_CLASSES.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="text-white text-sm">
                      <MdCheck />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            type={"submit"}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
