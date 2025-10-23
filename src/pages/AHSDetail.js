import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "../styles/Ahs.css";

const AHSDetail = () => {
  const { id } = useParams();

  const detailData = {
    "AHS 6": [
      { item_id: "M_100", uraian: "Sewa Motor", satuan: "Hr", volume: 0.05, hpp: 24000, jumlah: 1200 },
    ],
    "AHS 1": [
      { item_id: "T_001", uraian: "Gali Tanah", satuan: "m3", volume: 1, hpp: 50000, jumlah: 50000 },
    ],
    "AHS 2": [
      { item_id: "B_002", uraian: "Pekerjaan Beton Bertulang", satuan: "m3", volume: 0.75, hpp: 850000, jumlah: 637500 },
    ],
  };

  const data = detailData[id] || [];

  const formatRupiah = (num) =>
    "Rp " + num.toLocaleString("id-ID", { minimumFractionDigits: 0 });

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <div className="ahs-detail-container wide">
          <div className="ahs-detail-header">
            <div className="title-section">
              <FaInfoCircle className="icon-title" />
              <h2>Detail {id}</h2>
            </div>
            <Link to="/ahs" className="back-btn">
              <FaArrowLeft /> Kembali ke Daftar
            </Link>
          </div>

          {data.length > 0 ? (
            <div className="detail-card wide">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>ITEM_ID</th>
                    <th>URAIAN</th>
                    <th>SATUAN</th>
                    <th>VOLUME</th>
                    <th>HPP</th>
                    <th>JUMLAH</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.item_id}>
                      <td>{item.item_id}</td>
                      <td>{item.uraian}</td>
                      <td>{item.satuan}</td>
                      <td>{item.volume}</td>
                      <td>{formatRupiah(item.hpp)}</td>
                      <td className="highlight">{formatRupiah(item.jumlah)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">Data tidak ditemukan</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AHSDetail;
