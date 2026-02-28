import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./ClientModal.css";

import { IoClose } from "react-icons/io5";
import { GrRefresh } from "react-icons/gr";
import Loader from "../../Common/Loader.js";

const Client = ({ show, onHide, onSelect }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedClientIds, setSelectedClientIds] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/clients/all`,
        {
          withCredentials: true,
        }
      );
      setClients(response.data); // Access the data array from the response
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchClients();
    }
  }, [show]);

  const handleSelectClient = (client) => {
    setSelectedClients(prev => {
      if (prev.some(c => c._id === client._id)) {
        return prev.filter(c => c._id !== client._id);
      }
      return [...prev, client];
    });
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedClientIds(clients.map(client => client._id));
    } else {
      setSelectedClientIds([]);
    }
  };

  const handleClientCheckboxChange = (clientId) => {
    setSelectedClientIds(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  if (!show) return null;

  return (
    <div
      className="client-modal-backdrop"
      style={{ display: show ? 'flex' : 'none' }}
    >
      <div
        className="client-modal show"
        tabIndex="-1"
        role="dialog"
        style={{ 
          display: show ? 'block' : 'none',
          position: 'fixed',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">Select Clients</h5>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary mb-2"
                  onClick={() => {
                    setLoading(true);
                    fetchClients();
                  }}

                  title="Refresh"
                >
                  <GrRefresh />

                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mb-2"
                  onClick={onHide}
                  title="Close"
                >
                  <IoClose />
                </button>
              </div>
            </div>
            <div className="modal-body bg-white">
              {loading ?
                <Loader/> : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="form-check-input"
                          />
                        </th>
                        <th>Actions</th>
                        <th>Client</th>
                        <th>Main Phone</th>
                        <th>Website</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedClientIds.includes(client._id)}
                              onChange={() => handleClientCheckboxChange(client._id)}
                              className="form-check-input"
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => {
                                onSelect([client]);
                                onHide();
                              }}
                            >
                              Select
                            </button>
                          </td>
                          <td>{client.company}</td>
                          <td>{client.mainPhone}</td>
                          <td>
                            <a
                              href={client.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {client.website}
                            </a>
                          </td>
                          <td>{client.address1}</td>
                          <td>{client.city}</td>
                          <td>{client.stateProvince}</td>
                          <td>{client.country}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="modal-footer bg-white gap-2">
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={onHide}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => {
                  const selected = clients.filter(client => 
                    selectedClientIds.includes(client._id)
                  );
                  onSelect(selected);
                  onHide();
                }}
              >
                Done ({selectedClientIds.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
