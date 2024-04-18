import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Username dan password harus diisi.");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      Swal.fire({
        icon: "error",
        title:
          "Password harus memiliki minimal 8 karakter, satu huruf besar, dan satu huruf kecil.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const response = await axios.post(`
      http://localhost:8080/register`, {
        username,
        password,
        role,
      });

      if (response.data === "Username already taken") {
        Swal.fire({
          icon: "error",
          title: "Username sudah terdaftar. Pilih username lain.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil Register",
          showConfirmButton: false,
          timer: 1500,
        });
        // Redirecting user to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setShow(false);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan saat mendaftar. Coba lagi nanti.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div id="main-wrapper" className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card-group mb-5">
            <div className="card p-2">
              <div className="card-body">
                <h1>Register</h1>
                <p className="text-muted">Sign In to your account</p>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <span className="input-group-addon">
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                  <div className="row">
                    <div className="col-6">
                      <button
                        type="submit"
                        className="btn btn-outline-primary px-4"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="card bg-info py-5 d-md-down-none"
              style={{ width: "100%" }}
            >
              <div className="card-body text-center">
                <div className="mt-3 text-left">
                  <h2 style={{ color: "white" }}>Sign up</h2>
                  <p className="mt-3" style={{ color: "white" }}>
                    Silahkan Register dulu dengan masukan username role password
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
