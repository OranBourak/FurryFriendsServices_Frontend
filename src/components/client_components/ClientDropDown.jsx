import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";

/**
 *
 * @param {*} param0
 * @return {React.Component}
 */
function ClientDropDown({handleSelectedValue, dropDownName, placeholder, id, attributes, variant="success"}) {
    const [selectedValue, setSelectedValue] = useState(placeholder);

    const handleSelection = (value, e) => {
        setSelectedValue(e.target.getAttribute("value"));
        if (handleSelectedValue) {
            handleSelectedValue({target: {value: e.target.getAttribute("value"), name: e.target.getAttribute("name")}});
        }
    };
    return (
        <Dropdown onSelect={handleSelection}>
            <Dropdown.Toggle variant={variant} id={id}>
                {selectedValue}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight: "200px", overflowY: "auto"}}>
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


ClientDropDown.propTypes = {
    handleSelectedValue: PropTypes.func.isRequired,
    attributes: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    dropDownName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    variant: PropTypes.string,
};

export default ClientDropDown;
