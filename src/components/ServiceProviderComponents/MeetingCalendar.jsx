/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import {useState, React} from "react";
import {format, isSameDay} from "date-fns";
import "react-calendar/dist/Calendar.css";
import {Calendar as MyCalendar} from "react-calendar";
import Time from "../../components/ServiceProviderComponents/Time.jsx";
import "../../styles/ServiceProviderStyles/MeetingCalendar.css";
import Button from "react-bootstrap/Button";

const serviceProvider = {
    country: "",
    city: "",
    name: "",
    gender: ["Male", "Female", "Other"],
    picture: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
    typeOfService: "",
    reviews: [],
    averageRating: "",
    blockedDates: ["Sep 7 2023"],
    blockedTimeSlots: [
        {
            date: "Sep 8 2023",
            blockedHours: ["08:00", "10:00"],
        },
    ],
    appointments: [
        {
            id: 2,
            clientName: "Jane Smith",
            phoneNumber: "987-654-3210",
            appointmentType: "Follow-up",
            date: new Date(2023, 8, 15, 14, 0), // Date format: Year, Month (0-based index), Day, Hour, Minute
            duration: 5,
        },
        {
            id: 3,
            clientName: "Jane For",
            phoneNumber: "987-654-3210",
            appointmentType: "Follow-up",
            date: new Date(2023, 9, 15, 14, 0), // Date format: Year, Month (0-based index), Day, Hour, Minute
        },
    ],
    appointmentTypes: [],
};

/**
 * Component to display a calendar with date selection and appointment times.
 * @return {React.component} - The component displaying the calendar.
 */
const MeetingCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [isDayBlocked, setIsDayBlocked] = useState(false);
    const [blockedHours, setBlockedHours] = useState([]);
    const [currDateAppointments, setCurrDateAppointments] = useState([]);

    /**
     * Filter appointments by a specific date.
     *
     * @param {Date} date - The date to filter appointments for.
     * @param {Array} appointmentsArr - An array of appointment objects, each containing a `date` property.
     * @return {Array} - An array of appointments that match the specified date.
     */
    const filterAppointemtnsByDay = (date, appointmentsArr) => {
        return appointmentsArr.filter((appointemt)=>{
            return isSameDay(appointemt.date, date);
        });
    };

    /**
     * Get the blocked time slots for a given date.
     *
     * @param {string} dateStr - The date in string format ("MMM-d-yyyy") to check for blocked time slots.
     * @param {Array} blockedTimesSlotsArr - An array containing objects representing blocked time slots, each with a `date` and `blockedHours` property.
     * @return {Array} - An array of blocked hours for the specified date, or an empty array if there are none.
     */
    function getBlockedTimeSlotsOfDate(dateStr, blockedTimesSlotsArr) {
        // Run on all the blocked time slots of the user
        for (const timeSlotObj of blockedTimesSlotsArr) {
            // If the user has a blocked time slots on the chosen date
            if (timeSlotObj.date === dateStr) {
                return timeSlotObj.blockedHours;
            }
        }
        return [];
    }

    /**  changes the date eselected in the calendar and shows the available hours
     * @param {Event} e
     */
    function onClickDate(e) {
        setDate(e);
        setShowTime(true);

        const newDate = e;
        const formatString = "MMM d yyyy";
        const newDateToString = format(newDate, formatString);
        const blockedDates = serviceProvider.blockedDates;
        const blockedTimeSlots = getBlockedTimeSlotsOfDate(newDateToString, serviceProvider.blockedTimeSlots);
        const chosenDateAppointments = filterAppointemtnsByDay(newDate, serviceProvider.appointments);
        // If the chosen date is a blocked date
        if (blockedDates.includes(newDateToString)) {
            setIsDayBlocked(true);
        } else {
            // If it's not a blocked date
            setIsDayBlocked(false);
            // Check if the chosen date has blocked hours
            setBlockedHours(blockedTimeSlots);
            // Check if the chosen date has booked appointmens
            if (chosenDateAppointments.length > 0) {
                setCurrDateAppointments(chosenDateAppointments);
            } else {
                setCurrDateAppointments([]);
            }
        }
    }


    const getTitleClassName = ({view, date}) => {
        if (view === "month" && serviceProvider.blockedDates.includes(format(date, "MMM d yyyy"))) {
            return "unavailable";
        }
        return "";
    };
    // /** Handles date change in the calendar
    //  * @param {Event} e
    //  */
    // function onSetDate(e) {
    // setDate(e);
    // }

    return (
        <div className="calendar-container">
            <h1>React Calendar</h1>
            <MyCalendar value={date} defaultView="month" onClickDay={onClickDate} tileClassName={getTitleClassName}/>
            <Button variant="dark mt-3 mb-3">Block Day</Button>
            <Time showTime={showTime} date={date} isDayBlocked={isDayBlocked} blockedHours={blockedHours} scheduledAppointments={currDateAppointments} />
        </div>
    );
};

export default MeetingCalendar;
