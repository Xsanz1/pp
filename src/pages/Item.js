import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DataTable from "../components/DataTable";
import ItemForm from "./ItemForm";
import "./Item.css";

const Item = () => {
  const [items, setItems] = useState([
    {
      id: "M_001",
      ahs: "Material",
      deskripsi: "Luminer Tipe Arteri LED 150 W",
      merek: "-",
      satuan: "Bh",
      hpp: "Rp 981000",
      vendor: "-",
      wilayah: "Jateng",
      tahun: "2024",
      fotoProduk: "https://via.placeholder.com/100",
      deskripsiProduk: "Lampu LED hemat energi untuk penerangan jalan arteri.",
      fileSpesifikasi: "/files/spesifikasi.xlsx",
      teksSpesifikasi: "• Daya: 150W\n• Tegangan: 220V",
    },
    {
      id: "M_002",
      ahs: "Jasa",
      deskripsi: "Pekerjaan Pemasangan Lampu Jalan",
      merek: "-",
      satuan: "Paket",
      hpp: "Rp 1500000",
      vendor: "PT Cahaya Nusantara",
      wilayah: "Jabar",
      tahun: "2023",
      fotoProduk: "https://via.placeholder.com/100",
      deskripsiProduk: "Jasa pemasangan lampu penerangan jalan.",
      fileSpesifikasi: "/files/pemasangan.xlsx",
      teksSpesifikasi: "• Tim ahli\n• Garansi 1 tahun",
    },
  ]);

  // 🔹 State filter
  const [search, setSearch] = useState("");
  const [filterWilayah, setFilterWilayah] = useState("");
  const [wilayahList, setWilayahList] = useState(["Jakarta", "Bandung", "Surabaya"]);
  const [filterTahun, setFilterTahun] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAdd = (item) => {
    if (editingItem) {
      setItems(items.map((it) => (it.id === editingItem.id ? item : it)));
      setEditingItem(null);
    } else {
      setItems([...items, item]);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 🔹 Filtering data sebelum dikirim ke DataTable
  const filteredItems = items.filter((item) => {
    const matchSearch =
      item.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchWilayah = filterWilayah
      ? item.wilayah.toLowerCase().includes(filterWilayah.toLowerCase())
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

        {/* 🔹 Tambahkan pembungkus konten agar tampilan tabel lebih rapi */}
        <div className="content-box">
          <DataTable data={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
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
