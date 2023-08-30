/* eslint-disable linebreak-style */
import React, {useState} from "react";
import ComboBoxDropdown from "./ComboBox";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import "./PhoneNumberEl.css";

/**
 * Telephone input component.
 * @param {any} onSelectedValueChange - updates the phone number prefix on change event
 * @param {any} onInputValueChange - updates the remaining 7 digits of the phone number on change event
 * @return {React.Component} - The Telephone input component.
 */
function PhoneNumberEl({onSelectedValueChange, onInputValueChange}) {
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const prefixArr = ["052", "054", "050", "053", "055"];

    const handleInputValueChange = (event) => {
        onInputValueChange(event);
        if (!/^\d{7}$/.test(event.target.value)) {
            setPhoneNumberError("Phone number should contain exactly 7 digits.");
        } else {
            setPhoneNumberError("");
        }
    };

    return (
        <>
            <div className="row-flex">
                <ComboBoxDropdown onSelectedValueChange={onSelectedValueChange} options={prefixArr} placeholder="Choose Phone Prefix" /> {/* Your combobox component */}
                <div className="column-flex">
                    <Form.Control
                        className="telephone-input"
                        name="PhoneInputField"
                        type="number"
                        placeholder="Phone Number"
                        pattern="^\d{7}$"
                        title="Should contain exactly 7 digits"
                        onChange={handleInputValueChange}
                    />
                    <div className="text-danger">{phoneNumberError}</div>
                </div>
            </div>
        </>
    );
};

PhoneNumberEl.propTypes = {
    onSelectedValueChange: PropTypes.func.isRequired,
    onInputValueChange: PropTypes.func.isRequired,
};

export default PhoneNumberEl;
