import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UpdateSiswa(props) {
  const [siswa, setSiswa] = useState({
    nama_siswa: '',
    nisn: '',
    alamat: '',
    umur: ''
  });

  useEffect(() => {
    const getSiswaById = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/data_siswa/${props.match.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSiswa(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getSiswaById();
  }, [props.match.params.id]);

  const updateSiswa = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/data_siswa/${props.match.params.id}`, siswa, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'Data siswa berhasil diperbarui',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/data_siswa';
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Update Siswa</h3>
          <form onSubmit={updateSiswa}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={siswa.nama_siswa}
                    onChange={(e) => setSiswa({ ...siswa, nama_siswa: e.target.value })}
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
                    value={siswa.nisn}
                    onChange={(e) => setSiswa({ ...siswa, nisn: e.target.value })}
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
                value={siswa.alamat}
                onChange={(e) => setSiswa({ ...siswa, alamat: e.target.value })}
              />
              <label className="form-label" htmlFor="form3Example3">
                Alamat
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                className="form-control"
                value={siswa.umur}
                onChange={(e) => setSiswa({ ...siswa, umur: e.target.value })}
              />
              <label className="form-label" htmlFor="form3Example4">
                Umur
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

export default UpdateSiswa;
