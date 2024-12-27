import React from "react";

const CountryForm = ({ country, handleChange, handleSubmit, handleClose, title }) => {
  return (
    <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="modal-content w-50 p-3">
        <div className="row">
          <div className="container text-center common-title fw-bold col-11">
            <h2 className="common-heading mb-3">{title}</h2>
          </div>
          <div className="col-1">
            <i
              className="fa-solid fa-xmark mt-3 me-3 close"
              onClick={handleClose}
            ></i>
          </div>
        </div>
        <div className="row h-75">
          <div className="container">
            <div className="form-section d-flex justify-content-start w-100">
              <div className="container">
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Product Name"
                      value={country.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Enter Description"
                      value={country.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="Enter Price"
                      value={country.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      placeholder="Enter Category"
                      value={country.category}
                      onChange={handleChange}
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="text-center mb-3 d-flex justify-content-center">
              <button className="btn btn-primary me-3" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-danger me-3" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryForm;