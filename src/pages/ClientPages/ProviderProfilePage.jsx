import {React, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ServiceProviderInfo from "../../components/client_components/ServiceProviderInfo.jsx";
import ReviewCarousel from "../../components/client_components/ServiceProviderReviews.jsx";
import ScheduleAppointment from "../../components/client_components/scheduleAppointment.jsx";
import "../../styles/ClientStyles/ProviderProfilePage.css";
import {Row, Col, Skeleton} from "antd";

const ProviderProfilePage = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call to fetch data
        setTimeout(() => {
            setLoading(false);
        }, 1000); // 1 seconds delay
    }, []);

    return (
        <div className="mainPage">
            <h1 className="mainPageTitle">Profile</h1>
            <Row gutter={16} className="Row">
                {/* First Column */}
                <Col span={8} className="Col">
                    {/* Service Provider Info */}
                    <div className="ServiceProviderInfo">
                        {loading ? (
                            <Skeleton active />
                        ) : (
                            <ServiceProviderInfo providerID={id} />
                        )}
                    </div>

                    {/* Reviews */}
                    <div className="ReviewCarousel">
                        {loading ? <Skeleton active /> : <ReviewCarousel providerID={id} />}
                    </div>
                </Col>

                {/* Second Column */}
                <Col span={8} className="Col">
                    {/* Schedule Meeting */}
                    <div className="ScheduleAppointment">
                        {loading ? (
                            <Skeleton active />
                        ) : (
                            <ScheduleAppointment providerID={id} />
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProviderProfilePage;
