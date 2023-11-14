
import React, { useEffect, useMemo, useState } from "react";
import Style from "../../assets/style/admin.module.scss"
import { Button, Pagination, Spinner, Stack, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../Services/customizeAxios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useData } from "../../context/DataContext";

export const SemesterList = () => {
    const { loginUser } = useData()
    const { action } = useParams();
    const [page, setPage] = useState(0)
    const [loading, isLoading] = useState(true)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("semesterId")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [status, setStatus] = useState("")
    const [semester, setSemester] = useState([])
    const [isDelete, setDelete] = useState(false)

    const handleDelete = (item) => {
        axios.put(`/api/v1/semester/admin/${item.semesterId}/admin/${loginUser.userId}/deleting`
        ).then(res => {
            console.log(res)
            toast.success(`Delete successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setDelete(true)
        }).catch(error => {
            console.log("Error at deleting semester", error)
            toast.error(`${error.response != null ? error.response.data.message : error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
    }

    const location = useLocation()
    useEffect(async () => {
        await axios.get(`/api/v1/semester/admin/semesters`,
            {
                params: {
                    pageNo: page,
                    pageSize: pageSize,
                    sortBy: filter,
                    sortDir: sortDir,
                    status: status
                }
            }
        ).then(res => {
            console.log(res)
            setPageContent(res.content)
        }).catch(error => {
            console.log("Error at getting request:", error)
            toast.error(`${error.response != null ? error.response.data.message : error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).finally(() => {
            isLoading(false)
        })
    }, [page, pageSize, filter, sortDir, status, isDelete])

    const handlePageChange = (value) => {
        setPage(value)
    }
    const navigate = useNavigate();
    return (
        <div className={Style.container}>

            <ToastContainer />
            <div className={Style.tableContainer}>
                <Stack direction="horizontal" style={{ marginBottom: "10px" }}>
                    <div>
                        <span style={{ paddingRight: "10px" }}>Rows per page:</span>
                        <select
                            style={{ border: "none" }}
                            onChange={(e) => {
                                setPageSize(e.target.value);
                                setPage(0);
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <div className="ms-auto">
                        <FontAwesomeIcon icon={faFilter} style={{ color: "#000000", paddingRight: "10px" }} />
                        <span style={{ paddingRight: "10px" }}>Filter:</span>
                        <select
                            style={{ border: "none" }}
                            onChange={(e) => setFilter(e.target.value)}
                            value={filter}
                        >
                            <option value={"semesterId"}>Semester's Id</option>
                            <option value={"status"}>Status</option>
                        </select>
                    </div>
                </Stack>

                {/* Table Header */}
                {loading ? (
                    <Spinner style={{ margin: '0 auto' }} />
                ) : (
                    <Table className={Style.table} striped bordered>
                        <thead>
                            <tr>
                                <th>
                                    Semester ID
                                    <span
                                        style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setFilter("semesterId");
                                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                                            setPage(0)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={sortDir === "asc" ? faArrowUp : faArrowDown}
                                            style={{ color: "#000000" }}
                                        />
                                    </span>
                                </th>
                                <th>Semester Name</th>
                                <th>Start date</th>
                                <th>End date</th>
                                <th>Year</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pageContent.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.semesterId}</td>
                                    <td>{item.semesterName}</td>
                                    <td>{item.dateStart}</td>
                                    <td>{item.dateEnd}</td>
                                    <td>{item.year}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <span
                                            className={Style.icon}
                                            onClick={() => navigate(`/admin/semester/edit/${item.semesterId}`, { state: { item } })}
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#0071c7" }} />
                                        </span>

                                        <span
                                            className={Style.icon}
                                            id={Style.delete}
                                            onClick={() => handleDelete(item)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} style={{ color: "#db0000" }} />
                                        </span>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {/* Pagination */}
                <Pagination
                    style={{ justifyContent: 'center' }}

                >
                    <Button
                        variant="link"
                        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                        style={{ marginRight: '10px' }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                    {Array.from({ length: totalPage }).map((_, index) => (
                        <Pagination.Item
                            style={{ width: "fit-content" }}
                            key={index}
                            onClick={() => handlePageChange(index)}
                            active={page === index}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Button
                        variant="link"
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPage - 1))}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </Pagination>
            </div>
        </div >
    )
};