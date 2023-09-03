/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {ButtonGroup, Button, Table} from "react-bootstrap";
import {isSameWeek, isSameMonth, isSameDay} from "date-fns";

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


    const filterByDay = (date) => {
        return appointments.filter((a)=>{
            return isSameDay(a.date, date);
        });
    };

    const filterByMonth = (date) => {
        return appointments.filter((a)=>{
            return isSameMonth(a.date, date);
        });
    };

    const filterByWeek = (date) => {
        return appointments.filter((a)=>{
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

    const handleClick = (format) => {
        if (format === "month") {
            setFilteredAppointments(filterByMonth(date));
            setFormat("month");
        } else if (format === "week") {
            setFilteredAppointments(filterByWeek(date));
            setFormat("week");
        } else if (format === "day") {
            setFilteredAppointments(filterByDay(date));
            setFormat("day");
        }
    };

    return (
        <div className="container">
            <h1>Appointments Calendar</h1>
            <Calendar value={date} onClickDay={handleDateChange} />
            <h2>Appointments for {date.toLocaleDateString()}</h2>
            <ButtonGroup>
                <Button variant={format==="day" ? "primary" : "secondary"} onClick={()=> handleClick("day")}>Day</Button>
                <Button variant={format==="week" ? "primary" : "secondary"} onClick={()=> handleClick("week")}>Week</Button>
                <Button variant={format==="month" ? "primary" : "secondary"} onClick={()=> handleClick("month")}>Month</Button>
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
                            <td>{`${appointment.date.getHours()}:${appointment.date.getMinutes().toString().padStart(2, "0")}`}</td>
                            <th>{appointment.date.toLocaleDateString()}</th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AppointmentsCalendar;
