import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
const FormSearch = () => {
  const { filter, search } = useParams()
  const [searchText, setSearchText] = useState(search);
  const [filterData, setFilterData] = useState("lecturer");
  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/student/search/${filterData}/${searchText}`)
  }
  return (
    <div>
      <div
        style={{
          maxWidth: "30vw",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingBottom: "40px",
        }}
      >
        <label className="pe-2" id="search_label" htmlFor="search">
          Search for:{" "}
        </label>
        <form
          id="search"
          className="form pe-0"
          style={{ display: "flex", flex: "1" }}
          onSubmit={(e) => handleSearch(e)}
        >
          <select
            className="form-select pe-0"
            style={{ minWidth: "100px", maxWidth: "150px", marginRight: "10px" }}
            onChange={(e) => setFilterData(e.target.value)}
            value={filterData}
          >
            <option value="lecturer">Lecturer</option>
            <option value="subject">Subject</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="me-2 p-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="secondary"
            onClick={(e) => handleSearch(e)}
          >
            Go
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormSearch;