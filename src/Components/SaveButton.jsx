import React, { useEffect } from "react";
import { UilBookmark } from "@iconscout/react-unicons";

function SaveButton({weather, setShowToast, setToastMessage}) {

	//thought: for every weather, if the name appears in the local storage, 
	// then the button should be disabled
	const [disabled, setDisabled] = React.useState(false);
	useEffect(() => {
		const cities = JSON.parse(localStorage.getItem("cities"));
		if (cities.includes(weather.name)) {
			setDisabled(true);
		}else{
			setDisabled(false);
		}
	}, [weather]);

  const saveLocation = (location) => {
		// console.log("Save location: ", location);
		const cities = JSON.parse(localStorage.getItem("cities"));
		localStorage.setItem("cities", JSON.stringify([...cities, location]));
		setDisabled(true);
		setToastMessage("Location saved!");
		setShowToast(true);
	}  

  return (
    <div className="flex flex-row mt-10 justify-center">
      
			<button
				disabled={disabled}
        className="py-1 
        text-white 
        border-white rounded-full border-2
        w-1/2 items disabled:opacity-40
				transition ease-out"
				onClick={() => saveLocation(weather.name)}
      >
        <div className="flex flex-row justify-center items-center">
          <UilBookmark className="mr-2" /> Save Location
        </div>
      </button>

    </div>
  );
}

export default SaveButton;
