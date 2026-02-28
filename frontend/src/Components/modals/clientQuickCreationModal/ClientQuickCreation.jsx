import React, { useState } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import axios from 'axios';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

function ClientQuickCreation({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    mainPhone: '',
    address1: '',
    city: '',
    stateProvince: '',
    country: '',
    zipCode: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!formData.company) {
        alert("Company name is required");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/clients/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      Toastify({
        text: "Client created successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#28a745",
        },
      }).showToast();

      onSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating client:", error);
      alert(error.response?.data?.message || "Error creating client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Quick Create Client</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label>Company <span className="text-danger">*</span></Label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <Label>Website</Label>
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <Label>Main Phone</Label>
                    <Input
                      name="mainPhone"
                      value={formData.mainPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label>Address 1</Label>
                    <Input
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <Label>City</Label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <Label>State/Province</Label>
                    <Input
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <Label>Country</Label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <Label>Zip Code</Label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Client'}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientQuickCreation;