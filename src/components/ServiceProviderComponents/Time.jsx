import React from "react";
import Times from "./Times";
import PropTypes from "prop-types";
import "../../styles/ServiceProviderStyles/MeetingCalendar.css";

/**
 * A component to display the time list based on the given date if 'showTime' is true.
 *
 * @param {Object} props - The component's props.
 * @param {Date} props.date - The Date object to display the time from.
 * @param {boolean} props.showTime - A flag to determine whether to show the time or not.
 * @param {function} props.setHour - Sets the hour in the calendar component
 * @param {function} props.setIsAfterBlockOperation - re-renders the page after block operation
 * @return {React.Component} - The component displaying the time or null if 'showTime' is false.
 */
function Time(props) {
    return (
        <div className="appointment-time">
            {props.showTime ? (
                <Times date={props.date} isDayBlocked={props.isDayBlocked} blockedHours={props.blockedHours} scheduledAppointments={props.scheduledAppointments} setIsAfterBlockOperation={props.setIsAfterBlockOperation} />
            ) : null}
        </div>
    );
}

Time.propTypes = {
    date: PropTypes.instanceOf(Date),
    showTime: PropTypes.bool,
    isDayBlocked: PropTypes.bool,
    blockedHours: PropTypes.arrayOf(PropTypes.string),
    scheduledAppointments: PropTypes.arrayOf(PropTypes.object),
    setHour: PropTypes.func,
    setIsAfterBlockOperation: PropTypes.func,
};

export default Time;
