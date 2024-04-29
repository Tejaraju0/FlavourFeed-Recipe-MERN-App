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
      window.location.href = `/search?searchTerm=${encodeURIComponent(searchTerm)}`;
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
    <div className="container-xxl px-md-5 bg-white " style={{ minHeight: '160px' }}>
      <header className="d-flex flex-wrap align-items-center justify-content-start justify-content-md-between py-4">
        {/* Logo */}
        <a href="/" className="d-flex align-items-center col-md-2 mb-2 mb-md-0 text-dark text-decoration-none">
          <img src="/img/FlavourFeed.png" width="80" height="80" alt='FlavourFeed - Where taste takes flight' style={{ borderRadius: '50px' }} />
        </a>

        {/* Navigation Links */}
        <ul className="nav col-12 col-md-auto mb-2 justify-content-start mb-md-0" style={{ fontSize: '23px' }}>
          <li style={{ marginRight: '20px' }}><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
          <li style={{ marginRight: '20px' }}><a href="/about" className="nav-link px-2 link-secondary">About</a></li>
          <li style={{ marginRight: '20px' }}><a href="/submit-recipe" className="nav-link px-2 link-secondary">Submit</a></li>
          <li><a href="/favorites/user:Id" className="nav-link px-2 link-secondary">Favorites</a></li>
        </ul>

        {/* Search Form */}
        <div className="text-end" style={{paddingLeft: '10px'}}>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="search"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => {
                console.log('typing search term:', e.target.value);
                setSearchTerm(e.target.value);}}
              className="form-control"
              style={{ width: '250px', borderRadius: '30px', fontSize: '23px', paddingLeft:'20px', marginLeft: '-100px' }}
              placeholder="Search..."
              aria-label="Search"
            />
              <button type="submit" className="btn btn-outline-secondary" style={{ border: 'none', background: '#333', color: '#fff', padding: '10px 15px', borderRadius: '50px'}}>
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Login/Logout */}
        <div className="col-0 text-end">
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
