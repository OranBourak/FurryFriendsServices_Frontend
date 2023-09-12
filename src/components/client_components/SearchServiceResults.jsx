import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Col, Empty} from "antd";
import {Card, List, Avatar, Typography, Rate, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import "../../styles/ClientStyles/ServiceProviderResults.css";

const {Title, Text} = Typography;

/**
 * ServiceProviderResults is a React functional component that displays a list of service providers.
 * It takes an array of service provider data as a prop.
 *
 * @param {Object[]} serviceData - Array of service provider data objects
* @return {React.Component} - ServiceProviderResults component that displays a list of service providers
 */
const ServiceProviderResults = ({serviceData}) => {
    return (
        // Card container for the list of service providers
        <Card
            className="card-container"
            title={<Title level={3}>Service Provider Details</Title>}
            style={{width: "100%"}}
        >
            {/* Display a message if no service providers are available */}
            {serviceData.length === 0 ? (
                <Empty description="No Service Providers Available" />
            ) : (
                // List of service providers
                <List
                    className="list-container"
                    itemLayout="horizontal"
                    dataSource={serviceData}
                    renderItem={(provider, index) => (
                        <List.Item className="list-item">
                            <div className="list-item-content">
                                {/* Avatar and basic details of the service provider */}
                                <List.Item.Meta
                                    avatar={<Avatar className="avatar" src={ provider.image} icon={<UserOutlined />}/>}
                                    title={<Text strong>{provider.name}</Text>}
                                    description={
                                        <>
                                            <Rate className="rate" disabled value={Number(provider.averageRating)} />
                                            <Text> ({Number(provider.averageRating).toFixed(1)})</Text>
                                        </>
                                    }
                                />
                                {/* Additional details like services offered and price range */}
                                <Col>
                                    <Text style={{fontSize: "16px"}} className="service-text" strong>
                                        Service:{" "}
                                    </Text>
                                    {provider.typeOfService}
                                    <br />
                                    <Text style={{fontSize: "16px"}} className="price-text" strong>
                                        City:{" "}
                                    </Text>
                                    {provider.city}
                                    <br />
                                    <Text style={{fontSize: "16px"}} className="price-text" strong>
                                        Price Range:{" "}
                                    </Text>
                                    {`${provider.minPrice} - ${provider.maxPrice}`}
                                </Col>
                                {/* Button to schedule an appointment with the service provider */}
                                <Col>
                                    <Link to={`/provider-profile/${provider._id}`}>
                                        <Button
                                            className="schedule-button"
                                            type="primary"
                                            key={provider._id}
                                        >
                                        Schedule Appointment
                                        </Button>
                                    </Link>

                                </Col>
                            </div>
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
};

// Prop-types validation
ServiceProviderResults.propTypes = {
    serviceData: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            averageRating: PropTypes.number.isRequired,
            typeOfService: PropTypes.string.isRequired,
            minPrice: PropTypes.number.isRequired,
            maxPrice: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

// Export the ServiceProviderResults component
export default ServiceProviderResults;
