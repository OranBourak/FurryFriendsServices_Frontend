import {Calendar, TimePicker, Button, Select, Modal, notification} from "antd";
import React, {useState, useEffect} from "react";
import "../../styles/ClientStyles/scheduleAppointment.css";
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
        setSelectedTime(time ? moment().hour(time.hour()).startOf("hour") : null);
    };

    // Handler for when a service is selected from the dropdown
    const handleServiceChange = (serviceId) => {
        const selectedService = appointmentTypes.find((type) => type._id === serviceId);
        setSelectedService(selectedService);
    };


    // Handler for creating an appointment with the selected details
    const handleCreateAppointment = async () => {
        // Validate that all required fields are selected
        if (!selectedDate || !selectedTime || !selectedService) {
            Modal.warning({
                title: "Missing Information",
                content: "Please select a date, time, and service type before creating an appointment.",
            });
            return;
        }

        // Calculate disabled hours for the selected date
        const disabledHours = calculateDisabledHours();

        const selectedHour = selectedTime.hour();
        const serviceDuration = selectedService.duration;

        // Check for time conflicts with disabled hours
        for (let i = 0; i < serviceDuration; i++) {
            const checkHour = selectedHour + i;
            if (disabledHours.includes(checkHour)) {
                console.log("Time conflict detected"); // For debugging
                Modal.warning({
                    title: "Time Conflict",
                    content: "The selected time conflicts with blocked hours. Please choose another time.",
                });
                return;
            }
        }


        // Prepare the appointment data
        const appointmentData = {
            // TODO: Replace with the actual client ID , useContext
            clientId: "64fbbd0998813acba7948e20",
            serviceProviderId: providerID,
            status: "Upcoming",
            appointmentType: selectedService._id,
            date: moment().set({
                hour: selectedTime.hour(),
                minute: selectedTime.minute(),
                date: selectedDate.date(),
            }).format("YYYY-MM-DDTHH:mm:ss"),
            duration: selectedService.duration,
        };

        try {
            // Make an API call to create the appointment
            const response = await axios.post("/appointment/createAppointment", appointmentData);

            if (response.status === 201) {
                notification.success({message: "Success", description: "Appointment successfully created!"});
                // TODO: Refresh the appointments (or navigate to another page)
            } else {
                Modal.error({title: "Error", content: "Failed to create the appointment."});
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
            Modal.error({title: "Error", content: "An error occurred while creating the appointment. Please try again later."});
        }
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
        return {
            disabledHours: () => calculateDisabledHours(),
        };
    };

    const calculateDisabledHours = () => {
        const selectedDateStr = selectedDate?.format("YYYY-MM-DD");
        const disabledHours = [];

        // Disable hours outside of 8-21
        for (let i = 0; i < 8; i++) {
            disabledHours.push(i);
        }
        for (let i = 22; i < 24; i++) {
            disabledHours.push(i);
        }

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

        return disabledHours;
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
                    disabled={!selectedDate || !selectedService} // Disable TimePicker if date or service is not selected
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
