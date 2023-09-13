/* eslint-disable no-unused-vars */
import {React, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";
import {message} from "antd";

/**
 * Statistics page component.
 * @return {React.Component} - The Statistics page component.
 */
function StatisticsPage() {
    const {loggedIn, userData} = useAuth();

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
                // For each appointment, find the index of its appointment type and add to this index her price
            } catch (error) {
                console.log(error);
                message.error({

                    content: `${error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            }
        }
    };

    useEffect( () => {
        getData();
    }, []);

    return (
        <div>StatisticsPage</div>
    );
}

export default StatisticsPage;
