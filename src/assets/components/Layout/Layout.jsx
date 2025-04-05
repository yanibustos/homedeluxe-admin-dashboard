import React, { useState } from "react";
import { Button, Navbar, Nav, Offcanvas } from "react-bootstrap";
import "./Layout.css";
import logo from "/img/favico-logo_movile-white.png";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="layout-container container-fluid">
        <div className="row no-gutters vh-100">
          <div className="d-none d-md-block col-md-3 col-lg-2 p-0">
            <div className="sidebar bg-dark h-100 position-fixed top-0 start-0">
              <div className="layout-offcanvas-header d-flex align-items-center">
                {/* <Link to={"/"}>
                  <img src={logo} alt="homedeluxe logo" />
                </Link> */}
              </div>
              <Nav className="flex-column">
                <Nav.Item>
                  <Link to="/admin" className="nav-link">
                    <i className="bi bi-house-door me-2 fs-4"></i>Dashboard
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin/admin" className="nav-link">
                    <i class="bi bi-person-gear me-2 fs-4"></i>Admin
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin/users" className="nav-link">
                    <i className="bi bi-people me-2 fs-4"></i>Users
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin/products" className="nav-link">
                    <i className="bi bi-bag me-2 fs-4"></i>Products
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin/orders" className="nav-link">
                    <i className="bi bi-cart me-2 fs-4"></i>Orders
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin/categories" className="nav-link">
                    <i className="bi bi-tag me-2 fs-4"></i>Categories
                  </Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          <div className="col-12 col-md-9 col-lg-10 bg-light px-0">
            <Navbar
              bg="dark"
              variant="dark"
              sticky="top"
              className="pe-3 px-md-3"
            >
              <div className=" d-flex justify-content-start gap-3">
                <Button
                  onClick={handleShow}
                  className="d-md-none bg-transparent border-0 mx-3"
                >
                  &#9776;
                </Button>
              </div>
              <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                <Navbar.Brand
                  as={Link}
                  to={"/admin"}
                  className="text-uppercase layout-nav-title"
                >
                  Administration Panel
                </Navbar.Brand>
                <img
                  src="/img/logo-white.png"
                  alt="User Avatar"
                  className="layout-avatar"
                />
              </div>
            </Navbar>
            <div className="content vh-100 bg-success">
              <Outlet />
            </div>
          </div>
        </div>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="start"
          data-bs-theme="dark"
        >
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
      </div>
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
