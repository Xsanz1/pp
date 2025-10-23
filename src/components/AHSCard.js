import React from "react";
import { Link } from "react-router-dom";

const AHSCard = ({ id, uraian, satuan, total }) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "10px",
      background: "#f9f9f9"
    }}>
      <h3>{id} - {uraian}</h3>
      <p>Satuan: {satuan}</p>
      <p>Total: {total.toLocaleString()}</p>
      <Link to={`/ahs/${id}`} style={{ color: "blue" }}>
        Lihat Detail
      </Link>
    </div>
  );
};

export default AHSCard;
