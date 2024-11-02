import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/fetchall');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const slicedCategories = categories.slice(0, 5);

  return (
    <div>
      <h1 className="pb-4">Explore Categories</h1>
      <div className="row row-cols-2 row-cols-lg-6 g-2 g-lg-3 py-4">
        {slicedCategories.map(category => (
          <Link key={category.id || category.name} to={`/categories/${category.name}`} className="col text-center category__link">
            <div className="category__img shadow">
              <img src={`img/${category.image}`} alt={category.name} loading="lazy" />
            </div>
            <div className="pt-1">{category.name}</div>
          </Link>
        ))}

        {/* Ensure the 'View All' Link component has a unique key */}
        <Link key="view-all" to="/categories" className="col text-center category__link">
          <div className="category__img shadow">
            <img src="img/view-all.jpg" alt="View All Categories" loading="lazy" />
          </div>
          <div className="pt-1">View All</div>
        </Link>
      </div>
    </div>
  );
}

export default CategoryList;