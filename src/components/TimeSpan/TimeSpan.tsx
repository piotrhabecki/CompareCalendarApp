import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const TimeSpan = () => {
  const [timeSpanToSet, setTimeSpanToSet] = useState(0);
  const { setTimeSpan } = useContext(GlobalContext);

  return (
    <div>
      <input
        type="number"
        name="Time span"
        placeholder={"Time span of?"}
        onChange={(event: any) => {
          setTimeSpanToSet(event?.target.value);
        }}
        className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
      />
      <button
        className="border py-2 rounded-full text-center w-full text-xl shadow-md hover:shadow-2xl"
        onClick={() => {
          setTimeSpan(timeSpanToSet);
        }}
      >
        Check!
      </button>
    </div>
  );
};

export default TimeSpan;
