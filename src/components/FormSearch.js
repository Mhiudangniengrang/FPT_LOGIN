import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../Services/customizeAxios";

const FormSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState("lecturer"); // Corrected the typo in the state name

  const handleSearchLecture = async (e) => {
    e.preventDefault();
    await axios
      .get("/api/v1/student/searching/lecturer", {
        params: {
          name: searchText,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error search" + error);
      });
  };

  const handleSearchSubject = async (e) => {
    e.preventDefault();
    await axios
      .get("/api/v1/student/searching/subject", {
        params: {
          keyword: searchText,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error subject" + error);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (filterData === "lecturer") {
      // Search for lecturer
      handleSearchLecture(e);
    } else if (filterData === "subject") {
      // Search for subject
      handleSearchSubject(e);
    }
  };

  useEffect(() => {
    setSearchText("");
  }, [filterData]);

  return (
    <div
      style={{
        maxWidth: "30vw",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "40px 0",
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
          onChange={(e) => setFilterData(e.target.value)} // Corrected the typo in the event handler
          value={filterData} // Set the selected value of the dropdown
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
        <Button
          variant="secondary"
          type="submit"
          onClick={(e) => handleSearch(e)} // Call the common handler for both lecturer and subject search
        >
          Go
        </Button>
      </form>
    </div>
  );
};

export default FormSearch;
