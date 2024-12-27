import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountriesRdx,
  addCountryRdx,
  updateCountryRdx,
  deleteCountryRdx,
} from "../../store/actions/countryActions.js";
import CountryTable from "./CountryTable";
import CountryForm from "./CountryForm";

const Country = () => {
  const dispatch = useDispatch();
  const { countries, countryLoading, countryError } = useSelector(
    (state) => state.country
  );
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addCountry, setAddCountry] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [updateCountry, setUpdateCountry] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  // Extract role from local storage
  const role = localStorage.getItem("roles");

  useEffect(() => {
    dispatch(fetchCountriesRdx());
  }, [dispatch]);

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddCountry((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateCountry((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      !addCountry.name ||
      !addCountry.description ||
      !addCountry.price ||
      !addCountry.category
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(addCountryRdx(addCountry));
    setAddCountry({ name: "", description: "", price: "", category: "" });
    setIsModalOpenCreate(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      !updateCountry.name ||
      !updateCountry.description ||
      !updateCountry.price ||
      !updateCountry.category
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    dispatch(updateCountryRdx(updateCountry));
    setUpdateCountry({ name: "", description: "", price: "", category: "" });
    setIsModalOpenUpdate(false);
  };

  const openCreateModal = () => setIsModalOpenCreate(true);
  const closeCreateModal = () => setIsModalOpenCreate(false);
  const openUpdateModal = (data) => {
    setUpdateCountry(data);
    setIsModalOpenUpdate(true);
  };
  const closeUpdateModal = () => setIsModalOpenUpdate(false);

  const handleDelete = async (data) => {
    dispatch(deleteCountryRdx(data._id));
  };

  return (
    <>
      <div>
        <section className="wrapper">
          {role === "Admin" && (
            <section
              className="common-section contact-section text-white"
              id="Country"
            >
              <div className="container text-end common-title fw-bold">
                <h2 className="common-heading text-white">
                  Product Creation{" "}
                  <span
                    className="fs-2"
                    onClick={openCreateModal}
                    style={{ cursor: "pointer" }}
                  >
                    <IoMdAddCircleOutline />
                  </span>
                </h2>
              </div>
            </section>
          )}
        </section>

        <CountryTable
          countries={countries}
          countryLoading={countryLoading}
          handleUpdate={role === "Supervisor" ? openUpdateModal : null}
          handleDelete={role === "Admin" ? handleDelete : null}
        />
      </div>

      {isModalOpenCreate && role === "Admin" && (
        <CountryForm
          country={addCountry}
          handleChange={handleChangeAdd}
          handleSubmit={handleAdd}
          handleClose={closeCreateModal}
          title="Create Country"
        />
      )}

      {isModalOpenUpdate && role === "Supervisor" && (
        <CountryForm
          country={updateCountry}
          handleChange={handleChangeUpdate}
          handleSubmit={handleUpdate}
          handleClose={closeUpdateModal}
          title="Update Country"
        />
      )}

      <Toaster />
    </>
  );
};

export default Country;
