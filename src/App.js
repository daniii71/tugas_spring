// File: App.js

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Register from "./views/Register";
import DataSiswa from "./DataSekolah/TableSiswa";
import DataGuru from "./DataSekolah/TableGuru";
import DataMapel from "./DataSekolah/TableMapel";
import DataKelas from "./DataSekolah/TableKelas";
import Sidebar from "./controllers/Sidebar";
import Dashbord from "./page/Dashbord";
import AddSiswa from "./DataSekolah/AddSiswa";
import AddGuru from "./DataSekolah/AddGuru";
import AddKelas from "./DataSekolah/AddKelas";
import AddMapel from "./DataSekolah/AddMapel";
import UpdateSiswa from "./DataSekolah/UpdateSiswa";
import UpdateGuru from "./DataSekolah/UpdateGuru";
import UpdateMapel from "./DataSekolah/UpdateMapel";
import UpdateKelas from "./DataSekolah/UpdateKelas";
// import "./Sidebar.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/data_siswa" component={DataSiswa} />
          <Route path="/data_guru" component={DataGuru} />
          <Route path="/data_mapel" component={DataMapel} />
          <Route path="/data_kelas" component={DataKelas} />
          {/* tambah */}
          <Route path="/tambah-siswa" component={AddSiswa} />
          <Route path="/tambah-guru" component={AddGuru} />
          <Route path="/tambah-mapel" component={AddMapel} />
          <Route path="/tambah-kelas" component={AddKelas} />
          {/* edit */}
          <Route path="/edit-siswa/:id" component={UpdateSiswa} />
          <Route path="/edit-guru/:id" component={UpdateGuru} />
          <Route path="/edit-mapel/:id" component={UpdateMapel} />
          <Route path="/edit-kelas/:id" component={UpdateKelas} />
          <Route path="/Sidebar" component={Sidebar} />
          {/* <Route path="/update_siswa" component={UpdateSiswa} /> */}
          <Route component={Dashbord} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
