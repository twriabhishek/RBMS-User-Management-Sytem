import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";

const TabnavBar = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Remove login details from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    toast.success("Logout Successfully!");
    // Redirect to login page or perform any other action
    setTimeout(() => {
      navigate("/login");
    }, 400);
  };
  const roles = localStorage.getItem("roles");
  

  return (
    <div>
      <section
        id="container"
        className={`${isSidebarOpen ? "open-right-bar" : ""}`}
      >
        <header className="header fixed-top clearfix">
          <div className="brand">
            <a href="/" className="logo">
              <img
                src={`${process.env.PUBLIC_URL}/images/logoExato.png`}
                alt="Exato"
                width="160"
              />
            </a>
            <div className="sidebar-toggle-box" onClick={toggleSidebar}>
              <div className="fa fa-bars"></div>
            </div>
          </div>
          <div className="top-nav clearfix">
            <ul className="nav pull-right top-menu">
              <li className="dropdown">
                <a
                  data-bs-toggle="dropdown"
                  className="dropdown-toggle"
                  href="#"
                >
                  <img alt="" src={`${process.env.PUBLIC_URL}/images/2.png`} />
                </a>
                <ul className="dropdown-menu extended logout">
                  <li>
                    <Link className="active" to="/login/navbar/profile">
                      <i className="fa fa-suitcase"></i>
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="active">
                      <i
                        className="fa fa-business-time"
                        onClick={handleLogout}
                      ></i>
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </header>

        <aside>
          <div
            id="sidebar"
            className={`nav-collapse ${isSidebarOpen ? "" : "hide-left-bar"}`}
          >
            <div className="leftside-navigation">
              <ul className="sidebar-menu" id="nav-accordion">
                <li>
                  <Link to="products/product">Product</Link>
                </li>
                {roles==="Admin" && (<li>
                  <Link to="users/userTable">Users</Link>
                </li>)}
                <li>
                  <a
                    className="active"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <section
          id="main-content"
          className={isSidebarOpen ? "" : "merge-left"}
        >
          <Outlet />
          <div class="footer">
            <div class="wthree-copyright">
              <p>© 2024 Exato Technologies. All rights reserved.</p>
            </div>
          </div>
        </section>
      </section>
      <Toaster />
    </div>
  );
};

export default TabnavBar;