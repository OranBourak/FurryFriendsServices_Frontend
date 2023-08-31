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
 * @param {String} variant - the vriant of the combobox(determines the color).
 * @return {React.Component} - The Telephone input component.
 */
function PhoneNumberEl({onSelectedValueChange, onInputValueChange, comboBoxPlaceholder, phoneInputPlaceholder, cbVariant}) {
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [phone, setPhone] = useState(phoneInputPlaceholder);
    const prefixArr = ["052", "054", "050", "053", "055"];

    const handleInputValueChange = (event) => {
        const newPhoneNum = event.target.value;
        setPhone(newPhoneNum);
        setPhoneNumberError(!/^\d{7}$/.test(newPhoneNum));
        onInputValueChange(event);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-auto">
                    <ComboBoxDropdown
                        onSelectedValueChange={onSelectedValueChange}
                        options={prefixArr}
                        placeholder={comboBoxPlaceholder}
                        variant={cbVariant}
                        id="phone-cmb"
                    />
                </div>
                <div className="col-md-6">
                    <Form.Control
                        className="telephone-input"
                        name="PhoneInputField"
                        type="text"
                        placeholder={phoneInputPlaceholder}
                        isInvalid={phoneNumberError}
                        isValid={!phoneNumberError}
                        onChange={handleInputValueChange}
                        value={phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        Phone number should contain exactly 7 digits
                    </Form.Control.Feedback>
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
    cbVariant: PropTypes.string.isRequired,
};

export default PhoneNumberEl;
