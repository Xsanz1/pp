
import React, { useState, useEffect } from "react";
import "./Ahs.css";

const AhsForm = ({ show, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    item_id: "",
    uraian: "",
    satuan: "",
    volume: "",
    hpp: "",
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setTotal(initialData.volume * initialData.hpp);
    } else {
      setFormData({
        item_id: "",
        uraian: "",
        satuan: "",
        volume: "",
        hpp: "",
      });
      setTotal(0);
    }
  }, [initialData]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    // otomatis hitung total saat volume atau hpp berubah
    if (name === "volume" || name === "hpp") {
      const v = parseFloat(updatedData.volume) || 0;
      const h = parseFloat(updatedData.hpp) || 0;
      setTotal(v * h);
    }

    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, volume: parseFloat(formData.volume) || 0, hpp: parseFloat(formData.hpp) || 0 };
    onSubmit(finalData);
    onClose();
  };

  const formatCurrency = (num) =>
    num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-icon" onClick={onClose}>❌</span>
        <h3>{initialData ? "Edit Data AHS" : "Tambah Data AHS"}</h3>
        <form onSubmit={handleSubmit} className="ahs-form">
          <label>ID:</label>
          <input
            type="text"
            name="item_id"
            value={formData.item_id}
            onChange={handleChange}
            required
          />

          <label>Deskripsi:</label>
          <input
            type="text"
            name="uraian"
            value={formData.uraian}
            onChange={handleChange}
            required
          />

          <label>Unit:</label>
          <input
            type="text"
            name="satuan"
            value={formData.satuan}
            onChange={handleChange}
          />

          <label>Volume:</label>
          <input
            type="number"
            step="0.001"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
          />

          <label>HPP:</label>
          <input
            type="number"
            name="hpp"
            value={formData.hpp}
            onChange={handleChange}
          />

          <label>Harga Pokok Total:</label>
          <input
            type="text"
            value={formatCurrency(total)}
            readOnly
          />

          <button type="submit" className="submit-btn">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default AhsForm;

