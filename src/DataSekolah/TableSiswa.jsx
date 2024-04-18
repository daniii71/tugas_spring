import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Sidebar from '../controllers/Sidebar';

function DataSiswa() {
  const [siswa, setSiswa] = useState([]);

  const getAllSiswa = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`http://localhost:8080/api/data_siswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSiswa(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteSiswa = async (id) => {
    const token = localStorage.getItem('token');

    await Swal.fire({
      title: 'Anda yakin?',
      text: 'Yakin ingin menghapus data siswa ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/data_siswa/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Berhasil Menghapus!!',
              showConfirmButton: false,
              timer: 1500,
            });
            getAllSiswa();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      }
    });
  };

  useEffect(() => {
    getAllSiswa();
  }, []);

  const handleTambahSiswa = () => {
    window.location.href = '/tambah-siswa';
  };

  const handleEditSiswa = (id) => {
    window.location.href = `/edit-siswa/${id}`;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 col-12">
          <Sidebar/>
        </div>
        <div className="col-md-9 col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4>Table Siswa</h4>
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-sm" onClick={handleTambahSiswa}>
                  <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="text-center">No</th>
                      <th>Nama Siswa</th>
                      <th>NISN</th>
                      <th>Alamat</th>
                      <th>Umur</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswa.map((siswaData, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{siswaData.nama_siswa}</td>
                        <td>{siswaData.nisn}</td>
                        <td>{siswaData.alamat}</td>
                        <td>{siswaData.umur}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <button 
                              className="btn btn-primary me-2" 
                              onClick={() => handleEditSiswa(siswaData.id)}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button 
                              className="btn btn-danger" 
                              onClick={() => deleteSiswa(siswaData.id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataSiswa;
