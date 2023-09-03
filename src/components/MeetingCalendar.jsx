/* eslint-disable no-unused-vars */
import {useState, React} from "react";
import "react-calendar/dist/Calendar.css";
import {Calendar as MyCalendar} from "react-calendar";
import Time from "./Time";
import "./MeetingCalendar.css";
import PropTypes from "prop-types";

/**
 * Component to display a calendar with date selection and appointment times.
 * @return {React.component} - The component displaying the calendar.
 */
const MeetingCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [selectedTimes, setSelectedTimes] = useState([]);

    const getChosenHours = (hoursArr) => {
        setSelectedTimes(hoursArr);
        console.log("hour outside : " + hoursArr);
    };

    /**  changes the date eselected in the calendar and shows the available hours
    * @param {Event} e
    */
    function onClickDate(e) {
        setShowTime(true);
        const year = e.getFullYear(); // Get the year (e.g., 2023)
        const month = e.getMonth(); // Get the month (0 for January, 11 for December)
        const day = e.getDate(); // Get the day of the month (e.g., 16)
        const hours = e.getHours(); // Get the hours (e.g., 0)
        const minutes = e.getMinutes(); // Get the minutes (e.g., 0)
        const seconds = e.getSeconds(); // Get the seconds (e.g., 0)
        const milliseconds = e.getMilliseconds(); // Get the milliseconds (e.g., 0)

        console.log("Year:", year);
        console.log("Month:", month); // Note: Months are zero-based, so September is 8 (0-based).
        console.log("Day:", day);
        console.log("Hours:", hours);
        console.log("Minutes:", minutes);
        console.log("Seconds:", seconds);
        console.log("Milliseconds:", milliseconds);
        getDate(e);
    }
    /** prints the date in the format of: month day year
    * @param {Date} dateObj
    */
    function getDate(dateObj) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[dateObj.getMonth()]; // Get the month name

        // Get the day and year
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();

        // Create the formatted string
        const formattedDate = `${month} ${day} ${year}`;
        console.log("formated date: " + formattedDate);
    }
    /** Handles date change in the calendar
    * @param {Event} e
    */
    function onSetDate(e) {
        setDate(e);
    }

    return (
        <div className="calendar-page">
            <h1>React Calendar</h1>
            <div className="calendar-container">
                <MyCalendar
                    onChange={onSetDate}
                    value={date}
                    defaultView="month"
                    onClickDay={onClickDate}
                />
            </div>
            <Time showTime={showTime} date={date} setHour={getChosenHours} />
        </div>
    );
};

MeetingCalendar.propTypes = {
};

export default MeetingCalendar;
