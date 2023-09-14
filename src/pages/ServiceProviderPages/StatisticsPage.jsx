/* eslint-disable no-unused-vars */
import {React, useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";
import {message} from "antd";
import AppointmentTypeRevenueChart from "../../components/ServiceProviderComponents/AppointmentTypeRevenueChart.jsx";
import "../../styles/ServiceProviderStyles/statisticsPage.css";
import {Row, Col} from "antd";
import {useNavigate} from "react-router-dom";

/**
 * Statistics page component.
 * @return {React.Component} - The Statistics page component.
 */
function StatisticsPage() {
    const {loggedIn, userData} = useAuth();
    // AppointmentType revenue chart
    const [appTypeRevenueChartCategories, setAppTypeRevenueChartCategories] = useState([]);
    const [appTypeRevenueChartData, setAppTypeRevenueChartData] = useState();
    // Canceled vs Completed chart (from the current date to 5 months back )
    const numOfMonthsToPresent = 6;
    const [canceledVsCompletedChartCategories, setCanceledVsCompletedChartCategories] = useState([]);
    const [completedData, setCompletedData] = useState();
    const [canceledData, setCanceledData] = useState();
    // Revenue per month
    const [revenueChartData, setRevenueChartData] = useState();
    const [isAppointments, setIsAppointments] = useState(false);
    const navigate = useNavigate();

    const getData = async () => {
        if (loggedIn) {
            console.log("user is logged in");
            try {
                // Get the service provider's appoitnemtns of the past 5 months
                const appResponse = await axios.get(`/appointment/getPast5MonthsAppointments/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });

                const appointments = appResponse.data.appointments;
                if (appointments.length > 0) {
                    setIsAppointments(true);
                }
                console.log("app 5 months ago:" + appointments);
                console.log(appointments[0].date);
                console.log(appointments[0].appointmentType[0].name);

                // Get the appointment types of the service provider
                const appTypeResponse = await axios.get(`/serviceProvider/getAppointmentTypes/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });
                const appointmentTypes = appTypeResponse.data.appointmentTypes;
                console.log("app types: "+ appointmentTypes);
                // Create a function for getting the index of an appointment type in the appointmentTypes objects array
                // For each appointment, find the index of its appointment type and add to this index her price, don't forget not to include canceled apps
                analizeData(appointments, appointmentTypes);
            } catch (error) {
                console.log(error);
                setIsAppointments(false);
            }
        }
    };

    const analizeData = (appointments, appointmentTypes) => {
        console.log("In deliverData");
        // AppointmentType revenue chart
        const appTypeNames = [];
        const appTypeRevenue = [];
        // Canceled vs Completed chart
        const pastSixMonths = getMonthsBeforeCurrent(numOfMonthsToPresent);
        setCanceledVsCompletedChartCategories(pastSixMonths);
        const completedAppointmentsInMonth = [0, 0, 0, 0, 0, 0];
        const canceledAppointmentsInMonth = [0, 0, 0, 0, 0, 0];
        const revenuePerMonth = [0, 0, 0, 0, 0, 0];
        for (const appointmentObj of appointmentTypes) {
            appTypeNames.push(appointmentObj.name);
            appTypeRevenue.push(0);
        }
        setAppTypeRevenueChartCategories(appTypeNames);
        // Run on all the service provider appointments
        for (const appointment of appointments) {
            const appointmentMonth = new Date(appointment.date).getMonth() + 1;
            const monthIndex = getMonthIndex(appointmentMonth);
            console.log("appointmentMonth :" + appointmentMonth);

            if (appointment.status === "Completed") {
                // Find the index of the appointment in the revenue array
                const index = getIndexOfAppTypeByName(appointment.appointmentType[0].name, appTypeNames);
                // Add the revenue from the appointment to the correct palce in the appointment type revenue array
                const appointmentRevenue = appointment.appointmentType[0].price;
                appTypeRevenue[index] += appointmentRevenue;
                // Add the revenue from the appointment to the correct palce in the month revenue array
                revenuePerMonth[monthIndex] += appointmentRevenue;
                // Add one to the completed appointments on this month
                completedAppointmentsInMonth[monthIndex] += 1;
            } else if (appointment.status === "Canceled") {
                // Add one to the canceled appointments on this month
                canceledAppointmentsInMonth[monthIndex] += 1;
            }
        }
        setAppTypeRevenueChartData(appTypeRevenue);
        setCanceledData(canceledAppointmentsInMonth);
        setCompletedData(completedAppointmentsInMonth);
        setRevenueChartData(revenuePerMonth);
        // delete
        console.log("appTypeNames :" + appTypeNames);
        console.log("appTypeRevenue :" + appTypeRevenue);
        console.log("pastSixMonths: " + pastSixMonths);
        console.log("canceledAppointmentsInMonth: " + canceledAppointmentsInMonth);
        console.log("completedAppointmentsInMonth: " + completedAppointmentsInMonth);
        console.log("revenuePerMonth: " + revenuePerMonth);
    };

    const getIndexOfAppTypeByName = (name, appointmentTypesNameArr) => {
        const index = appointmentTypesNameArr.findIndex( (appName) => appName === name);

        if (index === -1) {
            // TODO: set error flag to true and maybe block the page
            console.log(`Found at index ${index}`);
        }
        return index;
    };

    /**
 * Generates an array of 3-letter month strings for the 6 months before the current month,
 * including the current month.
 *
 * @param {number} numOfMonths - the number of months to return in the array
 * @return {string[]} An array of 3-letter month strings.
 */
    function getMonthsBeforeCurrent(numOfMonths) {
        const currentDate = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const currentMonth = currentDate.getMonth();
        const result = [];

        for (let i = 0; i < numOfMonths; i++) {
            const index = (currentMonth - i + 12) % 12; // Handle wrapping around from January to December
            result.unshift(months[index]);
        }

        return result;
    }

    const getMonthIndex = (month) => {
        const currMonth = new Date().getMonth() + 1;
        return ( numOfMonthsToPresent - (currMonth - month) ) - 1;
    };

    useEffect( () => {
        // Redirect if not logged in
        if (!loggedIn) {
            // Use a navigation method here to redirect, for example:
            navigate("/");
            return; // Return early to prevent the rest of the code from executing
        }

        // Redirect if user type is not serviceProvider
        if (userData.userType !== "serviceProvider") {
            // Use a navigation method here to redirect, for example:
            navigate("/error");
            return; // Return early to prevent the rest of the code from executing
        }
        getData();
    }, []);

    return (
        <>
            {isAppointments? (
                <>
                    <div className="center-container">
                        <h1 className="statistics-page-title-text">Statistics</h1>
                    </div>
                    <div className="statistic-page-container d-flex justify-content-center">
                        <Col>
                            <Row>
                                <Col className="chart-gap">
                                    <AppointmentTypeRevenueChart
                                        categories={appTypeRevenueChartCategories}
                                        id="appointment-type-revenue-chart"
                                        series={[
                                            {
                                                name: "Revenue",
                                                data: appTypeRevenueChartData,
                                            },
                                        ]}
                                        type="bar"
                                        chartTitle="Revenue per Appointment Type"
                                    />
                                </Col>
                            </Row>
                            <div className="my-4"></div> {/* Add space between the top tables and the bottom chart */}
                            <Row>
                                <Col className="chart-gap">
                                    <AppointmentTypeRevenueChart
                                        categories={canceledVsCompletedChartCategories}
                                        id="completed-vs-canceled-chart"
                                        series={[
                                            {
                                                name: "completed appointments",
                                                data: completedData,
                                            },
                                            {
                                                name: "canceled appointments",
                                                data: canceledData,
                                            },
                                        ]}
                                        type="bar"
                                        chartTitle="Completed vs. Canceled Appointments"
                                    />
                                </Col>
                            </Row>
                            <div className="my-4"></div> {/* Add space between the top tables and the bottom chart */}
                            <Row className="chart-gap">
                                <Col>
                                    <AppointmentTypeRevenueChart
                                        categories={canceledVsCompletedChartCategories}
                                        id="revenue-per-month"
                                        series={[
                                            {
                                                name: "Revenue Per Month",
                                                data: revenueChartData,
                                            },
                                        ]}
                                        type="line"
                                        chartTitle="Total Revenue per Month"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </>
            ) : (
                <h1>No appointments in the past six months!</h1>
            )}
        </>

    );
}

export default StatisticsPage;
