import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGlobe, faUsers, faLightbulb, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container about-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">About Us</li>
        </ol>
      </nav>

      <div className='about_photo'>
        <img
          src={"/img/About.jpg"}
          alt="About us"
          style={{ width: '80%', borderRadius: '10px', marginBottom: '20px' }}
        />
      </div>

      <h1 className="about-header pb-4" style={{ animation: 'fadeIn 2s ease-in-out forwards', color: '#f0594a' }}>
        About FlavourFeed
      </h1>

      <div className="about-content">
        <p>
          Welcome to FlavourFeed, your ultimate culinary companion! At FlavourFeed, we are passionate about food and committed to helping you explore the world of flavors, one bite at a time. Whether you're a seasoned chef or a culinary novice, our platform is designed to inspire, educate, and delight.
        </p>

        <p>
          Our mission is to empower home cooks and food enthusiasts by providing a diverse range of recipes, cooking tips, and culinary resources. From quick and easy weekday meals to indulgent weekend treats, we've got something for everyone.
        </p>

        <h2>What sets us apart:</h2>

        <ul className="about-features">
          <li>
            <FontAwesomeIcon icon={faStar} style={{ color: '#f0594a', marginRight: '10px' }} />
            <b>Curation:</b> Our team of expert chefs carefully curates each recipe to ensure quality and reliability.
          </li>
          <li>
            <FontAwesomeIcon icon={faGlobe} style={{ color: '#2196f3', marginRight: '10px' }} />
            <b>Variety:</b> With thousands of recipes spanning cuisines from around the globe, you'll never run out of culinary inspiration.
          </li>
          <li>
            <FontAwesomeIcon icon={faUsers} style={{ color: '#00bcd4', marginRight: '10px' }} />
            <b>Community:</b> Join our vibrant community of food lovers to share your culinary creations, ask questions, and connect with like-minded individuals.
          </li>
          <li>
            <FontAwesomeIcon icon={faLightbulb} style={{ color: '#ffc107', marginRight: '10px' }} />
            <b>Innovation:</b> We're constantly evolving and exploring new ways to enhance your cooking experience, from innovative recipe features to interactive cooking tutorials.
          </li>
          <li>
            <FontAwesomeIcon icon={faBookOpen} style={{ color: '#4caf50', marginRight: '10px' }} />
            <b>Learning Resources:</b> Access a wealth of helpful articles, guides, and techniques to elevate your culinary skills.
          </li>
        </ul>

        <p>Join us on a culinary adventure and let your taste buds take flight with FlavourFeed!</p>
      </div>
    </div>
  );
};

export default About;
