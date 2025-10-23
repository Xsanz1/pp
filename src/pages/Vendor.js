import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import VendorForm from "./VendorForm";
import "./Vendor.css";

const Vendor = () => {
  const [vendors, setVendors] = useState([
    {
      id: "V_001",
      name: "FOKUS INDO LIGHTING, PT",
      contact: "-",
      phone: "-",
      email: "-",
      wilayah: "Jakarta",
      tahun: "2024",
    },
    {
      id: "V_002",
      name: "PT Cahaya Nusantara",
      contact: "Andi",
      phone: "08123456789",
      email: "info@cahaya.co.id",
      wilayah: "Sumatra",
      tahun: "2023",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // 🔍 State tambahan untuk pencarian dan filter
  const [search, setSearch] = useState("");
  const [filterWilayah, setFilterWilayah] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  // 🔹 Logika filter data vendor berdasarkan input
  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.id.toLowerCase().includes(search.toLowerCase());
    const matchesWilayah = filterWilayah
      ? v.wilayah.toLowerCase().includes(filterWilayah.toLowerCase())
      : true;
    const matchesTahun = filterTahun
      ? v.tahun.toLowerCase().includes(filterTahun.toLowerCase())
      : true;

    return matchesSearch && matchesWilayah && matchesTahun;
  });

  // 🔹 CRUD Functions
  const handleAddOrEdit = (vendor) => {
    if (selectedVendor) {
      setVendors(vendors.map((v) => (v.id === selectedVendor.id ? vendor : v)));
      setSelectedVendor(null);
    } else {
      setVendors([...vendors, vendor]);
    }
    setShowForm(false);
  };

  const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    setShowForm(true);
  };

  const handleView = (vendor) => {
    setSelectedVendor(vendor);
    setShowDetail(true);
  };

  const handleDelete = (id) => {
    setVendors(vendors.filter((v) => v.id !== id));
  };

  return (
    <div className="vendor-container">
      <Sidebar />

      <div className="vendor-main">
        {/* 🔹 Topbar dengan filter aktif */}
        <Topbar
          title="VENDOR"
          onNewClick={() => setShowForm(true)}
          search={search}
          setSearch={setSearch}
          filterWilayah={filterWilayah}
          setFilterWilayah={setFilterWilayah}
          filterTahun={filterTahun}
          setFilterTahun={setFilterTahun}
        />

        {/* 🔹 Tabel vendor */}
        <div className="vendor-content">
          <table className="vendor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vendor Name</th>
                <th>Contact</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Wilayah</th>
                <th>Tahun</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.name}</td>
                    <td>{v.contact}</td>
                    <td>{v.phone}</td>
                    <td>{v.email}</td>
                    <td>{v.wilayah}</td>
                    <td>{v.tahun}</td>
                    <td>
                      <div
                        className="action-buttons"
                        style={{ display: "flex", gap: "5px" }}
                      >
                        {/* View - Kuning */}
                        <button
                          onClick={() => handleView(v)}
                          style={{
                            backgroundColor: "yellow",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px 8px",
                          }}
                        >
                          👁
                        </button>

                        {/* Edit - Biru */}
                        <button
                          onClick={() => handleEdit(v)}
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px 8px",
                          }}
                        >
                          ✎
                        </button>

                        {/* Delete - Merah */}
                        <button
                          onClick={() => handleDelete(v.id)}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px 8px",
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", color: "gray" }}>
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🔹 Modal Form */}
        {showForm && (
          <VendorForm
            show={showForm}
            onClose={() => {
              setShowForm(false);
              setSelectedVendor(null);
            }}
            onSubmit={handleAddOrEdit}
            initialData={selectedVendor}
          />
        )}

        {/* 🔹 Modal View */}
        {showDetail && selectedVendor && (
          <div className="modal-overlay">
            <div className="modal">
              <span
                className="close-icon"
                onClick={() => setShowDetail(false)}
              >
                ❌
              </span>
              <h3>Detail Vendor</h3>
              <p><strong>ID:</strong> {selectedVendor.id}</p>
              <p><strong>Name:</strong> {selectedVendor.name}</p>
              <p><strong>Contact:</strong> {selectedVendor.contact}</p>
              <p><strong>Phone:</strong> {selectedVendor.phone}</p>
              <p><strong>Email:</strong> {selectedVendor.email}</p>
              <p><strong>Wilayah:</strong> {selectedVendor.wilayah}</p>
              <p><strong>Tahun:</strong> {selectedVendor.tahun}</p>
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

export default Vendor;
