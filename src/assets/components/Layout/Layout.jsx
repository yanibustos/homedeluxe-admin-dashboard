import React, { useState } from "react";
import { Button, Navbar, Nav, Offcanvas, Dropdown } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "/img/logo-white.png";
import "./Layout.css";

const Layout = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="layout-container d-flex vh-100">
        <div className="d-none d-md-block sidebar-container">
          <div className="sidebar bg-dark h-100">
            <div className="layout-offcanvas-header d-flex align-items-center">
              <Link to={"/"}>
                <img src={logo} alt="Home Deluxe" />
              </Link>
            </div>
            <Nav className="flex-column px-2 py-4 gap-2">
              <Nav.Item>
                <NavLink to="/admin" className="nav-link" end>
                  <i className="bi bi-house-door me-2"></i>Dashboard
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/admin"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-person-gear me-2"></i>Admin
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/users"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-people me-2"></i>Users
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/products"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-bag me-2"></i>Products
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/orders"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-cart me-2"></i>Orders
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/categories"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-tag me-2"></i>Categories
                </NavLink>
              </Nav.Item>
              <Nav.Item className="mt-4 border-top border-secondary">
                <NavLink
                  to="/"
                  className="nav-link mt-4"
                  activeclassname="active"
                >
                  <i className="bi bi-arrow-return-left me-2"></i>
                  Return to home
                </NavLink>
              </Nav.Item>
            </Nav>
          </div>
        </div>

        <div className="bg-dark d-flex flex-column main-container">
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
            <div className="d-flex flex-grow-1 justify-content-between align-items-center container-fluid">
              <Navbar.Brand
                as={Link}
                to={"/admin"}
                className="text-uppercase layout-nav-title"
              >
                Administration Panel
              </Navbar.Brand>
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-avatar"
                  className="p-0 border-0 bg-transparent"
                >
                  <img
                    src="/img/logo-white.png"
                    alt="User Avatar"
                    className="layout-avatar"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item eventKey="1">
                    <Link
                      to={"/account/profile"}
                      className="text-decoration-none text-dark"
                    >
                      My Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">
                    {" "}
                    <Link
                      to={"/admin/logout"}
                      className="text-decoration-none text-dark"
                    >
                      Logout
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar>
          <div className="content bg-light py-4 px-3">
            <Outlet />
          </div>
        </div>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="start"
          data-bs-theme="dark"
        >
          <Offcanvas.Header closeButton className="layout-offcanvas-header">
            <Link to={"/"}>
              <img src={logo} alt="Home Deluxe" />
            </Link>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column px-2 py-4 gap-2">
              <Nav.Item>
                <NavLink to="/admin" className="nav-link" end>
                  <i className="bi bi-house-door me-2"></i>Dashboard
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/admin"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-person-gear me-2"></i>Admin
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/users"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-people me-2"></i>Users
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/products"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-bag me-2"></i>Products
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/orders"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-cart me-2"></i>Orders
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/admin/categories"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="bi bi-tag me-2"></i>Categories
                </NavLink>
              </Nav.Item>
              <Nav.Item className="mt-4 border-top border-secondary">
                <NavLink
                  to="/"
                  className="nav-link mt-4"
                  activeclassname="active"
                >
                  <i className="bi bi-arrow-return-left me-2"></i>
                  Return to home
                </NavLink>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default Layout;
