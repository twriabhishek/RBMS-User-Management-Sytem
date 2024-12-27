import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import { setCurrentPage } from "../../store/actions/paginationActions";

const CountryTable = ({
  countries,
  countryLoading,
  handleUpdate,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const itemsPerPage = 10;

  useEffect(() => {
    // Reset to page 1 when countries change
    dispatch(setCurrentPage(1));
  }, [countries, dispatch]);

  const paginatedCountries = countries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="table-agile-info">
      <div className="panel panel-default">
        <div className="panel-heading">Product Table</div>
        <div className="table-responsive">
          <table className="table" width="100">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                {handleDelete || handleUpdate ? <th>Action</th> : null}
              </tr>
            </thead>
            <tbody>
              {countryLoading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedCountries.length > 0 ? (
                paginatedCountries.map((item) => (
                  <tr key={item.countryId}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    {(handleDelete || handleUpdate) && (
                      <td>
                        <div className="d-flex">
                          {handleUpdate && (
                            <i
                              className="fa-solid fa-pen-to-square me-2"
                              onClick={() => handleUpdate(item)}
                            ></i>
                          )}
                          {handleDelete && (
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => handleDelete(item)}
                            ></i>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Product found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination
            totalItems={countries.length > 0 ? countries.length : 0}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CountryTable;
