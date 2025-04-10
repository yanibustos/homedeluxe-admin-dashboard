import { Link } from "react-router-dom";
import "./Admin.css";
import { useEffect, useState } from "react";
import RemoveModal from "../../components/Modals/RemoveModal";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import fetchApi from "../../../api/fetchApi";

// const users = [
//   {
//     id: 1,
//     firstname: "admin",
//     lastname: "admin",
//     email: "admin@homedeluxe.com",
//     avatar: "/img/avatar.png",
//     role: 300,
//   },
//   {
//     id: 2,
//     firstname: "Yanina",
//     lastname: "Bustos",
//     email: "ybustos@homedeluxe.com",
//     avatar: "/img/avatar.png",
//   },
//   {
//     id: 3,
//     firstname: "Darlen",
//     lastname: "Hornia",
//     email: "dhornia@homedeluxe.com",
//     avatar: "/img/avatar.png",
//   },
//   {
//     id: 4,
//     firstname: "Cristofer",
//     lastname: "Fernández",
//     email: "cfernandez@homedeluxe.com",
//     avatar: "/img/avatar.png",
//   },
// ];

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRemove, setShowRemove] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = (user) => {
    setSelectedUser(user);
    setShowRemove(true);
  };

  const handleRemoveUser = async (userId) => {
    try {
      await fetchApi({ method: "delete", url: `/admin/${userId}` });
      toast.success("User deleted successfully.");
      getAdmins();
    } catch (err) {
      toast.error("Failed to delete user.");
    } finally {
      handleCloseRemove();
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const response = await fetchApi({
        method: "get",
        url: "/admin",
      });

      if (response && response.admins) {
        setAdmins(response.admins);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load admin users.");
    } finally {
      setLoading(false);
    }
  };

  // Loading indicator
  if (loading) {
    return <Loading />;
  }

  // Error message
  if (error) {
    return (
      <div className="text-center text-danger alert alert-danger">
        <span>Something went wrong, please try again.</span>
      </div>
    );
  }

  // No products available
  if (admins.length === 0) {
    return (
      <div className="text-center">
        <span>No admin users available.</span>
      </div>
    );
  }

  return (
    <div className="admin-container container-fluid">
      <div className="admin-header d-flex justify-content-between align-items-center mb-3">
        <span className="fs-5 text-uppercase fw-semibold">Admin</span>
        <Link
          to={"/admin/admin/create"}
          className="btn btn-dark table-text fw-semibold"
        >
          New User
        </Link>
      </div>
      <table className="table table-hover text-center align-middles rounded rounded-3 overflow-hidden shadow-sm table-text">
        <thead className="table-header">
          <tr>
            <th scope="col">Id</th>
            <th scope="col" className="text-start">
              Firstname
            </th>
            <th scope="col" className="text-start">
              Lastname
            </th>
            <th scope="col" className="text-start">
              Email
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td className="text-start">{user.firstname} </td>

              <td className="text-start">{user.lastname}</td>
              <td className="text-start">{user.email}</td>
              <td>
                <div className="d-flex justify-content-center gap-3 align-items-center admin-actions">
                  <Link to={`/admin/admin/${user.id}`}>
                    <i className="bi bi-pencil-square fs-6 edit-icon text-primary"></i>
                  </Link>
                  <i
                    className="bi bi-trash3-fill fs-6 delete-icon text-danger"
                    onClick={() => handleShowRemove(user)}
                  ></i>
                  {showRemove && selectedUser && (
                    <RemoveModal
                      show={showRemove}
                      handleClose={handleCloseRemove}
                      item={`${selectedUser.firstname} ${selectedUser.lastname}`}
                      handleOnClick={() => handleRemoveUser(selectedUser.id)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
