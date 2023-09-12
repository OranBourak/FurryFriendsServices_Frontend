import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import YesNoConfirmationWindow from "./YesNoConfirmationWindow.jsx";
import ErrorToast from "./ErrorToast.jsx";
import {isBefore, isToday, format} from "date-fns";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";
import {message} from "antd";

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
    const {loggedIn, userData} = useAuth();
    const [selectedTimes, setSelectedTimes] = useState([]);
    // Yes No Dialog
    const [showDialog, setShowDialog] = useState(false);
    const [dialogText, setDialogText] = useState("");
    const [onDialogConfirm, setOnDialogConfirm] = useState(null);
    // Error Handeling
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorText, setErrorText] = useState("");
    // Disable actions handeling
    const [isInBlockOperation, setIsInBlockOperation] = useState(false);

    useEffect(() => setSelectedTimes([]), [props.date]);
    // useEffect(() => setBookedHoursArr(getBookedHoursArr()), [props.date]);

    const onDialogClose = () => {
        setShowDialog(false);
    };

    const getFormatedDate = () => {
        return format(props.date, "MMM d yyyy");
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
            // const startHour = appointment.date.toLocaleTimeString([], {
            //     hour: "2-digit",
            //     minute: "2-digit",
            //     hour12: false,
            // });
            const startHour = getAppointemntStartHour(appointment);
            // calculate the following hours based on the appointment's duration
            const appointmentHours = generateHoursArray(startHour, appointment.duration);
            res.push(...appointmentHours);
        }
        return res;
    };

    const getAppointemntStartHour = (appointment) => {
        // set the time fof the appointemnt date to Isarel time
        const appointmentDate = new Date(appointment.date);
        appointmentDate.setMinutes(appointmentDate.getMinutes() - 180);
        // get the start hour of the appointment
        const hours = appointmentDate.getHours();
        const minutes = appointmentDate.getMinutes();

        // Formatting to "hh:mm" format
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        return formattedTime;
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
     * @param {boolean} isLoggedin - service provider token
     * @param {string} userToken - service provider token
     * @return {void}
     */
    const blockDay = async () => {
        if (!loggedIn) {
            handleError("Unauthorized");
            return;
        }
        // Disable Block Buttons
        setIsInBlockOperation(true);
        const dateToBlock = getFormatedDate();
        try {
            await axios.post(`/serviceProvider/blockDate/${userData.id}`, {
                dateToBlock: dateToBlock,
            });
        } catch (error) {
            console.log(error);
            message.error({

                content: `${error}`,

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
        }
        // Enable Block Buttons
        setIsInBlockOperation(false);
        props.setIsAfterBlockOperation();
    };

    const handleBlockDay = () => {
        const chosenDate = props.date;
        // If the selected date has already past
        if (isBefore( chosenDate, new Date() ) && !isToday(chosenDate) ) {
            handleError("The date you are trying to block has already past");
            return;
        }
        // If there are scheduled appointments on the selected date
        if (props.scheduledAppointments.length > 0 ) {
            handleError("there are scheduled appointments on the selected date");
            return;
        }

        setShowDialog(true);
        setOnDialogConfirm( () => blockDay );
        setDialogText(`Are you sure you want to block the date: ${getFormatedDate()}?`);
    };

    const handleBlockHours = () => {
        const chosenDate = props.date;
        const sortedTimes = selectedTimes.sort();
        const isRangeSelected = sortedTimes.length === 2;
        // If the user chose range of hours
        if (isRangeSelected) {
            // If the user blocked the whole day
            if (sortedTimes[0] === "08:00" && sortedTimes[1] === "22:00") {
                handleBlockDay();
                return;
            }
        }
        // If the selected date has already past
        if (isBefore( chosenDate, new Date() ) && !isToday(chosenDate) ) {
            handleError("The hours you sre trying to block are on a date that has already past");
            return;
        }
        // If the selected date is the current date and the start hour the user chose has already past
        if ( isToday(chosenDate) && sortedTimes[0] < currentHour ) {
            handleError(`The hour you chose: ${sortedTimes[0]} has already past`);
            return;
        }

        // If the user chose range of hours
        if (isRangeSelected) {
            // If there is an appointment scheduled between those hours
            if (scheduledAppointmentBetween(sortedTimes[0], sortedTimes[1])) {
                handleError(`there are scheduled appointments between ${sortedTimes[0]} and ${sortedTimes[1]}`);
                return;
            }
        } else {
            // If the user chose one hour
            // If the hour is 22:00
            if (sortedTimes[0] === "22:00") {
                handleError("The hour 22:00 can't be blocked, no appointments can be scheduled after 22:00");
                return;
            }
        }
        setShowDialog(true);
        setOnDialogConfirm(() => blockHours);
        setDialogText(`Are you sure you want to block the hours: ${sortedTimes.join(" untill ")}?`);
    };

    /**
     * Handles blocking the selected range of the selected.
     * This function should be used to save the blocked date in the database.
     * @return {void}
     */
    const blockHours = async () => {
        if (!loggedIn) {
            handleError("Unauthorized");
            return;
        }
        // Disable Block Buttons
        setIsInBlockOperation(true);
        // TODO: Add logic for saving the blocked hours in the database
        const hoursToBlock = generateBlockedHoursList();
        // If there are no blocked hours on the selected date
        if (!props.blockedTimeSlotOfDate._id) {
            // create a new BlockedTimeSlot object
            try {
                await axios.post(`/blockedTimeSlot/create/${userData.id}`, {
                    date: getFormatedDate(),
                    blockedHours: hoursToBlock,
                });
            } catch (error) {
                console.log(error);
                message.error({

                    content: `${error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            }
        } else {
            // If there are blocked hours on the selected date
            // Prepare the new array of blocked hours
            const blockedHoursArr = props.blockedTimeSlotOfDate.blockedHours;
            for (const time of hoursToBlock) {
                if (!blockedHoursArr.includes(time)) {
                    blockedHoursArr.push(time);
                }
            }
            const sortedblockedHoursArr = blockedHoursArr.sort();
            try {
                await axios.patch(`/blockedTimeSlot/update/${props.blockedTimeSlotOfDate._id}`, {
                    blockedHours: sortedblockedHoursArr,
                });
            } catch (error) {
                console.log(error);
                message.error({

                    content: `${error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            }
        }
        // Enable Block Buttons
        setIsInBlockOperation(false);
        props.setIsAfterBlockOperation();
    };

    const generateBlockedHoursList = () => {
        const sortedTimes = selectedTimes.sort();
        const startHour = sortedTimes[0];
        const endHour = sortedTimes[1];
        const res = times.filter((time) => time >= startHour && time < endHour);
        return res;
        // const res = [startHour];
        // for (const time of times) {

        // }
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

    const handleError = (errorText) => {
        setErrorFlag(true);
        setErrorText(errorText);
    };


    const bookedHoursArr = getBookedHoursArr().sort();
    const currentHour = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const getTimeButtonClassName = (isSelected, isBlockedHour, isAppointmentHour, buttonHour) => {
        // If the date or the hour are bloccked
        if (props.isDayBlocked || isBlockedHour) {
            return "time-button time-blocked";
        }
        // If the hour is booked
        if (isAppointmentHour) {
            return "time-button time-booked";
        }
        // If the user selected the date by pressing it
        if (isSelected) {
            return "time-button time-selected";
        }
        // If the user chose range of hours
        if (selectedTimes.length === 2) {
            const sortedTimes = selectedTimes.sort();
            // If the hour presented in the button is between the hours the user chose
            if (buttonHour > sortedTimes[0] && buttonHour < sortedTimes[1]) {
                return "time-button time-between-selected";
            }
        }
        return "time-button time-deselected";
    };

    const getIsBlockedHour = (timeStr) => {
        // If there are no blocked hours on the selected date
        if (!props.blockedTimeSlotOfDate._id) {
            return false;
        }
        return props.blockedTimeSlotOfDate.blockedHours.includes(timeStr);
    };

    return (
        <div className="flex-col">
            <div className="container d-flex justify-content-center mt-3">
                <ErrorToast show={errorFlag} errorText={errorText} setShow={setErrorFlag}/>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <Button variant="dark mt-3 mb-3" disabled={props.isDayBlocked || isInBlockOperation} onClick={handleBlockDay}>Block Day</Button>
            </div>
            <div className="time-buttons">
                {/* The hours list */}
                {times.map((time) => {
                    const isSelected = selectedTimes.includes(time);
                    const isBlockedHour = getIsBlockedHour(time);
                    const isAppointmentHour = bookedHoursArr.includes(time);
                    return (
                        <button
                            key={time}
                            disabled={props.isDayBlocked || isBlockedHour || isAppointmentHour}
                            onClick={() => toggleTime(time, isSelected)}
                            className={getTimeButtonClassName(isSelected, isBlockedHour, isAppointmentHour, time)}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
            <div className="container d-flex justify-content-center mt-3">
                <Button variant="dark" disabled={props.isDayBlocked || selectedTimes.length===0 || isInBlockOperation} onClick={handleBlockHours}>Block Hours</Button>
            </div>
            <div className="time-display">
                {props.isDayBlocked && <p className="text-white">This date is blocked</p>}
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
 * @property {object} blockedTimeSlotOfDate - An array of strings representing blocked hours for the selected date.
 * @property {Object[]} scheduledAppointments - An array of appointment objects scheduled for the specific date.
 * @property {Date} scheduledAppointments[].date - The date and time of a scheduled appointment.
 * @property {Number} scheduledAppointments[].duration - The duration of the appointment(one of: 1, 2, 3, 4, 5)
 */
Times.propTypes = {
    date: PropTypes.instanceOf(Date),
    isDayBlocked: PropTypes.bool,
    blockedTimeSlotOfDate: PropTypes.object,
    scheduledAppointments: PropTypes.arrayOf(PropTypes.object),
    setIsAfterBlockOperation: PropTypes.func,
};

// className={
//     props.isDayBlocked || isBlockedHour ?
//         "time-button time-blocked" :
//         `time-button ${isSelected ?
//             "time-selected" :
//             ( isAppointmentHour ? "time-booked" : "time-deselected" ) }
//         }`
// }

export default Times;
