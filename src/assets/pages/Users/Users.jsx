import { useEffect, useState } from "react";
import "./Users.css";
import fetchApi from "../../../api/fetchApi";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import RemoveModal from "../../components/Modals/RemoveModal";

function Users() {
  const [users, setUsers] = useState([]);
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
      await fetchApi({ method: "delete", url: `/users/${userId}` });
      toast.success("User deleted successfully.");
      getUsers();
    } catch (err) {
      toast.error("Failed to delete user.");
    } finally {
      handleCloseRemove();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetchApi({
        method: "get",
        url: "/users",
      });

      if (response && response.users) {
        setUsers(response.users);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load users.");
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
  if (users.length === 0) {
    return (
      <div className="text-center">
        <span>No users available.</span>
      </div>
    );
  }

  return (
    <div className="users-container container-fluid">
      <div className="users-header d-flex justify-content-between align-items-center mb-3">
        <span className="fs-5 text-uppercase fw-semibold">Users</span>
      </div>
      <table className="table table-hover text-center align-middles rounded rounded-3 overflow-hidden shadow-sm table-text">
        <thead className="table-header table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstname} {user.lastname}
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <div className="d-flex justify-content-center gap-3 align-items-center users-actions">
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

export default Users;
