import React from "react";
import { BsPlusLg } from "react-icons/bs";

const CreateEventButton = () => {
  return (
    <button className="border px-2 rounded-full flex items-center shadow-md hover:shadow-2xl">
      {<BsPlusLg className="w-7 h-7" />}
      <span className="pl-3 pr-7">Create</span>
    </button>
  );
};

export default CreateEventButton;
