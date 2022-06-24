import React from "react";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import TimeSpan from "../TimeSpan/TimeSpan";
import SmallCalendar from "../SmallCalendar/SmallCalendar";

function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
      <TimeSpan />
    </aside>
  );
}

export default Sidebar;
