import React, {useState, useEffect} from "react";
import {Input, Button, Form, Typography} from "antd";
import "../../styles/ClientStyles/ClientProfilePage.css"; // Import the CSS file
import {useAuth} from "../../context/AuthContext.jsx";
import axios from "axios";
// components
import ClientDropDown from "../../components/client_components/ClientDropDown.jsx";

/**
 * a client profile page, presents data of the user in a form, user can edit name and phone number fields.
 * @param {*} user
 * @return {React.Component} Client profile page
 */
function ClientProfilePage() {
    const {userData, loggedIn, changeName} = useAuth();
    const [client, setClient] = useState(null);
    const Text = Typography.Text;
    const [isNameEditable, setNameEditable] = useState(false);
    const [isPhoneEditable, setPhoneEditable] = useState(false);
    const [nameValidationFlag, setNameValidationFlag] = useState(null);
    const [phoneValidationFlag, setPhoneValidationFlag] = useState(null);
    const [tempPhone, setTempPhone] = useState({prefix: "", suffix: ""});
    const [tempName, setTempName] = useState(userData.name);
    const phonePrefix = ["050", "052", "053", "054", "055"];


    /**
 * recieves an event that a field in the form has changed, the changed field's value is the value that we set on our fields state
 * with a switch case logic
 * @param {*} e event object
 */
    const handleChange = (e) => {
        const {name, value} = e.target;
        switch (name) {
        case "name":
            setNameValidationFlag(/^[A-Za-z]+([ ][A-Za-z]+)*$/.test(value));
            setTempName(value);
            break;
        case "phonePrefix":
            setTempPhone({...tempPhone, prefix: value});
            setPhoneValidationFlag(tempPhone.prefix.length === 3);
            break;
        case "phoneSuffix":
            setTempPhone({...tempPhone, suffix: value});
            setPhoneValidationFlag(value.length === 7 && parseFloat(value));
            break;
        default:
            break;
                    // No default action
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (client) {
            setTempPhone({prefix: client.phone.substring(0, 3), suffix: client.phone.substring(3)});
            setTempName(client.name); // changing TempName to client name
            changeName(client.name); // changing UserData name to clients name
        }
    }, [client]);

    const fetchData = async () =>{
        if (loggedIn) {
            const response = await axios.get(`client/get/${userData.id}`, {
                headers: {"Authorization": `Bearer${userData.token}`},
            });
            setClient(response.data.client);
            // setTempPhone({prefix: response.client.phone.substring(0, 3), suffix: response.client.phone.substring(3)});
        }
    };
    /**
     * Sends a request with an update to the backend, and updates the user's representation if any field has been changed.
     * @param {*} e
     */
    const handleSave = async (e) => {
        e.preventDefault();
        if (nameValidationFlag || nameValidationFlag !== null) {
            /* call for backend */
            await axios.patch(`client/update/${userData.id}`, {id: userData.id, name: tempName})
                .then((response) => {
                    console.log(response, tempName, " This is response!");
                })
                .catch((err) => {
                    console.log(err);
                });
            setClient({...client, name: tempName});
            setNameEditable(false);
            setNameValidationFlag(null);
            const clientData = JSON.parse(localStorage.getItem("user"));
            clientData.name = tempName;
            changeName(tempName);
        } else if (phoneValidationFlag || phoneValidationFlag === null) {
            /* call for backend */
            await axios.patch(`client/update/${userData.id}`, {id: userData.id, phone: (tempPhone.prefix + tempPhone.suffix)})
                .then((response) => {
                    console.log(response, "This is response!", client);
                })
                .catch((err) => {
                    console.log(err, " This is error");
                });
            setPhoneEditable(false);
            setPhoneValidationFlag(null);
            console.log(typeof tempPhone, tempPhone);
            setClient({...client, phone: tempPhone.prefix + tempPhone.suffix});
        }
    };

    return (
        <div className="profile-container">
            <Form layout="vertical">
                <Form.Item label="Name"
                    help={(!nameValidationFlag && nameValidationFlag != null) ? "Name can only contain letters" : ""}
                    validateStatus={(!nameValidationFlag && nameValidationFlag != null) ? "error" : "success"}>
                    {isNameEditable ? (
                        <div>
                            <Input name="name" value={tempName} onChange={handleChange}/>
                            <Button type="primary" onClick={handleSave} disabled={!nameValidationFlag}>Save </Button>
                        </div>
                    ) : (
                        <div className="non-editable-field">
                            <span>{client? client.name:""}</span>
                            <Button className="non-editable-field button" type="link" onClick={() => {
                                setNameEditable(true);
                            }}>Edit</Button>
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="Phone Number"
                    help={(!phoneValidationFlag && phoneValidationFlag != null) ? "Phone cannot be set." : ""}
                    validateStatus={(!phoneValidationFlag && phoneValidationFlag != null) ? "error" : "success"}>
                    {isPhoneEditable ? (
                        <div className="editable-field">
                            <ClientDropDown id="phone-prefix" dropDownName="phonePrefix" placeholder={tempPhone.prefix} attributes={phonePrefix} handleSelectedValue={handleChange} >

                            </ClientDropDown>
                            <Input
                                name="phoneSuffix"
                                value={tempPhone.suffix}
                                onChange={handleChange}
                                autoFocus
                            />
                            <Button type="primary" onClick={handleSave} disabled={!phoneValidationFlag}>Save</Button>
                        </div>
                    ) : (
                        <div className="non-editable-field">
                            <span>{`${client? client.phone:""}`}</span>
                            <Button className="non-editable-field button" type="link" onClick={() => {
                                setPhoneEditable(true);
                            }}>Edit</Button>
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="Email">
                    <Text label="Email">{userData.email}</Text>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ClientProfilePage;
