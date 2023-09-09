import React from "react";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import ServiceProviderInfo from "../../components/client_components/ServiceProviderInfo.jsx";
import ReviewCarousel from "../../components/client_components/ServiceProviderReviews.jsx";
import ScheduleAppointment from "../../components/client_components/scheduleAppointment.jsx";
import {Row, Col} from "antd";

const ProviderProfilePage = () => {
    const {id} = useParams();
    return (
        <div>
            <h1>Profile</h1>
            <Row gutter={16}>
                {/* First Column */}
                <Col span={16}>
                    {/* Service Provider Info */}
                    <ServiceProviderInfo providerID={id} />

                    {/* Reviews */}
                    <ReviewCarousel providerID={id} />
                </Col>

                {/* Second Column */}
                <Col span={8}>
                    {/* Schedule Meeting */}
                    <ScheduleAppointment providerID={id}/>
                </Col>
            </Row>
        </div>
    );
};


export default ProviderProfilePage;


ProviderProfilePage.propTypes = {
    providerId: PropTypes.string.isRequired,
};
