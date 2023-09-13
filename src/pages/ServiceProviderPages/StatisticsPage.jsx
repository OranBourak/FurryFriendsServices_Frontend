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
                // setIsLoading(true);
                await axios.get(`/appointment/getPast5MonthsAppointments/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });
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
