/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
/**
 * Login page component.
 * @param {function} onRegister - Callback function to handle successful registration.
 * @return {React.Component} - The Register page component.
 */
function ComboBoxDropdown({onSelectedValueChange, options, placeholder}) {
    const [selectedValue, setSelectedValue] = useState(placeholder);

    const handleSelect = (eventKey, event) => {
        const newValue = event.target.textContent;
        setSelectedValue(newValue); // Set the selected text
        onSelectedValueChange(newValue);
        console.log(eventKey, event);
    };

    return (
        <Dropdown className="m-3" onSelect={handleSelect}>
            <InputGroup>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                    {selectedValue}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {options.map((option, index) => (
                        <Dropdown.Item
                            key={index}
                            eventKey={option}
                        >
                            {option}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </InputGroup>
        </Dropdown>
    );
}

ComboBoxDropdown.propTypes = {
    onSelectedValueChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default ComboBoxDropdown;
