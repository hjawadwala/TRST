import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Input, Label, Form } from "reactstrap";
import axios from "axios";

function EditAttachment() {
  const { id } = useParams(); // Get attachment ID from URL
  const navigate = useNavigate();

  // State variables for form fields
  const [order, setOrder] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [includeInPlan, setIncludeInPlan] = useState(false);
  const [isFromTemplate, setIsFromTemplate] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [description, setDescription] = useState("");

 
  useEffect(() => {
    if (!id) {
      console.error("❌ Error: ID is undefined!");
      alert("Invalid attachment ID.");
      return;
    }
  
    console.log("📡 Fetching data for ID:", id);
  
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/attachments/${id}`)
      .then(response => {
        console.log("✅ Full API Response:", response.data);
  
        if (!response.data || Object.keys(response.data).length === 0) {
          console.error("⚠️ API Response is empty or undefined:", response.data);
          alert("No data received from API.");
          return;
        }
  
        const data = response.data;
        setOrder(data.order ?? ""); 
        setAttachmentName(data.attachmentName ?? ""); 
        setIncludeInPlan(data.includeInPlan ?? false); 
        setIsFromTemplate(data.isFromTemplate ?? false); 
        setDescription(data.description ?? ""); 
        setDocumentFile(data.documentFile ?? null); // Store the old image URL
  
        console.log("✅ State updated successfully!");
      })
      .catch(error => {
        console.error("❌ API Fetch Error:", error.response?.data || error.message);
        alert("Failed to fetch attachment details.");
      });
  }, [id]);
  
  
    

 // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("order", order);
    formData.append("attachmentName", attachmentName);
    formData.append("includeInPlan", includeInPlan ? "true" : "false");
    formData.append("isFromTemplate", isFromTemplate ? "true" : "false");
    if (documentFile) formData.append("documentFile", documentFile);
    formData.append("description", description);
  
    // Debugging: Check FormData before sending
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/attachments/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      console.log("API Response:", response.data);
      alert("Attachment updated successfully!");
      navigate("/attachments");
    } catch (error) {
      console.error("Error updating attachment:", error.response?.data || error.message);
      alert("Failed to update attachment.");
    }
  };
  

  return (
    <React.Fragment>
      <Helmet>
        <title>Edit Attachment Page | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Attachment: Edit Attachment</div>
            <div className="d-flex align-items-center justify-content-end">
              <NavLink className="button3 border-1 button3-changes me-1" to="/attachments" title="Cancel">
                <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                Cancel
              </NavLink>
              <button className="button3 border-1 me-3" onClick={handleSubmit} title="Save">
                <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} />
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="form-heading">Attachment Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-8">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="order" className="form-label me-2 fs-15 w-40">Order</Label>
                  <Input name="order" className="form-control" type="number" value={order} onChange={(e) => setOrder(e.target.value)} required />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="attachmentName" className="form-label me-2 fs-15 w-40">Attachment Name <span className="text-danger">*</span></Label>
                  <Input name="attachmentName" className="form-control" type="text" value={attachmentName} onChange={(e) => setAttachmentName(e.target.value)} required />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="includeInPlan" className="form-label me-5 fs-15 w-29">Include in Plan</Label>
                  <Input name="includeInPlan" className="form-control" type="checkbox" checked={includeInPlan} onChange={(e) => setIncludeInPlan(e.target.checked)} />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="isFromTemplate" className="form-label me-5 fs-15 w-29">Is from Template?</Label>
                  <Input name="isFromTemplate" className="form-control" type="checkbox" checked={isFromTemplate} onChange={(e) => setIsFromTemplate(e.target.checked)} />
                </div>
              </div>
            </div>
            <div className="form-content">
              <div className="form-heading">Document Information</div>
              <div className="border-1"></div>
              <div className="row pt-4">
                <div className="col-8">
                  <div className="mb-3 d-flex align-items-center">
                    <Label htmlFor="documentFile" className="form-label me-2 fs-15 w-40">Document File</Label>
                    <Input name="documentFile" className="form-control" type="file" onChange={(e) => setDocumentFile(e.target.files[0])} />
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <Label htmlFor="description" className="form-label me-2 fs-15 w-40">Description</Label>
                    <textarea name="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>    
    </React.Fragment>
  );
}

export default EditAttachment;
