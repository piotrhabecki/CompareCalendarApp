import React from "react";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import SmallCalendar from "../SmallCalendar/SmallCalendar";

function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
}

export default Sidebar;
