import {useState, React, useEffect} from "react";
import {format, isSameDay} from "date-fns";
import "react-calendar/dist/Calendar.css";
import {Calendar as MyCalendar} from "react-calendar";
import Time from "../../components/ServiceProviderComponents/Time.jsx";
import "../../styles/ServiceProviderStyles/MeetingCalendar.css";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";
import {message} from "antd";

/**
 * Component to display a calendar with date selection and appointment times.
 * @return {React.component} - The component displaying the calendar.
 */
const MeetingCalendar = () => {
    const {loggedIn, userData} = useAuth();
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [isDayBlocked, setIsDayBlocked] = useState(false);
    const [blockedTimeSlotOfDate, setblockedTimeSlotOfDate] = useState({});
    const [currDateAppointments, setCurrDateAppointments] = useState([]);
    // New
    const [blockedDates, setBlockedDates] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [blockedTimeSlots, setBlockedTimeSlots] = useState();
    // for re-rendering after blocking operations
    const [isAfterBlockOperation, setIsAfterBlockOperation] = useState(false);

    const getData = async () => {
        if (loggedIn) {
            try {
                // setIsLoading(true);
                const response = await axios.get(`/serviceProvider/getAvailabilityManagmentData/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });

                const spBlockedDates = response.data.blockedDates;
                const spBlockedTimeSlots = response.data.blockedTimeSlots;
                const spAppointments = response.data.appointments;
                setBlockedDates(spBlockedDates);
                setAppointments(spAppointments);
                setBlockedTimeSlots(spBlockedTimeSlots);
            } catch (error) {
                console.log(error);
                message.error({

                    content: `${error.response.data.error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            }
        }
    };

    useEffect( () => {
        getData();
    }, []);

    useEffect( () => {
        getData();
        setShowTime(false);
    }, [isAfterBlockOperation]);

    // useEffect( () => {
    //     getData();
    // }, [date]);

    /**
     * Filter appointments by a specific date.
     *
     * @param {Date} date - The date to filter appointments for.
     * @param {Array} appointmentsArr - An array of appointment objects, each containing a `date` property.
     * @return {Array} - An array of appointments that match the specified date.
     */
    const filterAppointemtnsByDayAndStatus = (date, appointmentsArr) => {
        return appointmentsArr.filter((appointemt)=>{
            return isSameDay(new Date(appointemt.date), date) && appointemt.status !== "Canceled";
        });
    };

    /**
     * Get the blocked time slots for a given date.
     *
     * @param {string} dateStr - The date in string format ("MMM-d-yyyy") to check for blocked time slots.
     * @param {Array} blockedTimesSlotsArr - An array containing objects representing blocked time slots, each with a `date` and `blockedHours` property.
     * @return {Array} - An array of blocked hours for the specified date, or an empty array if there are none.
     */
    function getBlockedTimeSlotOfDate(dateStr, blockedTimesSlotsArr) {
        // Run on all the blocked time slots of the user
        for (const timeSlotObj of blockedTimesSlotsArr) {
            // If the user has a blocked time slots on the chosen date
            if (timeSlotObj.date === dateStr) {
                return timeSlotObj;
            }
        }
        return {};
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
        // const blockedDates = serviceProvider.blockedDates;
        const blockedTimeSlotsOfDate = getBlockedTimeSlotOfDate(newDateToString, blockedTimeSlots);
        const chosenDateAppointments = filterAppointemtnsByDayAndStatus(newDate, appointments);

        // If the chosen date is a blocked date
        if (blockedDates.includes(newDateToString)) {
            setIsDayBlocked(true);
        } else {
            // else it's not a blocked date
            setIsDayBlocked(false);
            // set the blocked hours for the current date
            setblockedTimeSlotOfDate(blockedTimeSlotsOfDate);
            // set the appointments for the current date
            setCurrDateAppointments(chosenDateAppointments);
        }
    }


    const getTitleClassName = ({view, date}) => {
        if (view === "month" && blockedDates.includes(format(date, "MMM d yyyy"))) {
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
            <Time showTime={showTime} date={date} isDayBlocked={isDayBlocked} blockedTimeSlotOfDate={blockedTimeSlotOfDate} scheduledAppointments={currDateAppointments} setIsAfterBlockOperation={() => setIsAfterBlockOperation(!isAfterBlockOperation)} />
        </div>
    );
};

export default MeetingCalendar;
