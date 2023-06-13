import React from "react";
import { UilTrash } from "@iconscout/react-unicons";

function ClearButton({setDisplay, setShowToast, setToastMessage}) {

	const clearAll = () => {
		localStorage.clear();
		localStorage.setItem("cities", JSON.stringify([]));
		setDisplay(false);
    setToastMessage("All cities cleared!");
    setShowToast(true);
	}

  return (
    <div className="flex flex-row justify-center mt-10">
      <button
        className="py-1 
        text-white 
        border-white rounded-full border-2
        w-1/2 items disabled:opacity-50"
        onClick={() => clearAll()}
      >
        <div className="flex flex-row justify-center items-center">
          <UilTrash className="mr-2"/> Clear All
        </div>
      </button>
    </div>
  );
}

export default ClearButton;
