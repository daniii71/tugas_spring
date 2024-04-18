import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UpdateKelas(props) {
  const [kelas, setKelas] = useState({
    nama_Kelas: '',
    nama_jurusan: '',
    wali_kelas: ''
  });
  const [guruOptions, setGuruOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/kelas_siswa/${props.match.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setKelas(response.data);

        const guruResponse = await axios.get("http://localhost:8080/api/data_guru", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGuruOptions(guruResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.match.params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/kelas_siswa/${props.match.params.id}`, kelas, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Kelas berhasil diperbarui!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = "/data_kelas";
      });
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  return (
    <div className="container p-3">
      <div className="m-5">
        <h3 className="text-center">Update Kelas</h3>
        <form onSubmit={handleUpdate}>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <input
                  type="text"
                  className="form-control"
                  value={kelas.nama_Kelas}
                  onChange={(e) => setKelas({ ...kelas, nama_Kelas: e.target.value })}
                />
                <label className="form-label" htmlFor="form3Example1">
                  Nama Kelas
                </label>
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <input
                  type="text"
                  className="form-control"
                  value={kelas.nama_jurusan}
                  onChange={(e) => setKelas({ ...kelas, nama_jurusan: e.target.value })}
                />
                <label className="form-label" htmlFor="form3Example2">
                  Nama Jurusan
                </label>
              </div>
            </div>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <select
              className="form-select"
              value={kelas.wali_kelas}
              onChange={(e) => setKelas({ ...kelas, wali_kelas: e.target.value })}
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateKelas;
