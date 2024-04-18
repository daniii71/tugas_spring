import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';

import Sidebar from '../controllers/Sidebar';
import Swal from 'sweetalert2';


function DataKelas() {
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/kelas_siswa`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setKelas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteKelas = async (id) => {
    const token = localStorage.getItem('token');

    await Swal.fire({
      title: 'Anda yakin?',
      text: 'Yakin ingin menghapus data kelas ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/kelas_siswa/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Berhasil Menghapus!!',
              showConfirmButton: false,
              timer: 1500
            });
            setKelas(kelas.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      }
    });
  };

  const handleTambahKelas = () => {
    window.location.href = '/tambah-kelas';
  };

  return (
    <div className="container mt-5">
      <div className="row">
      <div className="col-md-3 col-12">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4>Table Kelas</h4>
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-sm" onClick={handleTambahKelas}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="text-center">No</th>
                      <th>Nama Kelas</th>
                      <th>Nama Jurusan</th>
                      <th>Wali Kelas</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kelas.map((kelasData, index) => (
                      <tr key={kelasData.id}>
                        <td className="text-center">{index + 1}</td>
                        <td>{kelasData.nama_Kelas}</td>
                        <td>{kelasData.nama_jurusan}</td>
                        <td>{kelasData.wali_kelas}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <button 
                              className="btn btn-primary me-2" 
                              onClick={() => {
                                window.location.href = `/edit-kelas/${kelasData.id}`;
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button 
                              className="btn btn-danger" 
                              onClick={() => deleteKelas(kelasData.id)}
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

export default DataKelas;
