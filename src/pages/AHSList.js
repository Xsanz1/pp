import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaSearch } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "../styles/Ahs.css";

const AHSList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    { item_id: "AHS 1", uraian: "Pekerjaan Tanah" },
    { item_id: "AHS 2", uraian: "Pekerjaan Beton" },
    { item_id: "AHS 6", uraian: "Sewa Motor" },
  ];

  // 🔍 Filter data berdasarkan pencarian
  const filteredData = data.filter(
    (item) =>
      item.item_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uraian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <div className="ahs-header">
          <h2>Daftar AHS</h2>
          <div className="actions">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Cari AHS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="ahs-table-container">
          <table className="ahs-table">
            <thead>
              <tr>
                <th>ITEM_ID</th>
                <th>URAIAN</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.item_id}>
                    <td>{item.item_id}</td>
                    <td>{item.uraian}</td>
                    <td>
                      <Link to={`/ahs/${item.item_id}`} className="btn-view">
                        <FaEye /> Lihat
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", color: "#888" }}>
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AHSList;
