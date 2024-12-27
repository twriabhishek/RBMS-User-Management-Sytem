import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password strength regular expression
  const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(endpoints.getProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const data = await response.data;
      setEmployeeProfile(data.user);
      setEditData({ name: data.user.name, email: data.user.email });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if(!editData.name.trim() || !editData.email.trim()){
      toast.error("All Fields required");
      return
    }
    try {
      const token = localStorage.getItem("token");
      let response = await axios.put(
        endpoints.updateProfile,
        { name: editData.name, email: editData.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchDetails();
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordData.newPassword.trim() || !passwordData.confirmPassword.trim() || !passwordData.oldPassword.trim()) {
      toast.error("All Fields required");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (!passwordStrengthRegex.test(passwordData.newPassword)) {
      toast.error("Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        endpoints.updatePassword,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <section className="wrapper">
        <section
          className="common-section contact-section text-white"
          id="Country"
        >
          <div className="container text-center common-title fw-bold">
            <h2 className="common-heading text-white">User Profile </h2>
            <hr className="w-25 mx-auto" />
          </div>
        </section>
        <div>
          <div className="row my-4">
            <div className="col-2 text-center mt-4">
              <img
                src={`${process.env.PUBLIC_URL}/images/2.png`}
                alt="Generic placeholder"
                className="img-fluid img-thumbnail mb-2"
                style={{ width: "100px", zIndex: "1" }}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="btn btn-outline-danger mt-2"
                data-bs-toggle="modal"
                data-bs-target="#changePasswordModal"
              >
                Change Password
              </button>
            </div>
            <div className="col-10 text-white">
              <div className="row mb-2">
                <div className="col">
                  <label className="form-label fw-bolder">Name</label>
                  <div>{employeeProfile?.name || ""}</div>
                </div>
                <div className="col">
                  <label className="form-label fw-bolder">Email</label>
                  <div>{employeeProfile?.email || ""}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Profile Modal */}
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProfileModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        aria-labelledby="changePasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changePasswordModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePasswordChange}
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;