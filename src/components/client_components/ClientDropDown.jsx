import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";

/**
 * A dropdown component for selecting items from a list.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.handleSelectedValue - The function to call when an item is selected.
 * @param {string} props.dropDownName - The name attribute for the dropdown.
 * @param {string} props.placeholder - The placeholder text to display when no item is selected.
 * @param {string} props.id - The id attribute for the dropdown.
 * @param {Array} props.attributes - The list of items to display in the dropdown.
 * @param {string} [props.variant="success"] - The variant attribute for styling the dropdown.
 * @return {React.Component} The dropdown component.
 */
function ClientDropDown({handleSelectedValue, dropDownName, placeholder, id, attributes, variant = "success"}) {
    // State to keep track of the currently selected value
    const [selectedValue, setSelectedValue] = useState(placeholder);

    /**
     * Handles the selection of an item in the dropdown.
     *
     * @param {string} value - The value of the selected item.
     * @param {Object} e - The event object.
     */
    const handleSelection = (value, e) => {
        // Get the value attribute of the selected item
        const selected = e.target.getAttribute("value");

        // Update the selected value in the state, or revert to the placeholder if empty
        setSelectedValue(selected || placeholder);

        // Call the passed-in function to handle the selected value
        if (handleSelectedValue) {
            handleSelectedValue({target: {value: selected, name: e.target.getAttribute("name")}});
        }
    };

    return (
        <Dropdown onSelect={handleSelection}>
            <Dropdown.Toggle variant={variant} id={id}>
                {selectedValue}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight: "200px", overflowY: "auto"}}>
                {/* Option to unselect and revert to placeholder */}
                <Dropdown.Item value="" name={dropDownName}>
                    Unselect
                </Dropdown.Item>

                {/* List of selectable items */}
                {attributes.map((attribute, index) => (
                    <Dropdown.Item
                        key={index}
                        value={attribute}
                        name={dropDownName}
                    >
                        {attribute}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

// Define the expected properties and their types
ClientDropDown.propTypes = {
    handleSelectedValue: PropTypes.func.isRequired,
    attributes: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    dropDownName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    variant: PropTypes.string,
};

export default ClientDropDown;
