import React, { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import axios from "axios";
import toast from "react-hot-toast";
import endpoints from "../../ApiEndpoint"; // Make sure this file contains your API endpoints

const User_Demo1 = () => {
  const [users, setUsers] = useState([]); // Store users fetched from the API
  const [countryLoading, setCountryLoading] = useState(true); // Loading state
  const [paginatedUsers, setPaginatedUsers] = useState([]); // For paginated data
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page
  const [modalUser, setModalUser] = useState(null); // To store user details for editing
  const [newRole, setNewRole] = useState(""); // Store the new role for updating

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch users only on component mount

  const fetchUsers = async () => {
    try {
      setCountryLoading(true); // Start loading
      const token = localStorage.getItem("token"); // Get the token
      const response = await axios.get(endpoints.getAllUsers, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      });
      setUsers(response.data.users); // Set users data from the API
      setCountryLoading(false); // Stop loading
      paginateData(response.data.users, currentPage); // Paginate users
    } catch (error) {
      console.error("Error fetching users:", error);
      setCountryLoading(false); // Stop loading on error
      toast.error("Error fetching users"); // Display error notification
    }
  };

  const paginateData = (users, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    setPaginatedUsers(users.slice(startIndex, endIndex)); // Set the users to display for the current page
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${endpoints.deleteUser}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      fetchUsers(); 
    } catch (error) {
      toast.error("Error deleting user"); 
    }
  };

  const handleUpdateRole = async () => {
    try {
      console.log(modalUser);
      
      const token = localStorage.getItem("token");
      console.log(`${endpoints.updateUserRole}/${modalUser._id}`);
      
      const response = await axios.put(
        `${endpoints.updateUserRole}/${modalUser._id}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );
      toast.success(response.data.message); // Success toast
      fetchUsers(); // Refresh user list after role update
      setModalUser(null); // Close the modal
    } catch (error) {
      toast.error("Error updating role"); // Error toast
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
    paginateData(users, page); // Paginate the users based on the current page
  };

  const openEditModal = (user) => {
    setModalUser(user);
    setNewRole(user.role); // Set the role value for editing
  };

  return (
    <div className="wrapper">
      <div className="table-agile-info">
        <div className="panel panel-default">
          <div className="panel-heading">User Table</div>
          <div className="table-responsive">
            <table className="table" width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {countryLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <div className="d-flex">
                          <i
                            className="fa-solid fa-trash me-2"
                            onClick={() => handleDelete(user._id)}
                            style={{ cursor: "pointer", color: "red" }}
                          ></i>
                          <i
                            className="fa-solid fa-edit"
                            onClick={() => openEditModal(user)}
                            style={{ cursor: "pointer", color: "blue" }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <Pagination
              totalItems={users.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Edit Role Modal */}
      {modalUser && (
        <div className="modal show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User Role</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setModalUser(null)} // Close modal
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={modalUser.email}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    className="form-control"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalUser(null)} // Close modal without saving
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateRole} // Save role update
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User_Demo1;