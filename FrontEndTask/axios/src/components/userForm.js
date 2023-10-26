import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      // Handle update logic for existing entry
      console.log('Updating user with ID:', formData.id);
      // Perform update API call or other logic
    } else {
      // Handle new entry logic for new user
      console.log('Creating new user entry');
      // Perform create API call or other logic
    }

    // Reset the form after submission
    setFormData({
      id: '',
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="form-group">
        <label>ID:</label>
        <input type="text" className="form-control" name="id" value={formData.id} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Street:</label>
        <input type="text" className="form-control" name="address.street" value={formData.address.street} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Suite:</label>
        <input type="text" className="form-control" name="address.suite" value={formData.address.suite} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input type="text" className="form-control" name="address.city" value={formData.address.city} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Zipcode:</label>
        <input type="text" className="form-control" name="address.zipcode" value={formData.address.zipcode} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Website:</label>
        <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Company Name:</label>
        <input type="text" className="form-control" name="company.name" value={formData.company.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Catch Phrase:</label>
        <input type="text" className="form-control" name="company.catchPhrase" value={formData.company.catchPhrase} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>BS:</label>
        <input type="text" className="form-control" name="company.bs" value={formData.company.bs} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default UserForm;
