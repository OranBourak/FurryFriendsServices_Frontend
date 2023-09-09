import React, {useState} from "react";
import PropTypes from "prop-types";
import {Calendar, TimePicker, Button, Select} from "antd";
import moment from "moment";

const {Option} = Select;

// Main component for scheduling an appointment
const ScheduleAppointment = ({providerID}) => {
    // State variables to hold user selections
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedService, setSelectedService] = useState(null);

    // Sample data for dates and times that are not available
    const blockedDates = ["Sep 11 2023", "Sep 23 2023"];
    const blockedTimeSlots = [
        {date: "Sep 21 2023", blockedHours: ["08:00", "10:00"]},
        {date: "Sep 22 2023", blockedHours: ["08:00", "16:00"]},
    ];

    // Handler for when a date is selected from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Handler for when a time is selected from the time picker
    const handleTimeChange = (time) => {
        setSelectedTime(time ? moment(time.format("HH") + ":00", "HH:mm") : null);
    };

    // Handler for when a service is selected from the dropdown
    const handleServiceChange = (service) => {
        setSelectedService(service);
    };

    // Handler for creating an appointment with the selected details
    const handleCreateAppointment = () => {
        console.log("Creating appointment with the following details:");
        console.log("Date:", selectedDate?.format("YYYY-MM-DD"));
        console.log("Time:", selectedTime?.format("HH:mm"));
        console.log("Service:", selectedService);
    };

    // Function to disable specific dates on the calendar
    const disabledDate = (current) => {
        return (
            current &&
            (current < moment().endOf("day") ||
                blockedDates.includes(current.format("MMM D YYYY")))
        );
    };

    // Function to disable specific time slots in the time picker
    const disabledTime = () => {
        const selectedDateStr = selectedDate?.format("MMM D YYYY");
        const blockedTimeSlot = blockedTimeSlots.find(
            (slot) => slot.date === selectedDateStr,
        );

        const disabledHours = [];
        if (blockedTimeSlot) {
            blockedTimeSlot.blockedHours.forEach((hour) => {
                const [startHour] = hour.split(":");
                disabledHours.push(parseInt(startHour, 10));
            });
        }

        return {
            disabledHours: () => disabledHours,
        };
    };

    return (
        <div>
            <h1>Schedule Appointment</h1>
            <div>
                <h2>Select Date</h2>
                {/* Calendar component for date selection */}
                <Calendar
                    fullscreen={false}
                    onSelect={handleDateChange}
                    disabledDate={disabledDate}
                />
            </div>
            <div>
                <h2>Select Time</h2>
                {/* TimePicker component for time selection */}
                <TimePicker
                    onChange={handleTimeChange}
                    format="HH"
                    disabledTime={disabledTime}
                />
            </div>
            <div>
                <h2>Select Service</h2>
                {/* Dropdown for service selection */}
                <Select onChange={handleServiceChange} style={{width: 200}}>
                    <Option value="service1">Service 1</Option>
                    <Option value="service2">Service 2</Option>
                    <Option value="service3">Service 3</Option>
                </Select>
            </div>
            <div>
                {/* Button to create the appointment */}
                <Button type="primary" onClick={handleCreateAppointment}>
                    Create Appointment
                </Button>
            </div>
        </div>
    );
};

export default ScheduleAppointment;


ScheduleAppointment.propTypes = {
    providerID: PropTypes.string.isRequired,
};
