import React, {useState, useEffect} from "react";
import AppointmentType from "../../components/ServiceProviderComponents/AppointmentType";
import EditAppointmentModal from "../../components/ServiceProviderComponents/EditAppointmentModal";
import {Button, Container, Row} from "react-bootstrap";
import AddAppointmentTypeModal from "../../components/ServiceProviderComponents/AddAppointmentModal.jsx";
import DeleteConfirmationModal from "../../components/ServiceProviderComponents/DeleteConfirmationModal.jsx"; // Import the new component
import "../../styles/ServiceProviderStyles/appType.css";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

const TypeManagementPage = () => {
    const {loggedIn, userData} = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [appointmentsSize, setAppointmentsSize] = useState(0);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedAppointment, setEditedAppointment] = useState({
        _id: 1,
        name: "",
        price: 0,
        duration: 1,
    });

    const [isAddModalOpen, setAddModalOpen] = useState(false);

    // New state for delete confirmation
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);
    const navigate = useNavigate();


    const getData = async () => {
        if (loggedIn) {
            try {
                // setIsLoading(true);
                const response = await axios.get(`/serviceProvider/getAppointmentTypes/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });
                const appTypes = response.data.appointmentTypes;
                setAppointments(appTypes);
                setAppointmentsSize(appTypes.length);
                // setIsLoading(false);
            } catch (error) {
                console.log(error);
                message.error({

                    content: `error: ${error.response.data.error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            }
        }
    };


    useEffect(() => {
        // Redirect if not logged in
        if (!loggedIn) {
            // Use a navigation method here to redirect, for example:
            navigate("/");
            return; // Return early to prevent the rest of the code from executing
        }

        // Redirect if user type is not serviceProvider
        if (userData.userType !== "serviceProvider") {
            // Use a navigation method here to redirect, for example:
            navigate("/error");
            return; // Return early to prevent the rest of the code from executing
        }

        getData();
    }, []);

    const handleEdit = (id) => {
        const appointmentToEdit = appointments.find((app) => app._id === id);
        setEditedAppointment(appointmentToEdit);
        setEditModalOpen(true);
    };

    const handleSaveEdit = async (editedName, editedPrice, editedDuration) => {
        if (!loggedIn) {
            return;
        }
        const updatedAppointments = appointments.map((app) => {
            // If the appointment is the appointment that is being edited
            if (app._id === editedAppointment._id) {
                return {
                    ...app,
                    name: editedName,
                    price: Number(editedPrice),
                    duration: editedDuration,
                };
            }
            return app;
        });

        // Update the appointment in backend using appointment id
        try {
            await axios.patch(`/appointmentType/update/${editedAppointment._id}`, {
                name: editedName,
                price: editedPrice,
                duration: editedDuration,
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            // On success
            setAppointments(updatedAppointments);
        } catch (error) {
            console.log(error);
            message.error({

                content: `error: ${error.response.data.error}`,

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
        }

        setEditModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleDelete = (id) => {
        setAppointmentToDelete(id);
        setDeleteConfirmationOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/appointmentType/delete/${appointmentToDelete}`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
                data: {
                    serviceProviderId: userData.id,
                },
            });
            const updatedAppointments = appointments.filter(
                (appointment) => appointment._id !== appointmentToDelete,
            );
            setAppointments(updatedAppointments);
        } catch (error) {
            console.error("Error deleting appointment:", error);
            message.error({

                content: `Error deleting appointment: ${error.response.data.error}`,

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
        };
        setDeleteConfirmationOpen(false);
    };

    const handleAddType = (newType) => {
        setAppointments([...appointments, newType]);
        setAddModalOpen(false);
    };

    const handleAddNewTypeClick = () => {
        if (appointments.length >= 10) {
            message.error({

                content: "Max types reached. Please delete existing types before makeing new type.",

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
        } else {
            setAddModalOpen(true);
        }
    };

    // const getEditedAppTypeName = () => {
    //     console.log("editedAppointment.name: " + editedAppointment.name);
    //     console.log(typeof(editedAppointment.name));
    //     return editedAppointment.name;
    // };

    return (
        <Container>
            <h1 className="text-center">Appointment Type Management</h1>
            <Row className="justify-content-center">
                {appointments.map((appointment) => (
                    <div key={appointment._id} className="text-center small-card">
                        <AppointmentType
                            name={appointment.name}
                            price={appointment.price}
                            duration={appointment.duration}
                            onEdit={() => handleEdit(appointment._id)}
                            onDelete={() => handleDelete(appointment._id)}
                        />
                    </div>
                ))}
            </Row>
            <Row className="justify-content-center add-button">
                <Button
                    variant="info"
                    onClick={handleAddNewTypeClick}
                >
              Add New Type
                </Button>
            </Row>
            <EditAppointmentModal
                show={isEditModalOpen}
                onHide={handleCloseEditModal}
                onSave={handleSaveEdit}
                name={editedAppointment.name}
                price={editedAppointment.price}
                duration={editedAppointment.duration}
            />
            <AddAppointmentTypeModal
                show={isAddModalOpen}
                onHide={() => setAddModalOpen(false)}
                onAddType={handleAddType}
                appTypesSize={appointmentsSize}
            />
            <DeleteConfirmationModal
                show={isDeleteConfirmationOpen}
                onHide={() => setDeleteConfirmationOpen(false)}
                onConfirm={async () => await confirmDelete()}
            />
        </Container>
    );
};

export default TypeManagementPage;
