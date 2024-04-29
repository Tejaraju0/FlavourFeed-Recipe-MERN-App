import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/fetchall'); // Change the URL to match your server endpoint
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
     <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/categories">Categories</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Explore Categories</li>
        </ol>
      </nav>

      <h1 className='pb-4'>All Categories</h1>
      <div className="row row-cols-2 row-cols-lg-6 g-2 g-lg-3">
        {categories.map(category => (
          <Link to={`/categories/${category.name}`} key={category.id} className="col text-center category__link"> {/* Wrap the div with Link */}
            <div className="category__img shadow">
              <img src={`img/${category.image}`} alt={category.name} loading="lazy" />
            </div>
            <div className="pt-1">{category.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllCategoriesPage;
