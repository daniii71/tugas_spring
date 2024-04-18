import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UpdateMapel({ match }) {
  const [mapelData, setMapelData] = useState({});
  const [guruOptions, setGuruOptions] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:8080/api/mapel/${match.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMapelData(response.data);

        const guruResponse = await axios.get('http://localhost:8080/api/data_guru', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGuruOptions(guruResponse.data);

        const kelasResponse = await axios.get('http://localhost:8080/api/kelas_siswa', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setKelasOptions(kelasResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [match.params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/mapel/${match.params.id}`, mapelData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data mapel berhasil diperbarui!',
      }).then(() => {
        window.location.href = '/data_mapel';
      });
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat memperbarui data mapel.',
      });
    }
  };

  return (
    <div>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Update Mapel</h3>
          <form onSubmit={handleUpdate}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <select className="form-select" value={mapelData.guru_mapel} onChange={(e) => setMapelData({ ...mapelData, guru_mapel: e.target.value })}>
                    <option value="">Pilih Guru</option>
                    {guruOptions.map((guru) => (
                      <option key={guru.id} value={guru.nama_guru}>
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
                  <input type="text" className="form-control" value={mapelData.nama_mapel} onChange={(e) => setMapelData({ ...mapelData, nama_mapel: e.target.value })} />
                  <label className="form-label" htmlFor="form3Example2">
                    Mapel
                  </label>
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <select className="form-select" value={mapelData.kelas_mapel} onChange={(e) => setMapelData({ ...mapelData, kelas_mapel: e.target.value })}>
                <option value="">Pilih Kelas</option>
                {kelasOptions.map((kelas) => (
                  <option key={kelas.id} value={kelas.nama_Kelas}>
                    {kelas.nama_Kelas}
                  </option>
                ))}
              </select>
              <label className="form-label" htmlFor="form3Example3">
                Kelas
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="number" className="form-control" value={mapelData.tahun_mapel} onChange={(e) => setMapelData({ ...mapelData, tahun_mapel: e.target.value })} placeholder="Tahun" />
              <label className="form-label" htmlFor="form3Example4">
                Tahun
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block text-center px-5">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateMapel;
