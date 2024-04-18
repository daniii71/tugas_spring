import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddSiswa() {
  const [namaSiswa, setNamaSiswa] = useState("");
  const [nisn, setNisn] = useState("");
  const [alamat, setAlamat] = useState("");
  const [umur, setUmur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/data_siswa",
        {
          nama_siswa: namaSiswa,
          nisn: nisn,
          alamat: alamat,
          umur: umur
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
          icon: 'success',
          title: 'Berhasil',
          text: 'Siswa berhasil ditambahkan!',
        }).then(() => {
          window.location.href = "/data_siswa"; // Baris yang menyebabkan error
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat menambahkan siswa.',
      });
    }
  };
  

  return (
    <>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Tambah Siswa</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={namaSiswa}
                    onChange={(e) => setNamaSiswa(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example1">
                    Nama Siswa
                  </label>
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    NISN
                  </label>
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                className="form-control"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
              <label className="form-label" htmlFor="form3Example3">
                Alamat
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                className="form-control"
                value={umur}
                onChange={(e) => setUmur(e.target.value)}
              />
              <label className="form-label" htmlFor="form3Example4">
                Umur
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

export default AddSiswa;
