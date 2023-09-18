import React from "react";
import {Modal, Form, Input, Button, Rate, message} from "antd";
import PropTypes from "prop-types";
import axios from "axios";
/**
 *
 * @param {*} param0
 * @return {React.Component} Review modal for a specific appointment.
 *  */
const ReviewModal = ({serviceProviderId, clientId, appointmentId, open, onClose, setAppointments, clientAppointments}) => {
    const onFinish = (values) => {
    // TODO: create a review containing serviceProviderId, clientId, rating and the review itself.
    // TODO:
        axios.post("review/create",
            {serviceProviderId: serviceProviderId,
                clientId: clientId,
                appointmentId: appointmentId,
                review: {
                    rating: values.rating,
                    comment: values.comment,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    message.success(response.data.message);
                    const updatedAppointments = clientAppointments.map((appointment) => {
                        if (appointment._id === appointmentId) {
                            appointment = {...appointment, review: response.data.reviewId};
                            return appointment;
                        }
                        return appointment;
                    },
                    );
                    setAppointments(updatedAppointments);
                }
            }).catch((err) => {
                message.error(response.data.message);
            }).finally(onClose());
    };

    return (
        <Modal
            title="Leave a Review"
            open={open}
            onCancel={onClose}
            footer={null} // This is to remove the default footer, since we'll have our own submit button
        >
            <Form
                name="appointment-review-format"
                onFinish={onFinish}
            >
                <Form.Item
                    name="rating"
                    label="Rating"
                    rules={[{required: true, message: "Please select a rating!"}]}
                >
                    <Rate />
                </Form.Item>

                <Form.Item
                    name="review"
                    label="Review"
                    rules={[{required: true, message: "Please write your review!"}]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
            Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

ReviewModal.propTypes = {
    serviceProviderId: PropTypes.string.isRequired,
    setAppointments: PropTypes.func.isRequired,
    clientAppointments: PropTypes.array.isRequired,
    clientId: PropTypes.string.isRequired,
    appointmentId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ReviewModal;
