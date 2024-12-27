import { Route, Routes } from "react-router-dom";
import "./css/style.css";
import "./css/style-responsive.css";
import "./css/font-awesome.css";
import "./css/query.css";
import "./App.css";

import TabnavBar from "./components/TabnavBar";
import Login from "./components/login";
import { useEffect, useState } from "react";
import { AuthorizedUser } from "./components/privateroute/PrivateRoute";
import Country from "./components/products/Country.js";
import Profile from "./components/profile/Profile.js";
import User_Demo1 from "./components/user/User_Demo1.js";
import Signup from "./components/signup.js";

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const loginDetailsString = localStorage.getItem("loginDetails");
    const details = JSON.parse(loginDetailsString);
    const pagesFromLocalStorage = details ? details.pages : [];
    setPages(pagesFromLocalStorage);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Signup />} />

        <Route
          path={"/login/navbar/"}
          element={
            <AuthorizedUser>
              <TabnavBar />
            </AuthorizedUser>
          }
        >
          <Route
            path="profile"
            element={
              <AuthorizedUser>
                <Profile />
              </AuthorizedUser>
            }
          />
        </Route>

        {/* Product  */}
        <Route
          path={"/login/navbar"}
          element={
            <AuthorizedUser>
              <TabnavBar />
            </AuthorizedUser>
          }
        >
          <Route path="/login/navbar/products/">
            <Route
              path="product"
              element={
                <AuthorizedUser>
                  <Country />
                </AuthorizedUser>
              }
            />
          </Route>
        </Route>
        {/* Product  */}


        <Route
          path={"/login/navbar"}
          element={
            <AuthorizedUser>
              <TabnavBar />
            </AuthorizedUser>
          }
        >
          <Route path="/login/navbar/users/">
            <Route
              path="userTable"
              element={
                <AuthorizedUser>
                  <User_Demo1 />
                </AuthorizedUser>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
