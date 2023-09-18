import React, {useState, useEffect} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {ButtonGroup, Button, Table} from "react-bootstrap";
import {isSameWeek, isSameMonth, isSameDay, format} from "date-fns";
import "../../styles/ServiceProviderStyles/appManagment.css";
import {useAuth} from "../../context/AuthContext.jsx";
import axios from "axios";
import {message, Skeleton} from "antd";
import {Navigate} from "react-router-dom";


const AppointmentsCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [Cformat, setCFormat] = useState("month");
    const {loggedIn, userData} = useAuth();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        // Redirect if not logged in
        if (!loggedIn) {
            return <Navigate to="/" />;
        }

        // Redirect if user type is not serviceProvider
        if (userData && userData.userType !== "serviceProvider") {
            return <Navigate to="/error" />;
        }
    }, [loggedIn, userData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Check if userData is available before accessing its properties
                if (userData) {
                    const response = await axios.get(`/serviceProvider/getAppointments/${userData.id}`, {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                        },
                    });
                    const apps = response.data.appointments;
                    setAppointments(apps);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
                message.error({

                    content: `${error.response.data.error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            }
        };

        if (loggedIn) {
            fetchData();
        }
    }, [loggedIn, userData]);

    // Use another useEffect to set filteredAppointments when appointments change
    useEffect(() => {
        if (Cformat === "month") {
            setFilteredAppointments(filterByMonth(date));
        } else if (Cformat === "week") {
            setFilteredAppointments(filterByWeek(date));
        } else if (Cformat === "day") {
            setFilteredAppointments(filterByDay(date));
        }
    }, [date, Cformat, appointments]);

    const filterByDay = (date) => {
        return appointments.filter((a) => {
            return isSameDay(new Date(a.date), new Date(date));
        });
    };

    const filterByMonth = (date) => {
        return appointments.filter((a) => {
            return isSameMonth(new Date(a.date), new Date(date));
        });
    };

    const filterByWeek = (date) => {
        return appointments.filter((a) => {
            return isSameWeek(new Date(a.date), new Date(date));
        });
    };

    const handleDateChange = (newDate) => {
        setDate(new Date(newDate));
        if (Cformat === "month") {
            setFilteredAppointments(filterByMonth(newDate));
        } else if (Cformat === "week") {
            setFilteredAppointments(filterByWeek(newDate));
        } else if (Cformat === "day") {
            setFilteredAppointments(filterByDay(newDate));
        }
    };

    const handleClick = (newCFormat) => {
        setCFormat(newCFormat);
        if (newCFormat === "month") {
            setFilteredAppointments(filterByMonth(date));
        } else if (newCFormat === "week") {
            setFilteredAppointments(filterByWeek(date));
        } else if (newCFormat === "day") {
            setFilteredAppointments(filterByDay(date));
        }
    };

    // Function to check if a date has appointments
    const dateHasAppointments = (date) => {
        return filteredAppointments.some((a) => isSameDay(new Date(a.date), new Date(date)));
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
                        value={new Date(date)}
                        onClickDay={handleDateChange}
                        tileClassName={getTileClassName}
                    />
                </div>
            </div>
            <h2 className="mt-4">Appointments for {new Date(date).toLocaleDateString()}</h2>
            <ButtonGroup className="mb-3">
                <Button
                    variant={Cformat === "day" ? "primary" : "secondary"}
                    onClick={() => handleClick("day")}
                >
            Day
                </Button>
                <Button
                    variant={Cformat === "week" ? "primary" : "secondary"}
                    onClick={() => handleClick("week")}
                >
            Week
                </Button>
                <Button
                    variant={Cformat === "month" ? "primary" : "secondary"}
                    onClick={() => handleClick("month")}
                >
            Month
                </Button>
            </ButtonGroup>
            <>
                {isLoading ? (
                    <Skeleton active />
                ) : (
                    filteredAppointments.length === 0 ? (
                        <h1>No appointments scheduled yet!</h1>
                    ) : (
                        <>
                            <Table striped bordered hover responsive className="text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Client Name</th>
                                        <th>Phone Number</th>
                                        <th>Appointment Type</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Duration</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((appointment, index) => (
                                        <tr key={appointment._id}>
                                            <td>{index + 1}</td>
                                            <td>{appointment.clientId.name}</td>
                                            <td>{appointment.clientId.phone}</td>
                                            <td>{appointment.appointmentType.name}</td>
                                            <td>{format(new Date(appointment.date), "yyyy-MM-dd")}</td>
                                            <td>{format(new Date(appointment.date).setMinutes(new Date(appointment.date).getMinutes()-180), "HH:mm")}</td>
                                            <td>{`${appointment.duration} Hours`}</td>
                                            <td
                                                className={`status-cell ${
                                                    appointment.status === "Upcoming" || appointment.status === "Completed" ? "upcoming" : "canceled"
                                                }`}
                                            >
                                                {appointment.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table></>
                    )
                )}
            </>
        </div>
    );
};

export default AppointmentsCalendar;
