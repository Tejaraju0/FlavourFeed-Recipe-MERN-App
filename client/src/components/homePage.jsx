import React from 'react';
import CategoryList from './views/Category/CategoryList';
import RecipeList from './views/Recipe/RecipeList';
import { Link } from 'react-router-dom';
import LatestList from './views/Latest/LatestList';

function HomePage() {
  return (
    <div>
      {/* Categories Start */}
      <div className="row flex-lg-row-reverse align-items-center g-5 py-4">
        <div className="col-12 col-lg-6">
          <img src="/img/fotor-20240403225720.jpg" width="50%" height="50%" className="d-block mx-lg-auto img-fluid" loading="lazy" alt="Cooking With Node.js" />
        </div>

        <div className="col-12 col-lg-6">
          <h1 className="display-5 fw-bold mb-3">Discover Culinary Delights</h1>
          <div className="lead">
            <div className="container" style={{ textAlign: 'justify' }}>
              <p>Welcome to FlavourFeed, your ultimate destination for culinary inspiration!</p>
              <p>Indulge in a world of gastronomic wonders with our curated selection of mouth-watering recipes.</p>
              <p>From tantalizing appetizers to decadent desserts, we've got you covered with an array of delightful dishes to satisfy every craving.</p>
              <p>Explore our diverse collection of recipes, featuring:</p>
              <ul>
                <li>Easy weeknight dinners</li>
                <li>Exquisite gourmet creations</li>
                <li>Hearty comfort foods</li>
                <li>Healthy and nutritious options</li>
                <li>Irresistible sweets and treats</li>
                <li>And much more!</li>
              </ul>
              <p>Join us on a culinary journey and elevate your cooking experience to new heights!</p>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/latest-recipes" className="btn btn-primary btn-dark btn-lg px-4 me-md-2">Explore Latest</Link>
              <Link to="/explore-random" className="btn btn-outline-secondary btn-lg px-4 me-md-2">Show Random</Link>
            </div>
          </div>
        </div>
        {/* Render CategoryList separately */}
        <div className="container">
          <CategoryList />
        </div>

        {/* Render LatestList and RecipeList separately */}
        <div className="container">
          <LatestList />
          <RecipeList />
        </div>

        <section className="px-4 py-5 my-5 text-center">
          <img src="/img/publish-recipe.png" className="d-block mx-auto mb-4 img-fluid" alt="Publish your recipe for FREE today" width="566" height="208" loading="lazy" />
          <h1 className="display-5 fw-bold">Publish your recipe for FREE today</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Publish your Recipe in front of thousands of people for free.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <a href="/submit-recipe" className="btn btn-primary btn-dark btn-lg">Submit Recipe</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
