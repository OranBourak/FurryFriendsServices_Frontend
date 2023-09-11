import React, {useState, useEffect} from "react";
import "../../styles/ClientStyles/ServiceProviderReviews.css";
import PropTypes from "prop-types";
import {Carousel, Card, Rate, Button, Empty} from "antd";
import axios from "axios";

// ReviewCarousel component to display reviews for a given provider
const ReviewCarousel = ({providerID}) => {
    // State to hold reviews and the current slide index
    const [reviews, setReviews] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Reference to the Carousel component
    const carouselRef = React.useRef(null);

    // Fetch reviews when the component mounts or providerID changes
    useEffect(() => {
        axios.get(`/review/getReviews/${providerID}`)
            .then((response) => {
                // Update the reviews state with fetched data
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the reviews:", error);
            });
    }, [providerID]);

    // Handler for beforeChange event of Carousel
    const handleBeforeChange = (from, to) => {
        // Update the current slide index
        setCurrentSlide(to);
    };

    // Functions to navigate to the next and previous slides
    const next = () => {
        carouselRef.current.next();
    };

    const prev = () => {
        carouselRef.current.prev();
    };

    return (
        <div>
            <h1>Reviews</h1>
            {/* Carousel component to display reviews */}
            <Carousel
                ref={carouselRef}
                beforeChange={handleBeforeChange}
                autoplay={reviews.length > 0}
                autoplaySpeed={4000} // 4000 milliseconds = 4 seconds
            >
                {/* Conditionally render reviews or an empty state */}
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index}>
                            <Card title={`Review by Client ${review.clientName}`}>
                                <Rate disabled value={review.rating} />
                                <p>{review.comment}</p>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div>
                        <Card title="No Reviews Available">
                            <Empty description="No Reviews Yet" />
                        </Card>
                    </div>
                )}
            </Carousel>
            {/* Buttons to navigate through reviews */}
            <Button type="primary" onClick={prev}>
                Previous
            </Button>
            <Button type="primary" onClick={next}>
                Next
            </Button>
            {/* Display the current review index */}
            <span>
                {reviews.length > 0 && ` Review ${currentSlide + 1} of ${reviews.length}`}
            </span>
        </div>
    );
};

// Prop validation
ReviewCarousel.propTypes = {
    providerID: PropTypes.string.isRequired,
};

export default ReviewCarousel;
