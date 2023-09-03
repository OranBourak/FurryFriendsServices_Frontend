import React, {useState} from "react";
import PropTypes from "prop-types";

const times = ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"];

/**
 * Component to display available appointment times.
 *
 * @param {Object} props - The component's props.
 * @param {Date} props.date - The date for which to display available times.
 * @param {function} props.setHourOutside - Sets the hour (string) in the calendar component
 * @return {React.Component} - The component displaying available times and selected time info.
 */
const Times = (props) => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

    const toggleTime = (time) => {
        let chosenHours;
        if (selectedTimes.includes(time)) {
            chosenHours = selectedTimes.filter((t) => t !== time);
        } else if (selectedTimes.length < 2) {
            chosenHours = [...selectedTimes, time];
        } else {
            chosenHours = [...selectedTimes.slice(1), time];
            // If a new time was selected and there are already 2 hours selected
        }
        setSelectedTimes(chosenHours);
        displayInfo(chosenHours);
    };

    const displayInfo = (chosenHours) => {
        setShowInfo(true);
        props.setHourOutside(chosenHours.sort());
        console.log("chosen hours real : " + chosenHours);
    };

    return (
        <div className="flex-col">
            <div className="time-buttons">
                {/* The hours list */}
                {times.map((time) => {
                    const isSelected = selectedTimes.includes(time);
                    return (
                        <button
                            key={time}
                            onClick={() => toggleTime(time)}
                            className={`time-button ${isSelected ? "time-selected" : "time-diselected"}`}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
            <div className="time-display">
                {showInfo? `Your appointment is set to ${selectedTimes.sort().join(" until ")} ${props.date.toDateString()}`: null}
            </div>
        </div>
    );
};

Times.propTypes = {
    date: PropTypes.instanceOf(Date),
    setHourOutside: PropTypes.func,
};

export default Times;
