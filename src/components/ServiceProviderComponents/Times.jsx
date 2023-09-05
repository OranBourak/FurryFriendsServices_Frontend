/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import YesNoConfirmationWindow from "./YesNoConfirmationWindow.jsx";
import ErrorToast from "./ErrorToast.jsx";

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
 * @param {TimesPropTypes} props - The component's props.
 * @return {React.Component} - The component displaying available times and selected time info.
 */
const Times = (props) => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    // Yes No Dialog
    const [showDialog, setShowDialog] = useState(false);
    const [dialogText, setDialogText] = useState("");
    const [onDialogConfirm, setOnDialogConfirm] = useState(null);
    // Error Handeling
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect(() => setSelectedTimes([]), [props.date]);
    // useEffect(() => setBookedHoursArr(getBookedHoursArr()), [props.date]);

    const onDialogClose = () => {
        setShowDialog(false);
    };

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

    const getBookedHoursArr = () => {
        const res = [];
        // Run on all the appointemnts scheduled to the selected date
        for (const appointment of props.scheduledAppointments) {
            // Take the start hour of the appointemnt as a string
            const startHour = appointment.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            // calculate the following hours based on the appointment's duration
            const appointmentHours = generateHoursArray(startHour, appointment.duration);
            res.push(...appointmentHours);
        }
        return res;
    };

    /**
     * Generates an array of hours starting from a specified hour and lasting for a given duration.
     *
     * @param {string} startHour - The starting hour in HH:mm format (e.g., '14:00').
     * @param {number} duration - The number of hours to generate.
     * @return {string[]} An array of formatted hours in HH:mm format.
     */
    function generateHoursArray(startHour, duration) {
        const hoursArray = [];
        const [startHourStr, startMinuteStr] = startHour.split(":");
        const startHourInt = parseInt(startHourStr, 10);
        const startMinuteInt = parseInt(startMinuteStr, 10);

        for (let i = 0; i < duration; i++) {
            const currentHour = startHourInt + i;
            const currentMinute = startMinuteInt;

            // Ensure hours and minutes are formatted as two-digit strings
            const formattedHour = currentHour.toString().padStart(2, "0");
            const formattedMinute = currentMinute.toString().padStart(2, "0");

            hoursArray.push(`${formattedHour}:${formattedMinute}`);
        }

        return hoursArray;
    }

    // const onSubmitHandle = (e) => {
    //     e.preventDefault();
    // };

    /**
     * Handles blocking the selected date.
     * This function should be used to save the blocked date in the database.
     * @return {void}
     */
    function blockDay() {
        // TODO: Add logic for saving the blocked date in the database
        console.log("In block date, should save in db");
    };

    const handleBlockDay = () => {
        console.log("in handle block day");
        // If there are scheduled appointments on the selected date
        if (props.scheduledAppointments.length > 0 ) {
            setErrorFlag(true);
            setErrorText("there are scheduled appointments on the selected date");
            console.log("there are scheduled appointments on the selected date");
            return;
        }
        console.log("type: " + typeof(onDialogConfirm));
        setShowDialog(true);
        setOnDialogConfirm(() => blockDay);
        setDialogText("Are you sure you want to block the date?");
    };

    const handleBlockHours = () => {
        // add logic for handling the number of hours button chose
        const sortedTimes = selectedTimes.sort();
        // If the user chose range of hours
        if (sortedTimes.length === 2) {
            // If there is an appointment scheduled between those hours
            if (scheduledAppointmentBetween(sortedTimes[0], sortedTimes[1])) {
                setErrorFlag(true);
                setErrorText(`there are scheduled appointments between ${sortedTimes[0]} and ${sortedTimes[1]}`);
                return;
            }
        }
        console.log("in handle block hours");
        setShowDialog(true);
        setOnDialogConfirm(() => blockHours);
        setDialogText("Are you sure you want to block the hours?");
    };

    /**
     * Handles blocking the selected range of the selected.
     * This function should be used to save the blocked date in the database.
     * @return {void}
     */
    function blockHours() {
        // TODO: Add logic for saving the blocked hours in the database
        console.log("In block hours, should save in db");
    };

    const scheduledAppointmentBetween = (startTime, endTime) => {
        // Run on all the hours that are booked
        for (const hour of bookedHoursArr) {
            // Check if there is a booked hour that is between start hour and end hours
            if (hour >= startTime && hour <= endTime) {
                return true;
            }
        }
        return false;
    };

    const bookedHoursArr = getBookedHoursArr().sort();

    return (
        <div className="flex-col">
            <div className="container d-flex justify-content-center mt-3">
                <ErrorToast show={errorFlag} errorText={errorText} setShow={setErrorFlag}/>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <Button variant="dark mt-3 mb-3" disabled={props.isDayBlocked} onClick={handleBlockDay}>Block Day</Button>
            </div>
            <div className="time-buttons">
                {/* The hours list */}
                {times.map((time) => {
                    const isSelected = selectedTimes.includes(time);
                    const isBlockedHour = props.blockedHours.includes(time);
                    const isAppointmentHour = bookedHoursArr.includes(time);
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
            <div className="container d-flex justify-content-center mt-3">
                <Button variant="dark" disabled={props.isDayBlocked || selectedTimes.length===0} onClick={handleBlockHours}>Block Hours</Button>
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
            <YesNoConfirmationWindow show={showDialog} onConfirm={onDialogConfirm} onClose={onDialogClose} dialogText={dialogText} />
        </div>
    );
};

/**
 * PropTypes for the Times component.
 *
 * @typedef {Object} TimesPropTypes
 * @property {Date} date - The date for which to display available times.
 * @property {boolean} isDayBlocked - A flag indicating whether the selected date is blocked.
 * @property {string[]} blockedHours - An array of strings representing blocked hours for the selected date.
 * @property {Object[]} scheduledAppointments - An array of appointment objects scheduled for the specific date.
 * @property {Date} scheduledAppointments[].date - The date and time of a scheduled appointment.
 * @property {Number} scheduledAppointments[].duration - The duration of the appointment(one of: 1, 2, 3, 4, 5)
 */
Times.propTypes = {
    date: PropTypes.instanceOf(Date),
    isDayBlocked: PropTypes.bool,
    blockedHours: PropTypes.arrayOf(PropTypes.string),
    scheduledAppointments: PropTypes.arrayOf(PropTypes.object),
};

export default Times;
