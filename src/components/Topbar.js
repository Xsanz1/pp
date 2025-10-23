import React, { useState } from "react";
import "./Topbar.css";

const Topbar = ({
  title,
  onNewClick,
  onImportClick,
  onExportClick,
  search,
  setSearch,
  filterWilayah,
  setFilterWilayah,
  filterTahun,
  setFilterTahun,
}) => {
  const [wilayahOptions, setWilayahOptions] = useState([
    "Jakarta",
    "Bandung",
    "Surabaya",
  ]);

  const handleWilayahChange = (e) => {
    const value = e.target.value;
    if (setFilterWilayah) {
      setFilterWilayah(value);
    }

    if (value && !wilayahOptions.includes(value)) {
      setWilayahOptions((prev) => [...prev, value]);
    }
  };

  return (
    <div className="topbar">
      <h2>{title}</h2>

      {/* Input pencarian */}
      <input
        type="text"
        className="search-input"
        placeholder="Cari..."
        value={search}
        onChange={(e) => setSearch && setSearch(e.target.value)}
      />

      {/* Input wilayah */}
      <input
        list="wilayah-options"
        className="search-input"
        placeholder="Wilayah"
        value={filterWilayah}
        onChange={handleWilayahChange}
      />
      <datalist id="wilayah-options">
        {wilayahOptions.map((wilayah, idx) => (
          <option key={idx} value={wilayah} />
        ))}
      </datalist>

      {/* Input tahun */}
      <input
        type="text"
        className="search-input"
        placeholder="Tahun"
        value={filterTahun}
        onChange={(e) => setFilterTahun && setFilterTahun(e.target.value)}
      />

      {/* Tombol aksi */}
      <div className="topbar-buttons">
        {onExportClick && (
          <button className="btn-export" onClick={onExportClick}>
            📤 Ekspor
          </button>
        )}
        {onImportClick && (
          <button className="btn-import" onClick={onImportClick}>
            📥 Impor
          </button>
        )}
        {onNewClick && (
          <button className="btn-new" onClick={onNewClick}>
            + Baru
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
