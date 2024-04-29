import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SubmitRecipe = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // State to store the image file
  const [infoSubmit, setInfoSubmit] = useState('');
  const [infoErrors, setInfoErrors] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    name: '',
    description: '',
    ingredients: '',
    category: '',
    image: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!email) errors.email = 'Email is required.';
    if (!name) errors.name = 'Recipe name is required.';
    if (!description) errors.description = 'Description is required.';
    if (!category) errors.category = 'Category is required.';
    if (!ingredients) errors.ingredients = 'Atleast one ingredient is required.';
    if (!image) errors.image = 'Image is required.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient);
      });
      if (image) {
        formData.append('image', image);
      }

      // Make POST request to submit recipe
      const response = await axios.post('http://localhost:8000/api/submit-recipe', formData);

      // Handle success response
      setInfoSubmit(response.data.message);

      setFieldErrors({});
      
      setInfoErrors('');

      // Reset form after successful submission
      setEmail('');
      setName('');
      setDescription('');
      setIngredients(['']);
      setCategory('');
      setImage(null); // Reset the image state
      
      
      setTimeout(() => {
        setInfoSubmit('');
      }, 5000);
    
    } catch (error) {
      // Handle error
      console.error('Error submitting recipe:', error);
      setInfoErrors('An error occurred');
    }
  };


  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Set the selected image file
  };

  return (
    <div className="px-4 mb-0 text-center pt-5 pb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Submit Recipe</li>
        </ol>
      </nav>

      <h1 className="display-5 fw-bold">Submit Your Recipe</h1>
      <div className="col-lg-6 mx-auto mb-5">
        <p className="lead">Share your amazing recipes with thousands of web developers across the world. Fill our form to get started.</p>
      </div>
      <div className="row justify-content-center">
        {infoSubmit && (
          <div className="col-8 alert alert-success" style={{ width: '50%', textAlign: 'center', marginLeft: '25%', marginRight: '25%' }} role="alert">
            {infoSubmit}
          </div>
        )}
        {infoErrors && (
          <div className="col-8 alert alert-danger" role="alert">
            {infoErrors}
          </div>
        )}
        <div className="col-10">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-3">
              <div className="col-12">
                <div className="text-center">
                  <label htmlFor="email" className="form-label" style={{ fontSize: '22px', marginBottom: '5px', marginLeft: '-47%' }}>*Email: </label>
                  <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '50%', margin: 'auto' }} />
                  {fieldErrors.email && <p className="text-danger">{fieldErrors.email}</p>}
                </div>
              </div>
              <div className="col-12">
                <div className="text-center">
                  <label htmlFor="name" className="form-label" style={{ fontSize: '22px', marginBottom: '5px', marginLeft: '-43%' }}>*Recipe Name: </label>
                  <input type="text" name="name" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '50%', margin: 'auto' }} />
                  {fieldErrors.name && <p className="text-danger">{fieldErrors.name}</p>}
                </div>
              </div>
              <div className="col-12">
                <div className="text-center">
                  <label htmlFor="description" className="form-label" style={{ fontSize: '22px', marginBottom: '5px', marginLeft: '-44%' }}>*Description: </label>
                  <textarea name="description" id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="4" style={{ width: '50%', margin: 'auto' }}></textarea>
                  {fieldErrors.description && <p className="text-danger">{fieldErrors.description}</p>}
                </div>
              </div>
              {/* Ingredients Field */}
              {ingredients.map((ingredient, index) => (
                <div key={index} className="col-12">
                  <div className="text-center">
                    <label htmlFor={`ingredient-${index}`} className="form-label" style={{ fontSize: '22px', marginBottom: '5px', marginLeft: '-44%' }}>*Ingredient {index + 1}: </label>
                    <input
                      type="text"
                      name={`ingredient-${index}`}
                      value={ingredient}
                      className="form-control"
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      style={{ width: '50%', margin: 'auto' }}
                    />  
                    {fieldErrors.ingredients && <p className="text-danger">{fieldErrors.ingredients}</p>}
                  </div>
                </div>
              ))}
              <div className="col-12">
                <button type="button" className="btn btn-outline-primary" onClick={handleAddIngredient} id="addIngredientsBtn">+ Ingredient</button>
              </div>
              <div className="col-12">
                <div className="text-center">
                  <label htmlFor="category" className="form-label" style={{ fontSize: '22px', marginBottom: '5px', marginLeft: '-41%' }}>*Select Category: </label>
                  <select className="form-select form-control" name="category" aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '50%', margin: 'auto' }}>
                    <option value="" disabled>Select Category</option>
                    <option value="Thai">Thai</option>
                    <option value="American">American</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Italian">Italian</option>
                  </select>
                  {fieldErrors.category && <p className="text-danger">{fieldErrors.category}</p>}
                </div>
              </div>
              {/* Image Upload Field */}
              <div className="col-12">
                <div className="text-center">
                  <label htmlFor="image" className="form-label" style={{ fontSize: '22px', marginBottom: '5px', marginLeft: '30%', paddingTop: '20px' }}>*Upload Image: </label>
                  <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} style={{ width: '50%', margin: 'auto' }} />
                  {fieldErrors.image && <p className="text-danger">{fieldErrors.image}</p>}
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '10%', margin: 'auto', marginTop: '40px' }}>Submit Recipe</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitRecipe;
