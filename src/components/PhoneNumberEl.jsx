/* eslint-disable linebreak-style */
import React, {useState} from "react";
import ComboBoxDropdown from "./ComboBox";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import "./PhoneNumberEl.css";

/**
 * Telephone input component.
 * @param {function} onSelectedValueChange - updates the phone number prefix on change event
 * @param {function} onInputValueChange - updates the remaining 7 digits of the phone number on change event
 * @param {String} comboBoxPlaceholder - placeholder for the prefix combobox.
 * @param {String} phoneInputPlaceholder - placeholder for the phone input field.
 * @return {React.Component} - The Telephone input component.
 */
function PhoneNumberEl({onSelectedValueChange, onInputValueChange, comboBoxPlaceholder, phoneInputPlaceholder}) {
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
                <ComboBoxDropdown onSelectedValueChange={onSelectedValueChange} options={prefixArr} placeholder={comboBoxPlaceholder} /> {/* Your combobox component */}
                <div className="column-flex">
                    <Form.Control
                        className="telephone-input"
                        name="PhoneInputField"
                        type="number"
                        placeholder={phoneInputPlaceholder}
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
    comboBoxPlaceholder: PropTypes.string.isRequired,
    phoneInputPlaceholder: PropTypes.string.isRequired,
};

export default PhoneNumberEl;
