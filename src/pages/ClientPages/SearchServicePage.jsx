import React from "react";
import SearchForm from "../../components/client_components/SearchForServiceForm.jsx";
import ServiceProviderResults from "../../components/client_components/SearchServiceResults.jsx";
import "../../styles/ClientStyles/SearchServicePage.css";


/**
 *
 * @return {React.Component} - SearchServicePage component
 */
function SearchServicePage() {
    return (
        <div className="search-page-container">
            <div className="search-form-container">
                <SearchForm />
            </div>
            <div className="service-provider-results-container">
                <ServiceProviderResults serviceData={serviceData} />
            </div>
        </div>
    );
}

/* Object for testing the result component*/
const serviceData = [
    {
        id: 1,
        providerName: "DogPaws & Whiskers Co.s",
        reviewAverage: 4.5,
        services: ["Pet Grooming", "Dog Walking", "Dog Sitting", "Animal Training"],
        priceRange: "$50 - $100",
        avatar: "../../images/50x50.jpg",
    },
    {
        id: 2,
        providerName: "Furry Friends PetCare",
        reviewAverage: 4.2,
        services: ["Pet Grooming", "Dog Walking", "Dog Sitting", "Animal Training"],
        priceRange: "$30 - $80",
        avatar: "https://via.placeholder.com/50",
    },
    {
        id: 3,
        providerName: "TailWaggers Grooming",
        reviewAverage: 3.9,
        services: ["Pet Grooming", "Dog Walking", "Dog Sitting", "Animal Training"],
        priceRange: "$40 - $90",
        avatar: "https://via.placeholder.com/50",
    },
    {
        id: 4,
        providerName: "HappyTails Animal Services",
        reviewAverage: 4.8,
        services: ["Pet Grooming", "Dog Walking", "Dog Sitting", "Animal Training"],
        priceRange: "$60 - $120",
        avatar: "https://via.placeholder.com/50",
    },
    {
        id: 5,
        providerName: "PetPalace Wellness",
        reviewAverage: 4.5,
        services: ["Pet Grooming", "Dog Walking", "Dog Sitting", "Animal Training"],
        priceRange: "$50 - $100",
        avatar: "https://via.placeholder.com/50",
    },
    {
        id: 6,
        providerName: "Woof & Meow Spa",
        reviewAverage: 4.2,
        services: ["Pet Grooming", "Dog Walking", "Dog Sitting", "Animal Training"],
        priceRange: "$30 - $80",
        avatar: "https://via.placeholder.com/50",
    },
    {
        id: 7,
        providerName: "Four-Legged Love",
        reviewAverage: 3.9,
        services: ["Pet Grooming", "Dog Walking", "Dog Sitting", "Animal Training"],
        priceRange: "$40 - $90",
        avatar: "https://via.placeholder.com/50",
    },
    {
        id: 8,
        providerName: "CritterCare Unlimited",
        reviewAverage: 4.8,
        services: ["Pet Grooming", "Dog Walking", "Dog Sitting", "Animal Training"],
        priceRange: "$60 - $120",
        avatar: "https://via.placeholder.com/50",
    },
];


export default SearchServicePage;


