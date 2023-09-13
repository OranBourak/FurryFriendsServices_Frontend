/* eslint-disable no-unused-vars */
import {React, useState} from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";


/**
 * AppointmentTypeRevenueChart component displays a chart of appointment revenue.
 *
 * @param {Object} props - The props for the AppointmentTypeRevenueChart component.
 * @param {String} type - the type of the chart
 * @param {String} id - the id of the chart
 * @param {String[]} props.categories - The categoris for configuring the chart.
 * @param {Object[]} props.series - The series data for the chart.
 * @return {React.Component} React component representing the Appointment Revenue Chart component.
 */
const AppointmentTypeRevenueChart = (props) => {
    // Define inline styles for the chart container
    const chartStyles = {
        className: "mixed-chart",
        width: "800px", // Adjust the width as needed
        height: "400px", // Adjust the height as needed
        border: "1px solid #ccc", // Example border style
        borderRadius: "5px", // Example border radius
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)", // Example box shadow
    };

    const options = {
        chart: {
            id: props.id,
        },
        xaxis: {
            categories: props.categories,
            labels: {
                style: {
                    fontSize: "12px", // Adjust the font size as needed
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "12px", // Adjust the font size as needed
                },
            },
        },
    };

    return (
        <div style={chartStyles}>
            <Chart
                options={options}
                series={props.series}
                type={props.type}
                width="100%"
                height="100%"
            />
        </div>
    );
};

AppointmentTypeRevenueChart.propTypes = {
    categories: PropTypes.arrayOf(String).isRequired, // categories prop is required and should be an object
    series: PropTypes.arrayOf(PropTypes.object).isRequired, // series prop is required and should be an array of objects
    type: String.isRequired,
    id: String.isRequired,
};

export default AppointmentTypeRevenueChart;
