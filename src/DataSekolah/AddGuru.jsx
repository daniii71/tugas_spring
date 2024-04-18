import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddGuru() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jabatan, setJabatan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/data_guru",
        {
          nama_guru: nama,
          alamat: alamat,
          jabatan_guru: jabatan
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Guru berhasil ditambahkan!",
        }).then(() => {
          window.location = "/data_guru";
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menambahkan guru.",
      });
    }
  };

  return (
    <>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Tambah Guru</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example1">
                    Nama
                  </label>
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Alamat
                  </label>
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                className="form-control"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
              />
              <label className="form-label" htmlFor="form3Example3">
                Jabatan
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block text-center px-5"
            >
              Tambah
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddGuru;
