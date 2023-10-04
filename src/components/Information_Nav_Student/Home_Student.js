import React, { useEffect, useState } from "react";
import "./Home_Student.scss";
import { FiSearch } from "react-icons/fi";
function Home_Student() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFilterData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const handleFilter = (value) => {
    const res = filterData.filter((f) => f.name.toLowerCase().includes(value));
    setData(res);
  };
  return (
    <div className="search-container">
    <div className="search-bar">
      <div className="search"></div>
      <FiSearch />
      <input
        type="text"
        className="search-text"
        placeholder="Search lecture by name, email"
        onChange={(e) => handleFilter(e.target.value)}
      />

      <button type="submit" className="search-submit">
        Search
      </button>

      <div className="search-result">
        {data.map((d, i) => (
          <div className="search-now" key={i}>{d.name}</div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home_Student;
