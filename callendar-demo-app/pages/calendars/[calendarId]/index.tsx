import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import CallendarApp from "../../../src/components/CallendarApp/CallendarApp";
import { CalendarEvent } from "../../../src/components/models/dayEvent";
import GlobalContext from "../../../src/context/GlobalContext";

const CalendarId: React.FC<{ calendarEvents: CalendarEvent[] }> = ({
  calendarEvents,
}) => {
  const { setDayEvents, dayEvents } = useContext(GlobalContext);

  useEffect(() => {
    if (calendarEvents !== dayEvents) {
      setDayEvents(calendarEvents);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Callendar app</title>
        <meta
          name="description"
          content="Callendar app - add hours of your availibility and share it with others"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CallendarApp />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const response = await fetch(
    `http://${context.req.headers.host}/api/getCalendarEvents?calendarId=${context.params.calendarId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  console.log(data);
  return {
    props: {
      calendarEvents: data[0].events,
    },
  };
}

export default CalendarId;
