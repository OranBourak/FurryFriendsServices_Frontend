import React, {useState} from "react";
import {Input, Button, Form, Typography} from "antd";
import "../../styles/ClientStyles/ClientProfilePage.css"; // Import the CSS file

// components
import ClientDropDown from "../../components/client_components/ClientDropDown.jsx";

/**
 * a client profile page, presents data of the user in a form, user can edit name and phone number fields.
 * @param {*} user
 * @return {React.Component} Client profile page
 */
function ClientProfilePage() {
    const user = {id: "1", name: "Tomer", email: "tomer@gmail.com", phone_prefix: "054", phone_suffix: "2097535"};
    const [userInfo, setUserInfo] = useState(user);
    const Text = Typography.Text;
    const [isNameEditable, setNameEditable] = useState(false);
    const [isPhoneEditable, setPhoneEditable] = useState(false);
    const [nameValidationFlag, setNameValidationFlag] = useState(null);
    const [phoneValidationFlag, setPhoneValidationFlag] = useState(null);
    const [tempPhone, setTempPhone] = useState({prefix: user.phone_prefix, suffix: user.phone_suffix});
    const [tempName, setTempName] = useState(user.name);
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
            setNameValidationFlag(/^[A-Za-z]+([ ][A-Za-z])*$/.test(value));
            setTempName(value);
            break;
        case "phone_prefix":
            setTempPhone({...tempPhone, prefix: value});
            setPhoneValidationFlag(tempPhone.prefix.length === 3);
            break;
        case "phone_suffix":
            setTempPhone({...tempPhone, suffix: value});
            setPhoneValidationFlag(value.length === 7 && parseFloat(value));
            break;
        default:
            break;
                    // No default action
        }
        console.log(tempPhone, e.target, userInfo, tempPhone.suffix, parseFloat(tempPhone.suffix));
    };


    /**
     * Sends a request with an update to the backend, and updates the user's representation if any field has been changed.
     * @param {*} e
     */
    const handleSave = (e) => {
        if (nameValidationFlag || nameValidationFlag === null) {
            /* call for backend */
            setUserInfo({...userInfo, name: tempName});
            setNameEditable(false);
            setNameValidationFlag(null);
        }
        if (phoneValidationFlag || phoneValidationFlag === null) {
            /* call for backend */
            setUserInfo({...userInfo, phone_prefix: tempPhone.prefix, phone_suffix: tempPhone.suffix});
            setPhoneEditable(false);
        }
        console.log(e.target, tempPhone, user.phone_prefix, user.phone_suffix, phoneValidationFlag);
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
                            <Button type="primary" onClick={handleSave}>Save</Button>
                        </div>
                    ) : (
                        <div className="non-editable-field">
                            <span>{userInfo.name}</span>
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
                            <ClientDropDown id="phone-prefix" dropDownName="phone_prefix" placeholder={userInfo.phone_prefix} attributes={phonePrefix} handleSelectedValue={handleChange} >

                            </ClientDropDown>
                            <Input
                                name="phone_suffix"
                                value={tempPhone.suffix}
                                onChange={handleChange}
                                autoFocus
                            />
                            <Button type="primary" onClick={handleSave}>Save</Button>
                        </div>
                    ) : (
                        <div className="non-editable-field">
                            <span>{`(${tempPhone.prefix}) ${tempPhone.suffix}`}</span>
                            <Button className="non-editable-field button" type="link" onClick={() => {
                                setPhoneEditable(true);
                            }}>Edit</Button>
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="Email">
                    <Text label="Email">{userInfo.email}</Text>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ClientProfilePage;
