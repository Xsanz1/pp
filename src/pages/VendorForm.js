import React, { useState, useEffect } from "react";
import "./Vendor.css";

const VendorForm = ({ show, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contact: "",
    phone: "",
    email: "",
    wilayah: "",
    tahun: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: "",
        name: "",
        contact: "",
        phone: "",
        email: "",
        wilayah: "",
        tahun: "",
      });
    }
  }, [initialData]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-icon" onClick={onClose}>❌</span>
        <h3>{initialData ? "Edit Vendor" : "Tambah Vendor Baru"}</h3>
        <form onSubmit={handleSubmit} className="vendor-form">
          <label>ID:</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} required />

          <label>Vendor Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Contact Name:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} />

          <label>Contact No:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label>Wilayah:</label>
          <input type="text" name="wilayah" value={formData.wilayah} onChange={handleChange} />

          <label>Tahun:</label>
          <input type="text" name="tahun" value={formData.tahun} onChange={handleChange} />

          <button type="submit" className="submit-btn">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default VendorForm;
