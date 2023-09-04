/* eslint-disable no-unused-vars */
import {useState, React} from "react";
import {format, isSameDay} from "date-fns";
import "react-calendar/dist/Calendar.css";
import {Calendar as MyCalendar} from "react-calendar";
import Time from "./Time";
import "./MeetingCalendar.css";
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

    const filterAppointemtnsByDay = (date, appointmentsArr) => {
        return appointmentsArr.filter((appointemt)=>{
            return isSameDay(appointemt.date, date);
        });
    };

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
        const blockedTimeSlots = serviceProvider.blockedTimeSlots;
        const chosenDateAppointments = filterAppointemtnsByDay(newDate, serviceProvider.appointments);
        // If the chosen date is a blocked date
        if (blockedDates.includes(newDateToString)) {
            setIsDayBlocked(true);
        } else {
            // If it's not a blocked date
            setIsDayBlocked(false);
            // Check if the chosen date has blocked hours
            blockedTimeSlots.forEach((timeslot) => {
                // If the chosen date appears in the blockedTimeSlots
                if (timeslot.date === newDateToString) {
                    // set the date's blocked timeslots to the blocked hours list.
                    setBlockedHours(timeslot.blockedHours);
                } else {
                    setBlockedHours([]);
                }
                // Check if the chosen date has booked appointmens
                if (chosenDateAppointments.length > 0) {
                    setCurrDateAppointments(chosenDateAppointments);
                } else {
                    setCurrDateAppointments([]);
                }
            });
        }
    }
    // /** Handles date change in the calendar
    //  * @param {Event} e
    //  */
    // function onSetDate(e) {
    // setDate(e);
    // }

    return (
        <div className="calendar-page">
            <h1>React Calendar</h1>
            <div className="calendar-container">
                <MyCalendar value={date} defaultView="month" onClickDay={onClickDate} />
            </div>
            <Button variant="secondary">Block Day</Button>
            {" "}
            <Button variant="dark">Block Hours</Button>
            <Time showTime={showTime} date={date} isDayBlocked={isDayBlocked} blockedHours={blockedHours} scheduledAppointments={currDateAppointments} />
        </div>
    );
};

export default MeetingCalendar;
