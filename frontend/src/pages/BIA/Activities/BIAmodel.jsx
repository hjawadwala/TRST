import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";
import axios from "axios";

const BIAmodel = ({ isOpen, toggle, onSelect }) => {
  const [biaData, setBiaData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchBiaData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/bia-dashboards`);
  
      console.log("✅ FULL AXIOS RESPONSE:", response);
      console.log("✅ BIA API Response (data):", response.data);
  
      if (Array.isArray(response.data) && response.data.length > 0) {
        setBiaData(response.data);
      } else {
        console.warn("❌ No BIA records found.");
      }
    } catch (error) {
      console.error("❌ Error fetching BIA data:", error);
    }
  };
  
  

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.some((e) => e._id === item._id)
        ? prevSelected.filter((e) => e._id !== item._id)
        : [...prevSelected, item]
    );
  };

  const handleConfirmSelection = () => {
    if (selectedItems.length > 0) {
      const ids = selectedItems.map((item) => item._id);
      const names = selectedItems.map((item) => item.name || item.title || "Unknown").join(", ");
      onSelect({ ids, names });
    }
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select BIA Record</ModalHeader>
      <ModalBody>
        {isLoading ? (
          <p>Loading...</p>
        ) : biaData.length > 0 ? (
          <Table striped responsive>
            <thead>
              <tr>
                <th>Select</th>
                <th>Title</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {biaData.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.some((e) => e._id === item._id)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </td>
                  <td>{item.title || "N/A"}</td>
                  <td>{item.owner || "N/A"}</td>
                  <td>{item.status || "N/A"}</td>
                  <td>{item.description || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-danger">❌ No BIA records found.</p>
        )}
      </ModalBody>
      <ModalFooter>
        <span className="me-auto">Selected: {selectedItems.length}</span>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedItems.length === 0}>
          Select ({selectedItems.length})
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default BIAmodel;

