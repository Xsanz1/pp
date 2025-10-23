import React from "react";
import "./AhsTable.css";

const AhsTable = ({ title, total, items }) => {
  return (
    <div className="ahs-table">
      <h3 className="ahs-title">{title}</h3>
      <table>
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
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.item_id}</td>
              <td>{item.uraian}</td>
              <td>{item.satuan}</td>
              <td>{item.volume}</td>
              <td>{item.hpp.toLocaleString()}</td>
              <td>{item.jumlah.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="ahs-total">HRG POKOK TOTAL: {total.toLocaleString()}</div>
    </div>
  );
};

export default AhsTable;
