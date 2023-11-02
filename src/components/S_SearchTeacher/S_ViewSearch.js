import React, { useEffect, useState } from "react";
import { ListGroup, Tab, Tabs } from "react-bootstrap";
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
import RelatedCourse from "../Slot & Course/RealatedCourse";
import Breadcrumbs from "../BreadcrumpCus"
import Style from "../../assets/style/form.module.scss"
import { useData } from "../../context/DataContext";

const path = [
    {
        route: '/student',
        text: 'Home',
    },
    {
        route: '/lecturer/search',
        text: 'Search',
    },
]

const S_ViewSearch = () => {
    const { filter, search } = useParams();
    const [searchSubject, setSearchSubject] = useState([]);
    const [searchLecture, setSearchLecture] = useState([]);
    const history = useHistory();

    const { loginUser } = useData();

    const handleClickSendRequest = (subject) => {
        //axios post
    }

    const handleSearchSubject = async () => {
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
        }
    }, [filter, search]);

    useEffect(() => {
        setSearchSubject([])
        setSearchLecture([])
    }, [filter, search])
    return (
        <S_Layout>
            <Breadcrumbs items={path} />
            <div>
                <FormSearch />
                {filter === "lecturer" && searchLecture.length > 0 && (
                    <div>
                        <p>Search Results: {searchLecture.length} result(s) found</p>
                    </div>
                )}

                {filter === "lecturer" && searchLecture.length > 0 && (
                    <div className={Style.searchContainer}>
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
                                            <div className={Style.teacher}><a
                                                className={Style.teacher}
                                                href={`/student/lecturer/profile/${teacher.lecturerId}`}>
                                                Lecturer: {teacher.lecturerName}
                                            </a></div>
                                            <div className={`mx-4 small ${Style.subject}`}>
                                                <div>Subject: {teacher.subjectId}</div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-end">

                                            <div>
                                                <a href={`/student/lecturer/viewschedule/${teacher.lecturerId}`}>
                                                    <FontAwesomeIcon
                                                        className={`mx-1 my-1 ${Style.icon}`}
                                                        icon={faCalendarDays}
                                                    />{" "}
                                                </a>

                                                <a href={`/student/lecturer/profile/${teacher.lecturerId}`}>
                                                    <FontAwesomeIcon
                                                        className={`mx-2 my-1 ${Style.icon}`}
                                                        icon={faMagnifyingGlass}
                                                    />
                                                </a>
                                            </div>
                                            <div
                                                className={` ${Style.subject}`}
                                                onClick={() => handleClickSendRequest(teacher.subjectName)}
                                            >
                                                Send request: {teacher.subjectId} - {teacher.unique}
                                            </div>
                                        </div>
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
                    <div className={Style.searchContainer}>
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
                                            <div className={Style.subject}
                                                onClick={() => handleClickSendRequest(subject)}
                                            >Subject: {subject.subjectId} - {subject.unique}</div>
                                            <div className={`mx-4 small`}>
                                                <a
                                                    className={Style.teacher}
                                                    href={`/student/lecturer/profile/${subject.lecturerId}`}>
                                                    Lecturer: {subject.lecturerName}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-end">

                                            <div>
                                                <a href={`/student/lecturer/viewschedule/${subject.lecturerId}`}>
                                                    <FontAwesomeIcon
                                                        className={`mx-1 my-1 ${Style.icon}`}
                                                        icon={faCalendarDays}
                                                    />{" "}
                                                </a>

                                                <a href={`/student/lecturer/profile/${subject.lecturerId}`}>
                                                    <FontAwesomeIcon
                                                        className={`mx-2 my-1 ${Style.icon}`}
                                                        icon={faMagnifyingGlass}
                                                    />
                                                </a>
                                            </div>
                                            <div
                                                className={Style.subject}
                                                onClick={() => handleClickSendRequest(subject)}
                                            >
                                                Send request: {subject.subjectId} - {subject.unique}
                                            </div>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </div>
            <Tabs
                activeKey={"related"}
                className="mb-3"
            >
                <Tab eventKey="related" title="Related Courses">
                    <RelatedCourse />
                </Tab>
            </Tabs>
        </S_Layout >
    );
};

export default S_ViewSearch;