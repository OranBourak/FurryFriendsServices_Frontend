import React, {useState} from "react";
import AppointmentType from "./AppointmentType";
import EditAppointmentModal from "./EditAppointmentModal";
import {Button} from "react-bootstrap";
import AddAppointmentTypeModal from "./AddAppointmentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the new component

const TypeManagementPage = () => {
    const [appointments, setAppointments] = useState([
        {id: 1, name: "Basic Checkup", price: 50, duration: 1},
        {id: 2, name: "Dental Cleaning", price: 80, duration: 2},
        {id: 3, name: "X-Ray Examination", price: 120, duration: 3},
    ]);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedAppointment, setEditedAppointment] = useState({
        id: 1,
        name: "",
        price: 0,
        duration: 1,
    });

    const [isAddModalOpen, setAddModalOpen] = useState(false);

    // New state for delete confirmation
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    const handleEdit = (id) => {
        const appointmentToEdit = appointments.find((app) => app.id === id);
        setEditedAppointment(appointmentToEdit);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (editedName, editedPrice, editedDuration) => {
        const updatedAppointments = appointments.map((app) => {
            if (app.id === editedAppointment.id) {
                return {
                    ...app,
                    name: editedName,
                    price: editedPrice,
                    duration: editedDuration,
                };
            }
            return app;
        });

        setAppointments(updatedAppointments);
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
            (appointment) => appointment.id !== appointmentToDelete,
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

    return (
        <div className="TypeManagementPage">
            <h1>Appointment Type Management</h1>
            {appointments.map((appointment) => (
                <div key={appointment.id}>
                    <AppointmentType
                        name={appointment.name}
                        price={appointment.price}
                        duration={appointment.duration}
                        onEdit={() => handleEdit(appointment.id)}
                        onDelete={() => handleDelete(appointment.id)}
                    />
                </div>
            ))}
            <Button variant="primary" onClick={() => setAddModalOpen(true)}>
        Add New Type
            </Button>
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

            {/* Use the DeleteConfirmationModal component */}
            <DeleteConfirmationModal
                show={isDeleteConfirmationOpen}
                onHide={() => setDeleteConfirmationOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default TypeManagementPage;
