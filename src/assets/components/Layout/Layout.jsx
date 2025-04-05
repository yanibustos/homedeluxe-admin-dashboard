import React, { useState } from "react";
import { Button, Navbar, Nav, Offcanvas, Container } from "react-bootstrap";
import "./Layout.css";
import logo from "/img/logo-white.png";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const [show, setShow] = useState(false); // State for showing offcanvas

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Top Navbar with Hamburger for Mobile */}
      <Navbar bg="black" variant="dark" sticky="top">
        <Button
          variant="outline-dark"
          onClick={handleShow}
          className="d-md-none"
        >
          &#9776; {/* Hamburger icon */}
        </Button>
        <Navbar.Brand href="#">My App</Navbar.Brand>
      </Navbar>

      {/* Sidebar for Desktop */}
      <div className="sidebar d-none d-md-block">
        <Nav className="flex-column">
          <Nav.Item>
            <Link to="/admin" className="nav-link">
              Dashboard
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/admin" className="nav-link">
              Admin
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/users" className="nav-link">
              Users
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/products" className="nav-link">
              Products
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/orders" className="nav-link">
              Orders
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/categories" className="nav-link">
              Categories
            </Link>
          </Nav.Item>
        </Nav>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item>
              <Link to="/admin" className="nav-link">
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/admin/admin" className="nav-link">
                Admin
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/admin/users" className="nav-link">
                Users
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/admin/products" className="nav-link">
                Products
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/admin/orders" className="nav-link">
                Orders
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/admin/categories" className="nav-link">
                Categories
              </Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Container fluid className="content">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;

// function Layout() {
//   return (
//     <div className="layout-container">
//       <div className="layout-offcanvas pt-3">
//         <div className="layout-offcanvas-header">
//           <a href="/">
//             {" "}
//             <img src={logo} alt="homedeluxe logo" />
//           </a>
//         </div>
//         <div className="d-flex flex-column justify-items-center mt-3">
//           <ul className="list-unstyled text-white d-flex flex-column p-3 gap-3">
//             <li>
//               <a href="/admin" className="text-decoration-none text-white">
//                 <i className="bi bi-house-door me-2 fs-4"></i>Dashboard
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/admin/users"
//                 className="text-white text-decoration-none"
//               >
//                 <i className="bi bi-people me-2 fs-4"></i>User
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/admin/products"
//                 className="text-white text-decoration-none"
//               >
//                 <i className="bi bi-bag me-2 fs-4"></i>Products
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/admin/orders"
//                 className="text-white text-decoration-none"
//               >
//                 <i className="bi bi-cart me-2 fs-4"></i>Orders
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/admin/categories"
//                 className="text-white text-decoration-none"
//               >
//                 <i className="bi bi-tag me-2 fs-4"></i>Categories
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/admin/roles"
//                 className="text-white text-decoration-none"
//               >
//                 <i className="bi bi-person-gear me-2 fs-4"></i>Roles
//               </a>
//             </li>
//           </ul>
//           <div className="">
//             <hr className="text-white" />
//             <a
//               href="/"
//               className="text-white text-decoration-none d-flex align-items-center ps-3 py-2 gap-2"
//             >
//               <i className="bi bi-arrow-return-left fs-4"></i> Return to home
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Layout;
