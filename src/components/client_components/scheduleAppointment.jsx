import {Calendar, TimePicker, Button, Select} from "antd";
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";

const {Option} = Select;

// Main component for scheduling an appointment
const ScheduleAppointment = ({providerID}) => {
    // State variables to hold user selections
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [blockedDates, setBlockedDates] = useState([]);
    const [blockedTimeSlots, setBlockedTimeSlots] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [appointmentTypes, setAppointmentTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/client/serviceProviderSchedule/${providerID}`);
                const {blockedDates, blockedTimeSlots, appointments, appointmentTypes} = response.data;

                setBlockedDates(blockedDates);
                setBlockedTimeSlots(blockedTimeSlots);
                setAppointments(appointments);
                setAppointmentTypes(appointmentTypes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [providerID]);


    // Handler for when a date is selected from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Handler for when a time is selected from the time picker
    const handleTimeChange = (time) => {
        setSelectedTime(time ? moment(time.format("HH") + ":00", "HH:mm") : null);
    };

    // Handler for when a service is selected from the dropdown
    const handleServiceChange = (serviceId) => {
        const selectedService = appointmentTypes.find((type) => type._id === serviceId);
        setSelectedService(selectedService);
    };


    // Handler for creating an appointment with the selected details
    // TODO: implement this function
    const handleCreateAppointment = () => {
    // clientID, serviceProviderID, status, date, duration
        const appointment = {}
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
        const selectedDateStr = selectedDate?.format("YYYY-MM-DD");
        const disabledHours = [];

        // Block time slots based on blockedTimeSlots
        const blockedTimeSlot = blockedTimeSlots.find(
            (slot) => moment(slot.date, "MMM D YYYY").format("YYYY-MM-DD") === selectedDateStr,
        );

        if (blockedTimeSlot) {
            blockedTimeSlot.blockedHours.forEach((hour) => {
                const [startHour] = hour.split(":");
                disabledHours.push(parseInt(startHour, 10));
            });
        }

        // Block time slots based on existing appointments
        appointments.forEach((appointment) => {
            const appointmentDate = moment.utc(appointment.date).format("YYYY-MM-DD");
            const appointmentHour = moment.utc(appointment.date).hour();

            if (appointmentDate === selectedDateStr) {
                for (let i = 0; i < appointment.duration; i++) {
                    disabledHours.push(appointmentHour + i);
                }
            }
        });

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
                <h2>Select Service</h2>
                {/* Dropdown for service selection */}
                <Select onChange={handleServiceChange} style={{width: 300}}>
                    {appointmentTypes.map((type) => (
                        <Option key={type._id} value={type._id}>
                            {`${type.name} - $${type.price} - ${type.duration} hour(s)`}
                        </Option>
                    ))}
                </Select>
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
