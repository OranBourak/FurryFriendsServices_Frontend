import React from "react";
import PropTypes from "prop-types";
import {Col, Empty} from "antd";
import {Card, List, Avatar, Typography, Rate, Button} from "antd";
import "../../styles/ClientStyles/ServiceProviderResults.css";


const {Title, Text} = Typography;

const ServiceProviderResults = ({serviceData}) => {
    const handleSelectedProvider = (event) => {
        console.log("selected provider " + event);
    };

    return (
        <Card
            className="card-container"
            title={<Title level={3}>Service Provider Details</Title>}
            style={{width: "100%"}}
        >
            {serviceData.length === 0 ? (
                <Empty description="No Service Providers Available" />
            ) : (
                <List
                    className="list-container"
                    itemLayout="horizontal"
                    dataSource={serviceData}
                    renderItem={(item, index) => (
                        <List.Item className="list-item">
                            <div className="list-item-content">
                                <List.Item.Meta
                                    avatar={<Avatar className="avatar"
                                        src={require("../../images/defaultProfileImage.jpg")} />}
                                    title={<Text strong>{item.providerName}</Text>}
                                    description={
                                        <>
                                            <Rate className="rate" disabled defaultValue={0} />
                                            <Text> ({item.averageRating})</Text>
                                        </>
                                    }
                                />
                                <Col>
                                    <Text style={{fontSize: "16px"}} className="service-text" strong>
                    Services:{" "}
                                    </Text>
                                    {item.typeOfService}
                                    <br />
                                    <Text style={{fontSize: "16px"}} className="price-text" strong>
                    Price Range:{" "}
                                    </Text>
                                    {item.priceRange}
                                </Col>
                                <Col>
                                    <Button
                                        className="schedule-button"
                                        type="primary"
                                        key={item._id}
                                        onClick={() => handleSelectedProvider(item._id)}
                                    >
                    Schedule Appointment
                                    </Button>
                                </Col>
                            </div>
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
};

ServiceProviderResults.propTypes = {
    serviceData: PropTypes.arrayOf(
        PropTypes.shape({
            providerName: PropTypes.string.isRequired,
            reviewAverage: PropTypes.number.isRequired,
            services: PropTypes.arrayOf(PropTypes.string).isRequired,
            priceRange: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default ServiceProviderResults;
