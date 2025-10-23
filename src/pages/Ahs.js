
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AhsForm from "./AhsForm";
import "./Ahs.css";

const Ahs = () => {
  const [itemList] = useState([
    { id: "M_100", deskripsi: "Sewa Motor" },
    { id: "M_001", deskripsi: "Luminer Tipe Arteri LED 150 W" },
    { id: "M_002", deskripsi: "Pemasangan Lampu Jalan" },
  ]);

  const [ahsData, setAhsData] = useState([
    {
      item_id: "M_100",
      uraian: "Sewa Motor",
      satuan: "Hr",
      volume: 0.05,
      hpp: 24000,
    },
    {
      item_id: "M_002",
      uraian: "Pemasangan Lampu Jalan",
      satuan: "Unit",
      volume: 2,
      hpp: 50000,
    },
  ]);

  // 🔍 Filter hanya item yang ada di daftar itemList
  const filteredAhsData = ahsData.filter((ahs) =>
    itemList.some((item) => item.id === ahs.item_id)
  );

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddOrEdit = (item) => {
    if (selectedItem) {
      setAhsData(
        ahsData.map((v) => (v.item_id === selectedItem.item_id ? item : v))
      );
      setSelectedItem(null);
    } else {
      setAhsData([...ahsData, item]);
    }
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  const handleDelete = (item_id) => {
    setAhsData(ahsData.filter((v) => v.item_id !== item_id));
  };

  // 🔹 Fungsi hitung total otomatis
  const formatCurrency = (num) =>
    num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div className="ahs-container">
      <Sidebar />
      <div className="ahs-main">
        <Topbar title="AHS" onNewClick={() => setShowForm(true)} />

        <div className="ahs-content">
          <table className="ahs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DESKRIPSI</th>
                <th>UNIT</th>
                <th>HARGA POKOK TOTAL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAhsData.length > 0 ? (
                filteredAhsData.map((item) => {
                  const total = item.volume * item.hpp;
                  return (
                    <tr key={item.item_id}>
                      <td>{item.item_id}</td>
                      <td>{item.uraian}</td>
                      <td>{item.satuan}</td>
                      <td>{formatCurrency(total)}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="view"
                            onClick={() => handleView(item)}
                          >
                            👁
                          </button>
                          <button
                            className="edit"
                            onClick={() => handleEdit(item)}
                          >
                            ✎
                          </button>
                          <button
                            className="delete"
                            onClick={() =>
                              handleDelete(item.item_id)
                            }
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                    Tidak ada data cocok dengan Item
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <AhsForm
            show={showForm}
            onClose={() => {
              setShowForm(false);
              setSelectedItem(null);
            }}
            onSubmit={handleAddOrEdit}
            initialData={selectedItem}
          />
        )}

        {showDetail && selectedItem && (
          <div className="modal-overlay">
            <div className="modal">
              <span
                className="close-icon"
                onClick={() => setShowDetail(false)}
              >
                ❌
              </span>
              <h3>Detail AHS</h3>
              <p>
                <strong>ID:</strong> {selectedItem.item_id}
              </p>
              <p>
                <strong>Deskripsi:</strong> {selectedItem.uraian}
              </p>
              <p>
                <strong>Unit:</strong> {selectedItem.satuan}
              </p>
              <p>
                <strong>Volume:</strong> {selectedItem.volume}
              </p>
              <p>
                <strong>HPP:</strong> {formatCurrency(selectedItem.hpp)}
              </p>
              <p>
                <strong>Harga Pokok Total:</strong>{" "}
                {formatCurrency(selectedItem.volume * selectedItem.hpp)}
              </p>
              <button
                className="close-btn"
                onClick={() => setShowDetail(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ahs;

