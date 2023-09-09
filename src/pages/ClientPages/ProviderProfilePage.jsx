import React from "react";
import PropTypes from "prop-types";
import ServiceProviderInfo from "../../components/client_components/ServiceProviderInfo.jsx";
import ReviewCarousel from "../../components/client_components/ServiceProviderReviews.jsx";
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
                    <ReviewCarousel providerID={proID} />
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


export default ProviderProfilePage;


ProviderProfilePage.propTypes = {
    providerID: PropTypes.string.isRequired,
};
