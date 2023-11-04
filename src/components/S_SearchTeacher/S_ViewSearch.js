import React, { useEffect, useState } from "react";
import { Container, Form, ListGroup, Button } from "react-bootstrap";
import axios from "../../Services/customizeAxios";
import S_Layout from "../../Layouts/S_Layout";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormSearch from "../FormSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
const S_ViewSearch = () => {
  const { filter, search } = useParams();
  const [searchText, setSearchText] = useState(search);
  const [searchSubject, setSearchSubject] = useState([]);
  const [searchLecture, setSearchLecture] = useState([]);
  const [filterData, setFilterData] = useState(filter);
  const [isSearching, setIsSearching] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setSearchText(search);
    setSearchSubject([]);
    setSearchLecture([]);
  }, [filterData]);

  const handleSearchSubject = async () => {
    await axios
      .get(`/api/v1/student/searching/subject`, {
        params: {
          keyword: searchText,
        },
      })
      .then((res) => {
        setIsSearching(false);
        res.map((result) => {
          setSearchSubject((prev) => [...prev, result]);
        });
      })
      .catch((error) => {
        setIsSearching(false);
        console.log("error at searchname:" + error);
      });
  };

  const handleSearchLecture = async () => {
    setIsSearching(true);
    await axios
      .get(`/api/v1/student/searching/lecturer`, {
        params: {
          name: searchText,
        },
      })
      .then((res) => {
        setIsSearching(false);
        res.map((result) => {
          setSearchLecture((prev) => [...prev, result]);
        });
      })
      .catch((error) => {
        setIsSearching(false);
        console.log("error at searchname:" + error);
      });
  };

  console.log(search);
  useEffect(() => {
    console.log("useEffect");

    if (search === undefined) {
      history.push(`/student/search`);
    } else {
      if (filter === "lecturer") {
        handleSearchLecture();
      } else if (filterData === "subject") {
        handleSearchSubject();
      }
    }
  }, [filter, search]);

  useEffect(() => {
    setSearchSubject([])
    setSearchLecture([])
  }, [filter, search])
  return (
    <S_Layout>
      <div>
        <FormSearch />
        {filter === "lecturer" && searchLecture.length > 0 && (
          <div>
            <p>Search Results: {searchLecture.length} result(s) found</p>
          </div>
        )}

        {filterData === "lecturer" && searchLecture.length > 0 && (
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
                      <div onClick={handleClickViewProfile}>
                        Teacher: {teacher.lecturerName}
                      </div>
                      <div className="mx-4 small">
                        <div>Subject: {teacher.subjectId}</div>
                      </div>
                    </div>
                    <div className="d-flex">
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
                      />
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}

        {filterData === "subject" && searchSubject.length > 0 && (
          <div>
            <p>Search Results: {searchSubject.length} result(s) found</p>
          </div>
        )}

        {filterData === "subject" && searchSubject.length > 0 && (
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
                    <div className="d-flex">
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
                      />
                    </div>
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
