import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Table } from "reactstrap";

const UserModal = ({ isOpen, toggle, onSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedUsers([]); // Clear selections when modal is reopened
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the request
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("API Response:", result); // Log the entire response
  
      // Check if the data field exists and is an array
      if (Array.isArray(result.data.data)) {
        setUsers(result.data.data); // Set the users state
        console.log("Users fetched:", result.data.data); // Log fetched users
      } else {
        console.error("Unexpected API response:", result);
        setUsers([]); // Clear users if the response is not as expected
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Clear users on error
    } finally {
      setLoading(false); // Stop loading
    }
  };
  // Handle Checkbox Selection
  const handleCheckboxChange = (user) => {
    setSelectedUsers((prev) => {
      const isSelected = prev.some((item) => item._id === user._id);
      return isSelected
        ? prev.filter((item) => item._id !== user._id) // Remove if already selected
        : [...prev, user]; // Add if not selected
    });
  };

  // Confirm Selection
  const handleConfirm = () => {
    const selectedIds = selectedUsers.map((user) => user._id);
    const selectedNames = selectedUsers.map((user) => user.fullName || user.username).join(", ");
    onSelect({ ids: selectedIds, names: selectedNames }); // Pass data to parent
    toggle(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Users</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>Select</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.some((item) => item._id === user._id)}
                        onChange={() => handleCheckboxChange(user)}
                      />
                    </td>
                    <td>{user.fullName || user.username || "N/A"}</td>
                    <td>{user.email || "N/A"}</td>
                    <td>{user.role || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
        <Button color="primary" onClick={handleConfirm} disabled={selectedUsers.length === 0}>
          Confirm Selection
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default UserModal;