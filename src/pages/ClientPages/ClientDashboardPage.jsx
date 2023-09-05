import React from "react";
import Col from "react-bootstrap/Col";
import {Layout} from "antd";
import {Button} from "antd";
import {Link} from "react-router-dom";
import {SearchOutlined, EditOutlined, AppstoreOutlined} from "@ant-design/icons";
import "../../styles/ClientStyles/ClientDashboard.css";


/**
 *
 * @return {React.Component} Client dashboard
 */
function ClientDashboardPage() {
    const {Header, Content} = Layout;
    return (
        <Layout className="layout-centered-content">
            <Header className="header-content"><b>Dashboard</b></Header>
            <Content>
                <Col>
                    <Link to="/Search-service">
                        <Button className="custom-button search-button button-spacing" type="primary" icon={<SearchOutlined />}>Search for a Service</Button>
                    </Link>

                    <Link to="/Client-edit-profile">
                        <Button className="custom-button edit-button button-spacing" type="primary" icon={<EditOutlined />}>Edit Profile</Button>
                    </Link>

                    <Link to="/My-services">
                        <Button className="custom-button services-button button-spacing" type="primary" icon={<AppstoreOutlined />}>Scheduled appointments</Button>
                    </Link>
                </Col>
            </Content>
        </Layout>
    );
}

export default ClientDashboardPage;
