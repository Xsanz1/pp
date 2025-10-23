import React, { useState, useEffect } from "react";
import "./Item.css";

const initialFormState = {
  id: "",
  ahs: "",
  deskripsi: "",
  merek: "",
  satuan: "",
  hpp: "",
  vendor: "",
  wilayah: "",
  tahun: "",
  fotoProduk: [],
  deskripsiProduk: "",
  fileSpesifikasi: null,
  teksSpesifikasi: "",
};

const ItemForm = ({ show, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === "fotoProduk") {
        setFormData({ ...formData, [name]: Array.from(files) });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.fotoProduk.filter((_, i) => i !== index);
    setFormData({ ...formData, fotoProduk: newImages });
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-icon" onClick={handleClose}>
          ❌
        </span>
        <h3>{initialData ? "Edit Item" : "Tambah Item Baru"}</h3>

        <form onSubmit={handleSubmit} className="item-form" encType="multipart/form-data">
          <label>ID:</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} required />

          <label>AHS:</label>
          <input type="text" name="ahs" value={formData.ahs} onChange={handleChange} />

          <label>Deskripsi:</label>
          <input type="text" name="deskripsi" value={formData.deskripsi} onChange={handleChange} />

          <label>Merek:</label>
          <input type="text" name="merek" value={formData.merek} onChange={handleChange} />

          <label>Satuan:</label>
          <input type="text" name="satuan" value={formData.satuan} onChange={handleChange} />

          <label>HPP:</label>
          <input type="text" name="hpp" value={formData.hpp} onChange={handleChange} />

          <label>Vendor:</label>
          <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} />

          <label>Wilayah:</label>
          <input type="text" name="wilayah" value={formData.wilayah} onChange={handleChange} />

          <label>Tahun:</label>
          <input type="text" name="tahun" value={formData.tahun} onChange={handleChange} />

          <label>Foto Produk:</label>
          <input type="file" name="fotoProduk" accept="image/*" multiple onChange={handleChange} />

          {formData.fotoProduk.length > 0 && (
            <div className="preview-container">
              {formData.fotoProduk.map((file, index) => (
                <div key={index} className="preview-box">
                  {file instanceof File && <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className="preview-image" />}
                  <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index)}>❌</button>
                </div>
              ))}
            </div>
          )}

          <label>Deskripsi Produk:</label>
          <textarea name="deskripsiProduk" value={formData.deskripsiProduk} onChange={handleChange}></textarea>

          <div className="spesifikasi-section">
            <h4>Spesifikasi</h4>
            <label>Upload File:</label>
            <input type="file" name="fileSpesifikasi" accept=".pdf,.doc,.docx,.xlsx" onChange={handleChange} />
            <label>Detail Teks:</label>
            <textarea name="teksSpesifikasi" value={formData.teksSpesifikasi} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="submit-btn">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
