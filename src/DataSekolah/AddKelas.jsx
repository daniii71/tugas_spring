import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddKelas() {
  const [namaKelas, setNamaKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [waliKelas, setWaliKelas] = useState("");
  const [guruOptions, setGuruOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const guruResponse = await axios.get("http://localhost:8080/api/data_guru", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGuruOptions(guruResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/kelas_siswa",
        {
          nama_Kelas: namaKelas,
          nama_jurusan: jurusan,
          wali_kelas: waliKelas
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
          text: 'Kelas berhasil ditambahkan!',
        }).then(() => {
          window.location.href = "/data_kelas"; // Mengarahkan ke halaman data_kelas
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat menambahkan kelas.',
      });
    }
  };

  return (
    <>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Tambah Kelas</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="number"
                    className="form-control"
                    value={namaKelas}
                    onChange={(e) => setNamaKelas(e.target.value)}
                    placeholder="Kelas"
                  />
                  <label className="form-label" htmlFor="form3Example1">
                    Kelas
                  </label>
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    placeholder="Jurusan"
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Jurusan
                  </label>
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <select
                className="form-select"
                value={waliKelas}
                onChange={(e) => setWaliKelas(e.target.value)}
              >
                <option value="">Pilih Wali Kelas</option>
                {guruOptions.map((guru) => (
                  <option key={guru.id} value={guru.nama_guru}>
                    {guru.nama_guru}
                  </option>
                ))}
              </select>
              <label className="form-label" htmlFor="form3Example3">
                Wali Kelas
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

export default AddKelas;
