import React from "react";
import PropTypes from "prop-types";
import ServiceProviderInfo from "../../components/client_components/ServiceProviderInfo.jsx";
import {Row, Col, Card, Calendar, TimePicker, Button} from "antd";
import moment from "moment";

const ProviderProfilePage = ({providerID}) => {
    return (
        <div>
            <h1>Profile</h1>
            <Row gutter={16}>
                {/* First Column */}
                <Col span={16}>
                    {/* Service Provider Info */}
                    <ServiceProviderInfo providerID={proID} />

                    {/* Reviews */}
                    <Card title="Reviews">
                        <p>Review 1: Great service!</p>
                        <p>Review 2: Very professional.</p>
                        <p>Review 3: Could be better.</p>
                    </Card>
                </Col>

                {/* Second Column */}
                <Col span={8}>
                    {/* Schedule Meeting */}
                    <Card title="Schedule Meeting">
                        <Calendar fullscreen={false} />
                        <TimePicker
                            defaultValue={moment("12:00:00", "HH:mm:ss")}
                            style={{width: "100%", marginTop: 16}}
                        />
                        <Button type="primary" style={{width: "100%", marginTop: 16}}>
              Submit
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

/* ####  DELETE BELOW INFO ! JUST FOR TESTING  #####*/
const proID = "64f9fc4b8c7d7c3657dc5b7b";

//   const serviceProvider = {
//     // Your service provider data here, fetched from your database
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '1234567890',
//     country: 'Israel',
//     city: 'Tel Aviv',
//     gender: 'Male',
//     typeOfService: 'Dog Walker',
//     averageRating: 4.5,
//     bio: 'Experienced dog walker...',
//     image: '../images/ServiceProvidersImages/default.jpg', // Replace with actual image path
//   };


export default ProviderProfilePage;


ProviderProfilePage.propTypes = {
    providerID: PropTypes.string.isRequired,
};
