import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function AddMapel() {
  const [namaMapel, setNamaMapel] = useState("");
  const [guruMapel, setGuruMapel] = useState("");
  const [kelasMapel, setKelasMapel] = useState("");
  const [tahunMapel, setTahunMapel] = useState("");
  const [guruOptions, setGuruOptions] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);
  const history = useHistory();

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

        const kelasResponse = await axios.get("http://localhost:8080/api/kelas_siswa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setKelasOptions(kelasResponse.data);
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
        "http://localhost:8080/api/mapel",
        {
          nama_mapel: namaMapel,
          guru_mapel: guruMapel,
          kelas_mapel: kelasMapel,
          tahun_mapel: tahunMapel
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
          text: 'Mapel berhasil ditambahkan!',
        }).then(() => {
          window.location.href = "/data_mapel"; // Mengarahkan ke halaman data_mapel
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat menambahkan mapel.',
      });
    }
  };

  return (
    <>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Tambah Mapel</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <select
                    className="form-select"
                    value={guruMapel}
                    onChange={(e) => setGuruMapel(e.target.value)}
                  >
                    <option value="">Pilih Guru</option>
                    {guruOptions.map((guru) => (
                      <option key={guru.id} value={guru.id}>
                        {guru.nama_guru}
                      </option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="form3Example1">
                    Guru Mapel
                  </label>
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={namaMapel}
                    onChange={(e) => setNamaMapel(e.target.value)}
                    placeholder="Mapel"
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Mapel
                  </label>
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <select
                className="form-select"
                value={kelasMapel}
                onChange={(e) => setKelasMapel(e.target.value)}
              >
                <option value="">Pilih Kelas</option>
                {kelasOptions.map((kelas) => (
                  <option key={kelas.id} value={kelas.id}>
                    {kelas.nama_Kelas}
                  </option>
                ))}
              </select>
              <label className="form-label" htmlFor="form3Example3">
                Kelas
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                className="form-control"
                value={tahunMapel}
                onChange={(e) => setTahunMapel(e.target.value)}
                placeholder="Tahun"
              />
              <label className="form-label" htmlFor="form3Example4">
                Tahun
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

export default AddMapel;
