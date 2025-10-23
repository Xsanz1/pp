import React, { useState } from "react";
import "./DataTable.css";

const DataTable = ({ data, onEdit, onDelete }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleView = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>AHS</th>
            <th>Deskripsi</th>
            <th>Merek</th>
            <th>Satuan</th>
            <th>HPP</th>
            <th>Vendor</th>
            <th>Wilayah</th>
            <th>Tahun</th>
            <th>Foto</th>
            <th>Deskripsi Produk</th>
            <th>Spesifikasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.ahs}</td>
              <td>{item.deskripsi}</td>
              <td>{item.merek}</td>
              <td>{item.satuan}</td>
              <td>{item.hpp}</td>
              <td>{item.vendor}</td>
              <td>{item.wilayah}</td>
              <td>{item.tahun}</td>

              {/* Foto Produk */}
              <td>
                {item.fotoProduk
                  ? (Array.isArray(item.fotoProduk)
                      ? item.fotoProduk
                          .map((file) =>
                            file instanceof File
                              ? URL.createObjectURL(file)
                              : file
                          )
                          .map((url, i) => (
                            <img key={i} src={url} alt="foto" width="80" />
                          ))
                      : <img
                          src={item.fotoProduk instanceof File ? URL.createObjectURL(item.fotoProduk) : item.fotoProduk}
                          alt="foto"
                          width="80"
                        />
                    )
                  : "-"
                }
              </td>

              <td>{item.deskripsiProduk || "-"}</td>

              <td>
                {item.fileSpesifikasi && (
                  <a
                    href={typeof item.fileSpesifikasi === "string" ? item.fileSpesifikasi : URL.createObjectURL(item.fileSpesifikasi)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 Lihat File
                  </a>
                )}
                {item.teksSpesifikasi && <div>{item.teksSpesifikasi}</div>}
              </td>

              <td>
                <div className="action-buttons" style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleView(item)}
                    style={{ backgroundColor: "yellow", border: "none", cursor: "pointer", padding: "4px 8px" }}
                  >
                    👁
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    style={{ backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", padding: "4px 8px" }}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    style={{ backgroundColor: "red", color: "white", border: "none", cursor: "pointer", padding: "4px 8px" }}
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Detail */}
      {showDetail && selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-icon" onClick={() => setShowDetail(false)} style={{ cursor: "pointer", float: "right" }}>❌</span>
            <h3>Detail AHS</h3>
            <p><b>ID:</b> {selectedItem.id}</p>
            <p><b>Deskripsi:</b> {selectedItem.deskripsi}</p>
            <p><b>Merek:</b> {selectedItem.merek}</p>
            <p><b>Harga (HPP):</b> {selectedItem.hpp}</p>
            <p><b>Vendor:</b> {selectedItem.vendor}</p>
            <p><b>Wilayah:</b> {selectedItem.wilayah}</p>
            <p><b>Tahun:</b> {selectedItem.tahun}</p>

            {selectedItem.fotoProduk &&
              (Array.isArray(selectedItem.fotoProduk)
                ? selectedItem.fotoProduk.map((file, i) => (
                    <img
                      key={i}
                      src={file instanceof File ? URL.createObjectURL(file) : file}
                      alt="Produk"
                      style={{ width: "200px", margin: "5px", borderRadius: "8px" }}
                    />
                  ))
                : <img
                    src={selectedItem.fotoProduk instanceof File ? URL.createObjectURL(selectedItem.fotoProduk) : selectedItem.fotoProduk}
                    alt="Produk"
                    style={{ width: "200px", margin: "5px", borderRadius: "8px" }}
                  />
              )
            }

            {selectedItem.fileSpesifikasi && (
              <p>
                <a
                  href={typeof selectedItem.fileSpesifikasi === "string" ? selectedItem.fileSpesifikasi : URL.createObjectURL(selectedItem.fileSpesifikasi)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 Lihat Spesifikasi
                </a>
              </p>
            )}

            {selectedItem.teksSpesifikasi && (
              <p><b>Detail Spesifikasi:</b><br />{selectedItem.teksSpesifikasi}</p>
            )}

            <button
              onClick={() => setShowDetail(false)}
              style={{ backgroundColor: "#333", color: "white", border: "none", padding: "6px 12px", cursor: "pointer", marginTop: "10px" }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
