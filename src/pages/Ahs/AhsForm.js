import React, { useState } from "react";
import { itemReference } from "../../data/itemReference";
import "./AhsForm.css";

const AhsForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    item_id: "",
    uraian: "",
    satuan: "",
    volume: "",
    hpp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // update nilai yang diketik
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // cek apakah item_id cocok dengan data referensi
    if (name === "item_id") {
      const found = itemReference.find(
        (item) => item.item_id.toLowerCase() === value.toLowerCase()
      );
      if (found) {
        setFormData((prev) => ({
          ...prev,
          item_id: found.item_id,
          uraian: found.uraian,
          satuan: found.satuan,
        }));
      } else {
        // kosongkan uraian dan satuan jika tidak ditemukan
        setFormData((prev) => ({
          ...prev,
          uraian: "",
          satuan: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      item_id: "",
      uraian: "",
      satuan: "",
      volume: "",
      hpp: "",
    });
  };

  return (
    <form className="ahs-form" onSubmit={handleSubmit}>
      <h3>Tambah Item AHS</h3>
      <div className="form-group">
        <label>Item ID:</label>
        <input
          type="text"
          name="item_id"
          value={formData.item_id}
          onChange={handleChange}
          placeholder="Misal: M_100"
          required
        />
      </div>

      <div className="form-group">
        <label>Uraian:</label>
        <input
          type="text"
          name="uraian"
          value={formData.uraian}
          readOnly
          placeholder="Otomatis muncul"
        />
      </div>

      <div className="form-group">
        <label>Satuan:</label>
        <input
          type="text"
          name="satuan"
          value={formData.satuan}
          readOnly
          placeholder="Otomatis muncul"
        />
      </div>

      <div className="form-group">
        <label>Volume:</label>
        <input
          type="number"
          name="volume"
          value={formData.volume}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>HPP:</label>
        <input
          type="number"
          name="hpp"
          value={formData.hpp}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Tambah</button>
    </form>
  );
};

export default AhsForm;
