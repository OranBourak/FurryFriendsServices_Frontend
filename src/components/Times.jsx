import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// import {useBlockedDateContext} from "./useBlockedDateContext.jsx";

const times = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
];

/**
 * Component to display available appointment times.
 *
 * @param {Object} props - The component's props.
 * @param {Date} props.date - The date for which to display available times.
 * @return {React.Component} - The component displaying available times and selected time info.
 */
const Times = (props) => {
    const [selectedTimes, setSelectedTimes] = useState([]);

    useEffect(() => setSelectedTimes([]), [props.date]);

    const toggleTime = (time, isSelected) => {
        let chosenHours;
        // If the hour is already selected deselect it.
        if (isSelected) {
            chosenHours = selectedTimes.filter((t) => t !== time);
        } else if (selectedTimes.length < 2) {
            // If the hours is not selected and the number ofselected hours is less than 2
            // add the new selected time to the selectedTimes list
            chosenHours = [...selectedTimes, time];
        } else {
            // If a new time was selected and there are already 2 hours selected
            // emove the first hours selected(by index) and add the new selected time to the selectedTimes list
            chosenHours = [...selectedTimes.splice(1), time];
        }
        setSelectedTimes(chosenHours);
    };

    /**
     * Checks if a specific hour is scheduled for an appointment.
     *
     * @param {string} timeStr - The time in HH:mm format to check.
     * @return {boolean} - `true` if the hour is scheduled, `false` otherwise.
     */
    function isHourScheduledForAppointment(timeStr) {
        // If there are no scheduled appointments for the chosen date
        if (props.scheduledAppointments.length === 0) {
            return false;
        }
        // Run on all the appintments scheduled for the selected date
        for (const appointment of props.scheduledAppointments) {
            // If the time of the appointment is the same as the time argument
            const appointmentHourStr = appointment.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            if (appointmentHourStr === timeStr) {
                return true;
            }
        }
        // No appointment matches the provided time
        return false;
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex-col">
            <form onSubmit={onSubmitHandle}>
                <div className="time-buttons">
                    {/* The hours list */}
                    {times.map((time) => {
                        const isSelected = selectedTimes.includes(time);
                        const isBlockedHour = props.blockedHours.includes(time);
                        const isAppointmentHour = isHourScheduledForAppointment(time);
                        return (
                            <button
                                key={time}
                                disabled={props.isDayBlocked || isBlockedHour || isAppointmentHour}
                                onClick={() => toggleTime(time, isSelected)}
                                className={
                                    props.isDayBlocked || isBlockedHour ?
                                        "time-button time-blocked" :
                                        `time-button ${isSelected ? "time-selected" : ( isAppointmentHour ? "time-booked" : "time-deselected" ) }
                                        }`
                                }
                            >
                                {time}
                            </button>
                        );
                    })}
                </div>
                <div className="time-display">
                    {!props.isDayBlocked ? (
                        <p>
                            Your appointment is set to {selectedTimes.sort().join(" until ")}{" "}
                            {props.date.toDateString()}
                        </p>
                    ) : (
                        <p>This date is blocked</p>
                    )}
                </div>
                <button type="submit">Submit Me</button>
            </form>
        </div>
    );
};

Times.propTypes = {
    date: PropTypes.instanceOf(Date),
    isDayBlocked: PropTypes.bool,
    blockedHours: PropTypes.arrayOf(PropTypes.string),
    scheduledAppointments: PropTypes.arrayOf(PropTypes.object),
};

export default Times;
