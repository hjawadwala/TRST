import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Input } from "reactstrap";

function ClientContactsModal({ isOpen, toggle, onSelect }) {
  const [contacts, setContacts] = useState([]); // Stores contact data
  const [selectedContacts, setSelectedContacts] = useState([]); // Stores selected contacts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/client-contacts/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
      console.log("✅ Full API Response:", JSON.stringify(data, null, 2));
  
      // Extract contacts properly based on API response
      setContacts(data.data || []);
    } catch (error) {
      console.error("❌ Error fetching contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };
  

  // Toggle selection when a checkbox is clicked
  const handleCheckboxChange = (contact) => {
    setSelectedContacts((prev) => {
      const isSelected = prev.some((item) => item._id === contact._id);
      return isSelected
        ? prev.filter((item) => item._id !== contact._id) // Remove if already selected
        : [...prev, contact]; // Add if not selected
    });
  };

  // Confirm selection and pass selected names & IDs to the parent
  const handleConfirmSelection = () => {
    if (selectedContacts.length > 0) {
      const selectedContactIDs = selectedContacts.map((contact) => contact._id);
      const selectedContactNames = selectedContacts
        .map((contact) => `${contact.firstName} ${contact.lastName}`)
        .join(", ");

      onSelect({ ids: selectedContactIDs, names: selectedContactNames }); // Send both ID & Name
    }
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Client Contacts</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading...</p>
        ) : contacts.length > 0 ? (
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Select</th>
                <th>Contact Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
  {contacts.length > 0 ? (
    contacts.map((contact, index) => (
      <tr key={contact._id}>
        <td>{index + 1}</td>
        <td>
          <Input
            type="checkbox"
            checked={selectedContacts.some((item) => item._id === contact._id)}
            onChange={() => handleCheckboxChange(contact)}
          />
        </td>
        <td>{contact.firstName} {contact.lastName}</td>
        <td>{contact.emailAddress}</td>
        <td>{contact.workPhone}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center text-danger">⚠ No contacts available</td>
    </tr>
  )}
</tbody>

          </Table>
        ) : (
          <p className="text-center text-danger">⚠ No contacts available</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedContacts.length === 0}>
          Select {selectedContacts.length > 0 && `(${selectedContacts.length})`}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ClientContactsModal;
