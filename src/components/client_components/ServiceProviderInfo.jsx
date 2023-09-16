import React, {useState, useEffect} from "react";
import "../../styles/ClientStyles/ServiceProviderInfo.css";
import PropTypes from "prop-types";
import {Card, Avatar, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import axios from "axios"; // Assuming you forgot to import axios

/**
 * Fetches and displays information about a service provider.
 *
 * @return {React.Component} - Service Provider information component.
 * @param {Object} props - The component props.
 * @param {string} props.providerID - The ID of the service provider.
 */
const ServiceProviderInfo = ({providerID}) => {
    const [serviceProvider, setServiceProvider] = useState(null);

    useEffect(() => {
        getServiceProviderInfo(providerID);
    }, [providerID]);

    /**
     * Fetches information about a service provider by their ID.
     *
     * @param {string} providerID - The ID of the service provider.
     */
    async function getServiceProviderInfo(providerID) {
        try {
            const response = await axios.get("/client/getProviderInfo/", {
                params: {_id: providerID}, // Use params for GET requests
            });

            if (response.status === 200) {
                setServiceProvider(response.data.provider);
            }
        } catch (error) {
            console.error("An error occurred while fetching data: ", error);
        }
    }

    if (!serviceProvider) {
        return <div>Loading...</div>;
    }

    return (
        <Card
            className="info-card"
            title={<span style={{fontSize: "30px", fontWeight: "bold"}}>Service Provider Info</span>}
            extra={<Avatar className="avatar" size={70} src={serviceProvider.image?serviceProvider.image: "/" } icon={<UserOutlined />}/>
            }
        >
            <p><strong>Name:</strong> {serviceProvider.name}</p>
            <p><strong>Email:</strong> {serviceProvider.email}</p>
            <p><strong>Phone:</strong> {serviceProvider.phone}</p>
            <p><strong>Country:</strong> {serviceProvider.country}</p>
            <p><strong>City:</strong> {serviceProvider.city}</p>
            <p><strong>Gender:</strong> {serviceProvider.gender}</p>
            <p><strong>Type of Service:</strong> {serviceProvider.typeOfService}</p>
            <p><strong>Average Rating:</strong> {serviceProvider.averageRating}</p>
            <p><strong>Bio:</strong> {serviceProvider.bio}</p>
            <Tag color="blue">{serviceProvider.typeOfService}</Tag>
        </Card>
    );
};


ServiceProviderInfo.propTypes = {
    providerID: PropTypes.string.isRequired,
};

export default ServiceProviderInfo;
