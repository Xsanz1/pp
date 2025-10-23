import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AhsTable from "../../components/AhsTable";
import { ahsData } from "../../data/ahsData";
import AhsForm from "./AhsForm";
import "./Ahs.css";

const AhsList = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Daftar AHS" />
        <div className="ahs-container">
          {ahsData.map((ahs) => (
            <AhsTable
              key={ahs.id}
              title={ahs.title}
              total={ahs.total}
              items={ahs.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AhsList;
