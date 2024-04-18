// import React from 'react'; 
// import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap'; 
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import { Link } from 'react-router-dom'; 
// import Swal from "sweetalert2";
  
// function MyNavbar() { 
//   const logout = () => {
//     Swal.fire({
//       title: "Apa anda yakin?",
//       text: "Anda akan logout",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, logout!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.clear();
//         window.location.href = "./login";
//       }
//     });
//   };
 
//   return ( 
//     <Navbar bg="navbar-dark bg-primary" expand="lg" variant="dark"> 
//       <Container> 
//         {/* Tambahkan Image untuk menampilkan logo */} 
//         <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}> 
//           <div style={{ maxWidth: '120px', maxHeight: '120px', marginRight: '5px' }}> 
//             <Image 
//               src="https://play-lh.googleusercontent.com/5XJFE4Q29eCTXlCCgZFP1a1JJNLh1DKofOErww40wcnkSg9XuCH2wvA73RsMAUqlFEU=w600-h300-pc0xffffff-pd" 
//               className="w-8 h-auto rounded-circle" 
//               alt="" 
//               style={{ maxWidth: '100%', height: 'auto' }} 
//             /> 
//           </div> 
//           <span>SEKOLAH KITA</span> 
//         </Navbar.Brand> 
//         <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
//         <Navbar.Collapse id="basic-navbar-nav"> 
//           <Nav className="me-auto"> 
//             <Nav.Link as={Link} to="/login" active> 
//               Login 
//             </Nav.Link> 
//             <Nav.Link as={Link} to="/data_siswa" active>  
//                Siswa 
//             </Nav.Link> 
//             <Nav.Link as={Link} to="/data_guru" active>  
//               Guru 
//             </Nav.Link> 
//             <Nav.Link as={Link} to="/data_mapel" active>  
//               Mapel 
//             </Nav.Link> 
//             <Nav.Link as={Link} to="/data_kelas" active>  
//               Kelas 
//             </Nav.Link> 
//           </Nav> 
//           <Nav> 
//             <Button variant="outline-light" className="ms-3" onClick={logout}>Logout</Button> 
//           </Nav> 
//         </Navbar.Collapse> 
//       </Container> 
//     </Navbar> 
//   ); 
// }; 
 
// export default MyNavbar;
