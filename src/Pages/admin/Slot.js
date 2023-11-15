
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

export const SlotList = () => {
    const { loginUser } = useData()
    const { action } = useParams();
    const [page, setPage] = useState(0)
    const [loading, isLoading] = useState(true)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("emptySlotId")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [status, setStatus] = useState("")
    const [numberAll, setNumberAll] = useState(0)
    const [numberOpen, setNumberOpen] = useState(0)
    const [numberBook, setNumberBook] = useState(0)
    const [isDelete, setDelete] = useState(false)

    const handleDelete = (item) => {
        axios.put(`/api/v1/major/admin/${loginUser.userId}`,
            {
                majorId: item.majorId,
                majorName: item.majorName,
                status: "CLOSED",
            }
        ).then(res => {
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
            console.log("Error at saving major", error)
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

    useEffect(async () => {
        await axios.get(`/api/v1/admin/weeklyEmptySlot`,
            {
                params: {
                    pageNo: page,
                    pageSize: pageSize,
                    sortBy: filter,
                    sortDir: sortDir,
                }
            }
        ).then(res => {
            setPageContent(res.content)
            setTotalPage(res.totalPage)
            setNumberOpen(res.totalOPEN)
            setNumberBook(res.totalBOOKED)
            if (status === "") {
                setNumberAll(res.totalElement)
            }
        }).catch(error => {
            console.log("Error at getting slot:", error)
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
    const handleRadioChange = (newStatus) => {
        setStatus(newStatus);
    };

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
                            <option value={"majorId"}>Major's Id</option>
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
                                    Slot ID
                                    <span
                                        style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setFilter("emptySlotId");
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
                                <th>Lecturer Name</th>
                                <th>Slot</th>
                                <th>Student Name</th>
                                <th>Subject</th>
                                <th>Date start</th>
                                <th>Time start</th>
                                <th>Booked date</th>
                                <th>Room</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pageContent.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.emptySlotId}</td>
                                    <td>{item.lecturerName}</td>
                                    <td>{item.slotTimeId}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.subjectId}</td>
                                    <td>{item.dateStart}</td>
                                    <td>{item.timeStart}</td>
                                    <td>{item.bookedDate}</td>
                                    <td>{item.roomId}</td>
                                    <td>{item.description}</td>
                                    <td>{item.status}</td>

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

            {/* Filter Container */}
            {/* <div className={Style.filterContainer}>
                <form id="status">
                    <p>Status</p>
                    <div
                        onChange={() => handleRadioChange('')}
                    >
                        <input name="status" id="all" type="radio" checked={status === "" ? true : false} />
                        <label htmlFor="all">All</label>

                        {loading ? (<span><Spinner style={{ width: '20px', height: '20px' }} /></span>) : (<span>
                            {numberAll}
                        </span>)}
                    </div>
                    <div
                        onChange={() => handleRadioChange('open')}
                    >
                        <input name="status" id="open" type="radio" checked={status === "open" ? true : false} />
                        <label htmlFor="open">Open</label>
                        <span>
                            {loading ? (<span><Spinner style={{ width: '20px', height: '20px' }} /></span>) : (<span>
                                {numberOpen}
                            </span>)}
                        </span>
                    </div>
                    <div
                        onChange={() => handleRadioChange('closed')}
                    >
                        <input name="status" id="closed" type="radio" checked={status === "closed" ? true : false} />
                        <label htmlFor="closed">Closed</label>
                        <span>
                            {loading ? (<span><Spinner style={{ width: '20px', height: '20px' }} /></span>) : (<span>
                                {numberAll - numberOpen}
                            </span>)}
                        </span>
                    </div>
                </form>
            </div> */}
        </div >
    )
};