import React from 'react';
import dogImage from '../images/homepagebackground.jpg'; // Replace with your actual image file

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <img src={dogImage} alt="Furry Friends" className="img-fluid mb-4" />

      <h1>Welcome to Furry Friends</h1>
      <p className="lead">
        Your one-stop destination for all your animal service needs!
      </p>
      <p>
        Whether you're looking for a reliable dog sitter, a professional pet groomer, or other services for your furry companions,
        Furry Friends has you covered.
      </p>
      <p>
        Our platform connects pet owners with skilled service providers who are passionate about animals.
        It's a community built to ensure the well-being and happiness of your pets.
      </p>

      <div className="mt-5">
        <h2>Services We Offer</h2>
        <p>Find a wide range of services for your pets:</p>
        <ul className="list-unstyled">
          <li>Dog Sitting</li>
          <li>Pet Grooming</li>
          <li>Dog Walking</li>
          <li>Animal Training</li>
          {/* Add more services here */}
        </ul>
      </div>

      <div className="mt-5">
        <h2>Get Started</h2>
        <p>Join Furry Friends and give your pets the care they deserve!</p>
        <button className="btn btn-primary">Sign Up</button>
      </div>

      <footer className="mt-5">
        <p>&copy; 2023 Furry Friends. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
