// Import necessary modules and components
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ClientDropDown from "./ClientDropDown.jsx";
import {Rate} from "antd"; // Import Rate component from Ant Design
import "../../styles/ClientStyles/SearchForm.css";
import PropTypes from "prop-types";

// Labels for the rating field
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

/**
 * Search form component for searching for services
 * @param {handleSearch} - using while the search button is clicked for update the search results
 * @return {React.Component} - form component
 */
function SearchForm({handleSearch}) {
    // Define options for location and service type dropdowns
    const locationsOptions = ["Afula", "Akko",
        "Arad", "Ashdod", "Ashqelon", "Bat Yam", "Beersheba", "Bet Sheʾan", "Bet Sheʿarim", "Bnei Brak", "Caesarea", "Dimona", "Dor", "Elat", "En Gedi", "Givʿatayim", "H̱adera", "Haifa", "Herzliyya", "H̱olon", "Jerusalem", "Karmiʾel", "Kefar Sava", "Lod", "Meron", "Nahariyya", "Nazareth", "Netanya", "Petaẖ Tiqwa", "Qiryat Shemona", "Ramat Gan", "Ramla", "Reẖovot", "Rishon LeẔiyyon", "Sedom", "Tel Aviv–Yafo", "Tiberias", "Zefat"];

    const serviceOptions = ["Dog Groomer", "Veterinarian", "Dog Walker"];

    // Initialize state variables
    const [maxFlag, setMaxFlag] = useState(true);
    const [isFormValid, setIsFormValid] = useState(true);
    const [fields, setFields] = useState({
        typeOfService: "",
        city: "",
        min_price: "",
        max_price: "",
        averageRating: "",
    });

    // Handle changes to form fields
    const handleChange = (e) => {
        const {name, value} = e.target;
        switch (name) {
        // Update state based on the form field that changed
        case "service_type":
            setFields({...fields, typeOfService: value});
            break;
        case "service_location":
            setFields({...fields, city: value});
            break;
        case "min_price":
            setFields({...fields, min_price: value});
            // Validate max price against min price
            setMaxFlag(!(fields.max_price !== "" && parseFloat(fields.max_price) <= parseFloat(value)));
            setIsFormValid(maxFlag);
            break;
        case "max_price":
            setFields({...fields, max_price: value});
            // Validate min price against max price
            setMaxFlag(!(fields.min_price !== "" && (parseFloat(fields.min_price) >= parseFloat(value))));
            break;
        default:
            break;
        }
    };

    // Update form validity when maxFlag changes
    useEffect(() => {
        {(fields.max_price !== "") && setIsFormValid(maxFlag);}
    }, [maxFlag]);


    // Handle changes to the rating field
    const handleRating = (value) => {
        setFields({...fields, averageRating: value});
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(fields);
    };

    // Render the form
    return (
        <Form noValidate onSubmit={handleSubmit} className="Form">
            <Row>
                {/* Service Type Dropdown */}
                <Form.Group as={Col} md="4" controlId="serviceType">
                    <Form.Label>Service Type</Form.Label>
                    <ClientDropDown
                        dropDownName="service_type"
                        handleSelectedValue={handleChange}
                        attributes={serviceOptions}
                        placeholder="Choose a service type"
                        variant="primary"
                        id="service-type-dropbox"
                    />
                </Form.Group>

                {/* Location Dropdown */}
                <Form.Group as={Col} md="4" controlId="serviceLocation">
                    <Form.Label>Location</Form.Label>
                    <ClientDropDown
                        dropDownName="service_location"
                        handleSelectedValue={handleChange}
                        attributes={locationsOptions}
                        placeholder="Choose required location"
                        variant="primary"
                        id="location-dropbox"
                    />
                </Form.Group>

                {/* Price Range Input */}
                <Form.Group as={Col} md="4" controlId="PriceRange">
                    <Form.Label>Price Range</Form.Label>
                    <Form.Control
                        name="min_price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="minimum price"
                        value={fields.min_price}
                        onChange={handleChange}
                    />

                    <Form.Control
                        isInvalid={fields.max_price ? !maxFlag: null}
                        isValid={fields.max_price? maxFlag: null}
                        name="max_price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="maximum price"
                        value={fields.max_price}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Maximum price must be greater than minimum price.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Rating Component */}
                <Form.Group as={Col} md="4" controlId="serviceRate">
                    <Form.Label>Minimum Average Rating</Form.Label>
                    <Rate name="rating" tooltips={desc} onChange={handleRating} value={parseInt(fields.averageRating)} />
                </Form.Group>
            </Row>
            {/* Search Button */}
            <Button disabled={!isFormValid} type="submit">
              Search
            </Button>
        </Form>
    );
}


SearchForm.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

// Export the component
export default SearchForm;
