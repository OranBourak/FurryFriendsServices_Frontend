import React, {useState, useEffect} from "react";
import AppointmentType from "../../components/ServiceProviderComponents/AppointmentType";
import EditAppointmentModal from "../../components/ServiceProviderComponents/EditAppointmentModal";
import {Button, Container, Row} from "react-bootstrap";
import AddAppointmentTypeModal from "../../components/ServiceProviderComponents/AddAppointmentModal.jsx";
import DeleteConfirmationModal from "../../components/ServiceProviderComponents/DeleteConfirmationModal.jsx"; // Import the new component
import "../../styles/ServiceProviderStyles/appType.css";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";

const TypeManagementPage = () => {
    const {loggedIn, userData} = useAuth();
    const [appointments, setAppointments] = useState([]);

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

    const getData = async () => {
        if (loggedIn) {
            console.log("in getData");
            try {
                // setIsLoading(true);
                const response = await axios.get(`/serviceProvider/getAppointmentTypes/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });
                const appTypes = response.data.appointmentTypes;
                setAppointments(appTypes);
                console.log("apps type front: " + appTypes);
                // setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect( () => {
        getData();
    }, []);

    const handleEdit = (id) => {
        console.log("in handle edit");
        const appointmentToEdit = appointments.find((app) => app._id === id);
        setEditedAppointment(appointmentToEdit);
        console.log("The appointment to edit name: " + appointmentToEdit._id);
        setEditModalOpen(true);
    };

    const handleSaveEdit = async (editedName, editedPrice, editedDuration) => {
        const updatedAppointments = appointments.map((app) => {
            // If the appointment is the appointment that is being edited
            if (app._id === editedAppointment._id) {
                console.log("edited id: " + editedAppointment._id);
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
            console.log("in handleSaveEdit");
            console.log(editedAppointment._id);
            const response = await axios.patch(`/appointmentType/update/${editedAppointment._id}`, {
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
            console.log("reaponse" + response);
        } catch (error) {
            console.log(error);
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

    const confirmDelete = () => {
        const updatedAppointments = appointments.filter(
            (appointment) => appointment._id !== appointmentToDelete,
        );
        setAppointments(updatedAppointments);
        setDeleteConfirmationOpen(false);
    };

    const handleAddType = (name, price, duration) => {
        const newType = {};
        if (appointments.length < 10) {
            const newId = appointments.length + 1;
            newType.id = newId;
            newType.name = name;
            newType.price = price;
            newType.duration = duration;
            setAppointments([...appointments, newType]);
            setAddModalOpen(false);
        } else {
            alert("You have reached the maximum limit of 10 types.");
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
                    onClick={() => setAddModalOpen(true)}
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
            />
            <DeleteConfirmationModal
                show={isDeleteConfirmationOpen}
                onHide={() => setDeleteConfirmationOpen(false)}
                onConfirm={confirmDelete}
            />
        </Container>
    );
};

export default TypeManagementPage;
