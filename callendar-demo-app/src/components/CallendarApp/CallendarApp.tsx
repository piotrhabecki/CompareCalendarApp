import React from 'react';

import { useEffect } from "react";
import { useState, useContext } from "react";
import GlobalContext from '../../context/GlobalContext';
import { getMonth } from '../../utilities/utils';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import EventModal from '../EventModal/EventModal';
import Month from '../Month/Month';
import Sidebar from '../Sidebar/Sidebar';

const CallendarApp = () => {

    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);
    useEffect(() => {
      setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
      <>
      {showEventModal && <EventModal />}
        <main className="h-screen w-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </main>
      </>
    );
};

export default CallendarApp;