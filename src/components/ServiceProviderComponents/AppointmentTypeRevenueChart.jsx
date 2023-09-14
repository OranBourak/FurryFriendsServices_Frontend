/* eslint-disable no-unused-vars */
import {React, useState} from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";
import "../../styles/ServiceProviderStyles/statisticsChart.css";


/**
 * AppointmentTypeRevenueChart component displays a chart of appointment revenue.
 *
 * @param {Object} props - The props for the AppointmentTypeRevenueChart component.
 * @param {String} type - the type of the chart
 * @param {String} id - the id of the chart
 * @param {String} chartTitle - the title of the chartS
 * @param {String[]} props.categories - The categoris for configuring the chart.
 * @param {Object[]} props.series - The series data for the chart.
 * @return {React.Component} React component representing the Appointment Revenue Chart component.
 */
const AppointmentTypeRevenueChart = (props) => {
    // Define inline styles for the chart container
    const chartStyles = {
        className: "mixed-chart",
        width: "85vw", // Adjust the width as needed
        height: "400px", // Adjust the height as needed
        border: "1px solid #ccc", // Example border style
        borderRadius: "15px", // Example border radius
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)", // Example box shadow
        backgroundColor: "rgba(258, 258, 258, 0.7)",
        // "rgba(230, 230, 258, 0.4)"
        // "rgba(230, 180, 200, 0.4)"
    };

    const options = {
        chart: {
            id: props.id,
        },
        plotOptions: {
            bar: {
                columnWidth: "50px",
                dataLabels: {
                    Enabled: true,
                    position: "top",
                    maxItems: 100,
                },
            },
        },
        title: {
            text: props.chartTitle,
            align: "center",
            floating: false,
            offsetY: 0,
            offsetX: 0,
            style: {
                fontSize: "40px",
                fontWeight: "lighter",
                color: "rgba(128,128,128,1)",
            },
        },
        annotations: {
            titleLine: [
                {
                    borderColor: "rgba(200, 200, 200, 1)", // Adjust the line color as needed
                    borderWidth: 2, // Adjust the line thickness as needed
                    x: "50%", // Center the line below the title
                    y: "100%", // Position the line just below the title
                },
            ],
        },
        xaxis: {
            categories: props.categories,
            tickAmount: props.categories.length,
            labels: {
                show: true,
                rotate: 360,
                rotateAlways: true,
                minHeight: 100,
                maxHeight: 180,
                style: {
                    fontSize: "12px", // Adjust the font size as needed
                    cssClass: "statistics-chart-x-text-size",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "12px", // Adjust the font size as needed
                    cssClass: "statistics-chart-y-text-size",
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
    chartTitle: String.isRequired,
};

export default AppointmentTypeRevenueChart;

// dataLabels: {
//     enabled: true,
//     style: {
//         fontSize: "14px",
//         fontFamily: "Helvetica, Arial, sans-serif",
//         fontWeight: "bold",
//     },
// },
// legend: {
//     fontSize: "2px",
// },
