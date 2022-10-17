import React from "react";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import TimeSpan from "../TimeSpan/TimeSpan";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import AboutPage from "../AboutPage/AboutPage";

function Sidebar() {
  return (
    <aside className="border p-5 h-screen">
      <CreateEventButton />
      <SmallCalendar />
      <TimeSpan />
      <AboutPage />
    </aside>
  );
}

export default Sidebar;
