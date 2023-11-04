import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
const FormSearch = (props) => {
  const { filter, search, onSearch } = props;
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState("lecturer");
  const handleSearch = () => {
    onSearch(filterData, searchText);
  };

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
        >
          <select
            className="form-select pe-0"
            style={{ maxWidth: "150px", marginRight: "10px" }}
            onChange={(e) => setFilterData(e.target.value)}
            value={filter}
          >
            <option value="lecturer">Lecturer</option>
            <option value="subject">Subject</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="me-2 p-1"
            value={search}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="secondary">
            <Link
              to={`/student/${filterData}/${searchText}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Go
            </Link>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormSearch;
