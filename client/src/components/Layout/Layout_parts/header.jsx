import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { FaUser, FaSearch } from 'react-icons/fa';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, user, handleLogout } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogoutClick = () => {
    const shouldLogout = window.confirm('Are you sure you want to logout?');
    if (shouldLogout) {
      handleLogout();
      navigate('/');
    }
  };

  return (
    <div className="container-xxl px-md-5 bg-white" style={{ minHeight: '160px' }}>
      <header className="d-flex flex-wrap align-items-center justify-content-between py-4">
        {/* Logo */}
        <Link to="/" className="d-block col-md-2 mb-2 mb-md-0 text-dark text-decoration-none">
          <img src="/img/FlavourFeed.png" className="img-fluid" alt='FlavourFeed - Where taste takes flight' style={{ borderRadius: '50px', maxWidth: '30%' }} />
        </Link>

        {/* Navigation Links */}
        <nav className="col-12 col-md-auto mt-2 mb-2 justify-content-start mb-md-0" style={{ fontSize: '23px' }}>
          <ul className="nav">
            <li className="nav-item"><Link to="/" className="nav-link link-secondary">Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link link-secondary">About</Link></li>
            <li className="nav-item"><Link to="/submit-recipe" className="nav-link link-secondary">Submit</Link></li>
            <li className="nav-item"><Link to="/favorites/user:Id" className="nav-link link-secondary">Favorites</Link></li>
          </ul>
        </nav>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="col-12 col-md-auto mb-2 mb-md-0" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="input-group">
            <input
              type="search"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);}}
              className="form-control"
              style={{ borderRadius: '30px', fontSize: '23px' }}
              placeholder="Search..."
              aria-label="Search"
            />
              <button type="submit" className="btn btn-outline-secondary" style={{ border: 'none', background: '#333', color: '#fff', padding: '10px 15px', borderRadius: '50px'}}>
              <FaSearch />
            </button>
          </div>  
        </form>

        {/* Login/Logout */}
        <div className="col-12 col-md-auto text-end">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="user_profile btn me-2">
                <FaUser className="me-1" /> {user.username}
              </Link>
              <button onClick={handleLogoutClick} className="btn btn-primary">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
