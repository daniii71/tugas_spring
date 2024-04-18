import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';

function UpdateGuru() {
  const history = useHistory();
  const { id } = useParams();
  const [guru, setGuru] = useState({
    nama_guru: '',
    alamat: '',
    jabatan_guru: ''
  });

  useEffect(() => {
    const getGuruById = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/data_guru/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGuru(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getGuruById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/data_guru/${id}`, guru, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data guru berhasil diperbarui!'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/data_guru';
        }
      });
    } catch (error) {
      console.error('Error updating guru:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat memperbarui data guru!'
      });
    }
  };

  return (
    <div>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Update Guru</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={guru.nama_guru}
                    onChange={(e) => setGuru({ ...guru, nama_guru: e.target.value })}
                  />
                  <label className="form-label" htmlFor="nama_guru">
                    Nama
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={guru.alamat}
                    onChange={(e) => setGuru({ ...guru, alamat: e.target.value })}
                  />
                  <label className="form-label" htmlFor="alamat">
                    Alamat
                  </label>
                </div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                className="form-control"
                value={guru.jabatan_guru}
                onChange={(e) => setGuru({ ...guru, jabatan_guru: e.target.value })}
              />
              <label className="form-label" htmlFor="jabatan_guru">
                Jabatan
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
    </div>
  );
}

export default UpdateGuru;
