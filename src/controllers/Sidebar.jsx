import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    Swal.fire({
      title: "Apa anda yakin?",
      text: "Anda akan logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="fs-5">Sidebar</span>
          <button className="btn btn-link btn-sm" onClick={toggleSidebar}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="/data_siswa" className="nav-link text-white">
              <i className="bi bi-person me-3"></i>
              Data Siswa
            </a>
          </li>
          <li className="nav-item">
            <a href="/data_kelas" className="nav-link text-white">
              <i className="bi bi-building me-3"></i>
              Data Kelas
            </a>
          </li>
          <li className="nav-item">
            <a href="/data_mapel" className="nav-link text-white">
              <i className="bi bi-book me-3"></i>
              Data Mapel
            </a>
          </li>
          <li className="nav-item">
            <a href="/data_guru" className="nav-link text-white">
              <i className="bi bi-person-circle me-3"></i>
              Data Guru
            </a>
          </li>
          
        </ul>
        <hr />
        <li className="nav-item">
            <a href="/" className="nav-link text-white" onClick={logout}>
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </a>
          </li>
      </div>
      <button
        className={`sidebar-toggle btn btn-link btn-sm ${
          isOpen ? "open" : ""
        }`}
        onClick={toggleSidebar}
      >
        <i className="bi bi-list"></i>
      </button>
    </div>
  );
}

export default Sidebar;
