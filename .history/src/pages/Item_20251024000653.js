import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DataTable from "../components/DataTable";
import ItemForm from "./ItemForm";
import axios from "axios";
import "./Item.css";

const Item = () => {
  // 🔹 State data dari API
  const [items, setItems] = useState([]);

  // 🔹 Filter dan form state
  const [search, setSearch] = useState("");
  const [filterWilayah, setFilterWilayah] = useState("");
  const [wilayahList, setWilayahList] = useState(["Jakarta", "Bandung", "Surabaya"]);
  const [filterTahun, setFilterTahun] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // 🔹 Base URL API
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  // ===============================
  // 🔹 FETCH DATA DARI BACKEND
  // ===============================
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/items`);
      setItems(res.data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      alert("Gagal memuat data item dari server");
    }
  };

  // ===============================
  // 🔹 TAMBAH / UPDATE ITEM
  // ===============================
  const handleAdd = async (item) => {
    try {
      if (editingItem) {
        // Update data
        await axios.put(`${API_URL}/items/${editingItem.id}`, item);
      } else {
        // Tambah data baru
        await axios.post(`${API_URL}/items`, item);
      }

      fetchItems(); // refresh data
      setEditingItem(null);
      setShowForm(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data item!");
    }
  };

  // ===============================
  // 🔹 EDIT ITEM
  // ===============================
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // ===============================
  // 🔹 HAPUS ITEM
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus item ini?")) return;
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus item!");
    }
  };

  // ===============================
  // 🔹 FILTERING DATA
  // ===============================
  const filteredItems = items.filter((item) => {
    const matchSearch =
      item.deskripsi?.toLowerCase().includes(search.toLowerCase()) ||
      item.id?.toLowerCase().includes(search.toLowerCase());

    const matchWilayah = filterWilayah
      ? item.wilayah?.toLowerCase().includes(filterWilayah.toLowerCase())
      : true;

    const matchTahun = filterTahun ? item.tahun === filterTahun : true;

    return matchSearch && matchWilayah && matchTahun;
  });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar
          title="ITEM"
          onNewClick={() => setShowForm(true)}
          search={search}
          setSearch={setSearch}
          filterWilayah={filterWilayah}
          setFilterWilayah={setFilterWilayah}
          filterTahun={filterTahun}
          setFilterTahun={setFilterTahun}
          wilayahList={wilayahList}
        />

        <div className="content-box">
          <DataTable
            data={filteredItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <ItemForm
          show={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          onSubmit={handleAdd}
          initialData={editingItem}
        />
      </div>
    </div>
  );
};

export default Item;
