// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch companies from API
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await fetch('http://localhost:8000/companies/');
    const data = await response.json();
    setCompanies(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:8000/companies/${editingId}`
      : 'http://localhost:8000/companies/';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      fetchCompanies();
      setFormData({ name: '', location: '' });
      setEditingId(null);
    }
  };

  const handleEdit = (company) => {
    setFormData({
      name: company.name,
      location: company.location
    });
    setEditingId(company.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      const response = await fetch(`http://localhost:8000/companies/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCompanies();
      }
    }
  };

  return (
    <div className="App">
      <h1>Company Management System</h1>
      
      <div className="company-form">
        <h2>{editingId ? 'Edit Company' : 'Add New Company'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">
            {editingId ? 'Update Company' : 'Add Company'}
          </button>
          {editingId && (
            <button type="button" onClick={() => {
              setFormData({ name: '', location: '' });
              setEditingId(null);
            }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="company-list">
        <h2>Company List</h2>
        {companies.length === 0 ? (
          <p>No companies found. Add a company to get started.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.location}</td>
                  <td>
                    <button onClick={() => handleEdit(company)}>Edit</button>
                    <button onClick={() => handleDelete(company.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;