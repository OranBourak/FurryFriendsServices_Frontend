import React, {useState, useEffect} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {ButtonGroup, Button, Table} from "react-bootstrap";
import {isSameWeek, isSameMonth, isSameDay} from "date-fns";
import "../../styles/ServiceProviderStyles/appManagment.css";

const initialAppointments = [
    {
        id: 1,
        clientName: "John Doe",
        phoneNumber: "123-456-7890",
        appointmentType: "Consultation",
        date: new Date(2023, 8, 10, 9, 0), // Date format: Year, Month (0-based index), Day, Hour, Minute
    },
    {
        id: 2,
        clientName: "Jane Smith",
        phoneNumber: "987-654-3210",
        appointmentType: "Follow-up",
        date: new Date(2023, 8, 15, 14, 0), // Date format: Year, Month (0-based index), Day, Hour, Minute
    },
    {
        id: 3,
        clientName: "Alice Johnson",
        phoneNumber: "555-123-4567",
        appointmentType: "Check-up",
        date: new Date(2023, 8, 20, 10, 0), // Date format: Year, Month (0-based index), Day, Hour, Minute
    },
    {
        id: 4,
        clientName: "Bob Brown",
        phoneNumber: "555-987-6543",
        appointmentType: "Consultation",
        date: new Date(2023, 8, 25, 15, 0), // Date format: Year, Month (0-based index), Day, Hour, Minute
    },
    {
        id: 5,
        clientName: "John Doe",
        phoneNumber: "123-456-7890",
        appointmentType: "Consultation",
        date: new Date(2023, 8, 10, 10, 0), // Date format: Year, Month (0-based index), Day, Hour, Minute
    },
    {
        id: 6,
        clientName: "John Doe",
        phoneNumber: "123-456-7890",
        appointmentType: "Consultation",
        date: new Date(2023, 7, 10, 10, 0), // Date format: Year, Month (0-based index), Day, Hour, Minute
    },
    // Add more appointments here...
];

const AppointmentsCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [appointments] = useState(initialAppointments);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [format, setFormat] = useState("month");

    useEffect(() => {
        setFormat("month");
        setFilteredAppointments(filterByMonth(date));
        setDate(new Date());
    }, []);

    const filterByDay = (date) => {
        return appointments.filter((a) => {
            return isSameDay(a.date, date);
        });
    };

    const filterByMonth = (date) => {
        return appointments.filter((a) => {
            return isSameMonth(a.date, date);
        });
    };

    const filterByWeek = (date) => {
        return appointments.filter((a) => {
            return isSameWeek(a.date, date);
        });
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        if (format === "month") {
            setFilteredAppointments(filterByMonth(newDate));
        } else if (format === "week") {
            setFilteredAppointments(filterByWeek(newDate));
        } else if (format === "day") {
            setFilteredAppointments(filterByDay(newDate));
        }
    };

    const handleClick = (newFormat) => {
        setFormat(newFormat);
        if (newFormat === "month") {
            setFilteredAppointments(filterByMonth(date));
        } else if (newFormat === "week") {
            setFilteredAppointments(filterByWeek(date));
        } else if (newFormat === "day") {
            setFilteredAppointments(filterByDay(date));
        }
    };

    // Function to check if a date has appointments
    const dateHasAppointments = (date) => {
        return filteredAppointments.some((a) => isSameDay(a.date, date));
    };

    // Function to determine the CSS class for calendar tiles
    const getTileClassName = ({view, date}) => {
        if (view === "month" && dateHasAppointments(date)) {
            return "has-appointments";
        }
        return "";
    };

    return (
        <div className="container calendar-container">
            <h1 className="text-center">Appointments Calendar</h1>
            <div className="container d-flex justify-content-center">
                <div className="calendar-border">
                    <Calendar
                        value={date}
                        onClickDay={handleDateChange}
                        tileClassName={getTileClassName}
                    />
                </div>
            </div>
            <h2 className="mt-4">Appointments for {date.toLocaleDateString()}</h2>
            <ButtonGroup className="mb-3">
                <Button
                    variant={format === "day" ? "primary" : "secondary"}
                    onClick={() => handleClick("day")}
                >
            Day
                </Button>
                <Button
                    variant={format === "week" ? "primary" : "secondary"}
                    onClick={() => handleClick("week")}
                >
            Week
                </Button>
                <Button
                    variant={format === "month" ? "primary" : "secondary"}
                    onClick={() => handleClick("month")}
                >
            Month
                </Button>
            </ButtonGroup>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client Name</th>
                        <th>Phone Number</th>
                        <th>Appointment Type</th>
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.clientName}</td>
                            <td>{appointment.phoneNumber}</td>
                            <td>{appointment.appointmentType}</td>
                            <td>
                                {appointment.date.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </td>
                            <td>{appointment.date.toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AppointmentsCalendar;
