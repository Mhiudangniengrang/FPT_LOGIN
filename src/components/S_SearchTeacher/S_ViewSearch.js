import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "../../Services/customizeAxios";
import S_Layout from "../../Layouts/S_Layout";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormSearch from "../FormSearch";
const S_ViewSearch = () => {
  const { filter, search } = useParams();
  const [searchSubject, setSearchSubject] = useState([]);
  const [searchLecture, setSearchLecture] = useState([]);
  const history = useHistory();

  const handleSearchSubject = async () => {
    setIsSearching(true);
    await axios
      .get(`/api/v1/student/searching/subject`, {
        params: {
          keyword: search,
        },
      })
      .then((res) => {
        console.log(res);
        res.map((result) => {
          setSearchSubject((prev) => [...prev, result]);
        });
      })
      .catch((error) => {
        console.log("error at searchname:" + error);
      });
  };

  const handleSearchLecture = async () => {
    await axios
      .get(`/api/v1/student/searching/lecturer`, {
        params: {
          name: search,
        },
      })
      .then((res) => {
        console.log(res);

        res.map((result) => {
          setSearchLecture((prev) => [...prev, result]);
        });
      })
      .catch((error) => {
        console.log("error at searchname:" + error);
      });
  };

  useEffect(() => {
    console.log("useEffect");

    if (search === undefined) {
      history.push(`/student/search`);
    } else {
      if (filter === "lecturer") {
        handleSearchLecture();
      } else if (filter === "subject") {
        handleSearchSubject();
      }
      history.push(`/student/search/${filter}/${search}`);
    }
  }, []);

  return (
    <S_Layout>
      <div>
        {/* <FormSearch filter={filter} search={search} /> */}
        <FormSearch />
        {filter === "lecturer" && searchLecture.length > 0 && (
          <div>
            <p>Search Results: {searchLecture.length} result(s) found</p>
          </div>
        )}

        {filter === "lecturer" && searchLecture.length > 0 && (
          <div>
            <ListGroup>
              {searchLecture.map((teacher, index) => (
                <ListGroup.Item
                  style={{
                    border: "none",
                  }}
                  key={index}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>Teacher: {teacher.lecturerName}</div>
                      <div className="mx-4 small">
                        <div>Subject: {teacher.subjectId}</div>
                      </div>
                    </div>
                    {/* <div className="d-flex">
                      Subject:
                      <FontAwesomeIcon
                        className="mx-1 my-1"
                        icon={faCalendarDays}
                      />{" "}
                      <div
                        onClick={() => handleClickSubject(teacher.subjectName)}
                      >
                        {teacher.subjectName}
                      </div>
                      <FontAwesomeIcon
                        className="mx-2 my-1"
                        icon={faMagnifyingGlass}
                        onClick={handleSearch}
                      />
                    </div> */}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}

        {filter === "subject" && searchSubject.length > 0 && (
          <div>
            <p>Search Results: {searchSubject.length} result(s) found</p>
          </div>
        )}

        {filter === "subject" && searchSubject.length > 0 && (
          <div>
            <ListGroup>
              {searchSubject.map((subject, index) => (
                <ListGroup.Item
                  style={{
                    border: "none",
                  }}
                  key={index}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>Subject: {subject.subjectId}</div>
                      <div className="mx-4 small">
                        Teacher: {subject.lecturerName}
                      </div>
                    </div>
                    {/* <div className="d-flex">
                      Subject:
                      <FontAwesomeIcon
                        className="mx-1 my-1"
                        icon={faCalendarDays}
                      />{" "}
                      <div
                        onClick={() => handleClickSubject(subject.subjectName)}
                      >
                        {subject.subjectName}
                      </div>
                      <FontAwesomeIcon
                        className="mx-2 my-1"
                        icon={faMagnifyingGlass}
                        onClick={handleSearch}
                      />
                    </div> */}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </div>
    </S_Layout>
  );
};

export default S_ViewSearch;
