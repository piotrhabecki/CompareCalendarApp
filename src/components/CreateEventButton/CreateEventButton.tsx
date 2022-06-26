import React, { useContext } from "react";
import { BsPlusLg } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";

const CreateEventButton = () => {

  const {setShowEventModal, showEventModal} = useContext(GlobalContext)

  const showEventModalHandler = () => {
    setShowEventModal(!showEventModal)
  }

  return (
    <button onClick={showEventModalHandler} className="border px-2 rounded-full flex items-center shadow-md hover:shadow-2xl">
      {<BsPlusLg className="w-7 h-7" />}
      <span className="pl-3 pr-7">Create</span>
    </button>
  );
};

export default CreateEventButton;
