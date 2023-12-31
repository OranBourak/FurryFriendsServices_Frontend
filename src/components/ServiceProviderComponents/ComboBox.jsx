
import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";

/**
 * Login page component.
 * @param {function} onRegister - Callback function to handle successful registration.
 * @return {React.Component} - The Register page component.
 */
function ComboBoxDropdown({onSelectedValueChange, options, placeholder, variant, id}) {
    const [selectedValue, setSelectedValue] = useState(placeholder);

    const handleSelect = (eventKey, event) => {
        const newValue = event.target.textContent;
        setSelectedValue(newValue); // Set the selected text
        onSelectedValueChange(newValue);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <InputGroup>
                <Dropdown.Toggle variant={variant} id={id} style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                    {selectedValue}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right" style={{width: "auto", maxHeight: "200px", overflowY: "auto"}}>
                    {options.map((option, index) => (
                        <Dropdown.Item
                            key={index}
                            eventKey={option}
                            style={{width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
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
    variant: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default ComboBoxDropdown;
