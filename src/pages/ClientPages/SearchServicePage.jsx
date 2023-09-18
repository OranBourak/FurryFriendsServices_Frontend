import React, {useState} from "react";
import axios from "axios";
import {Typography} from "antd";
import SearchForm from "../../components/client_components/SearchForServiceForm.jsx";
import ServiceProviderResults from "../../components/client_components/SearchServiceResults.jsx";
import "../../styles/ClientStyles/SearchServicePage.css";
import {message, Skeleton, Steps} from "antd";


const {Text} = Typography;
/**
 * SearchServicePage is a React component that serves as the main page for searching service providers.
 * It manages the state for service data and handles the search functionality.
 *
 * @return {React.Component} - SearchServicePage component
 */
function SearchServicePage() {
    // State to hold the service provider data
    const [serviceData, serviceDataSet] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const description = "Please select a service provider";

    /**
     * handleSearch is an asynchronous function that fetches service provider data based on search parameters.
     * It updates the serviceData state with the fetched data.
     *
     * @param {Object} event - The search parameters
     */
    const handleSearch = async (event) => {
        setIsLoading(true); // Set loading to true when search starts
        try {
            // Make an API call to search for service providers based on the search parameters
            const response = await axios.get("/client/searchProviders/", {
                params: event,
            });

            // Check if the request was successful
            if (response.status === 200) {
                // Update the state with the fetched service provider data
                serviceDataSet(response.data.providers);
            }
        } catch (error) {
            // Log any errors that occur during the API call
            console.error("An error occurred while fetching data: ", error);
            message.error({

                content: `An error occurred while fetching data: ${error}`,

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
        } finally {
            setIsLoading(false); // Set loading to false when search is complete
        }
    };

    return (
        // Main container for the search page
        <div className="search-page-container">
            <Steps
                current={0}
                status="process"
                items={[
                    {
                        title: "Selecting a service provider",
                        description,
                    },
                    {
                        title: "Select Appointment type and time",
                    },
                    {
                        title: "Appointment has been scheduled",
                    },
                ]}
            />
            {/* Container for the search form */}
            <div className="search-form-container">
                {/* SearchForm component to handle the search input */}
                <SearchForm handleSearch={handleSearch} isLoading={isLoading} />
            </div>
            {/* Container for displaying the search results */}
            <div className="service-provider-results-container">
                {isLoading ? (
                    <Skeleton active /> // Show loading skeleton if isLoading is true
                ) : (
                    <> {/* ServiceProviderResults component to display the list of service providers */}
                        <ServiceProviderResults serviceData={serviceData} />
                        <Text style={{fontSize: "20px"}}>#Results: {serviceData.length}</Text>
                    </>
                )}
            </div>
        </div>
    );
}

// Export the SearchServicePage component
export default SearchServicePage;
