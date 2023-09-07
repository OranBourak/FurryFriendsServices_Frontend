import React, {useState} from "react";
import axios from "axios";
import SearchForm from "../../components/client_components/SearchForServiceForm.jsx";
import ServiceProviderResults from "../../components/client_components/SearchServiceResults.jsx";
import "../../styles/ClientStyles/SearchServicePage.css";


/**
 *
 * @return {React.Component} - SearchServicePage component
 */
function SearchServicePage() {
    const handleSearch = async (event) => {
        try {
            const response = await axios.get("/client/searchProviders/", {
                params: event,
            });

            if (response.status === 200) {
                console.log(response.data);
                serviceDataSet([]);
            }
        } catch (error) {
            console.error("An error occurred while fetching data: ", error);
        }
    };

    const [serviceData, serviceDataSet] = useState([]);

    return (
        <div className="search-page-container">
            <div className="search-form-container">
                <SearchForm handleSearch={handleSearch} />
            </div>
            <div className="service-provider-results-container">
                <ServiceProviderResults serviceData={serviceData} />
            </div>
        </div>
    );
}

export default SearchServicePage;


