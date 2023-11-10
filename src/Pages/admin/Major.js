
import React, { useEffect, useState } from "react";
import Style from "../../assets/style/admin.module.scss"
import { Button, Pagination, Stack, Table } from "react-bootstrap";
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
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export const MajorList = () => {
    const { action } = useParams();
    const [page, setPage] = useState(0)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("majorId")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    useEffect(async () => {
        await axios.get(`/api/v1/admin/majors`,
            {
                params: {
                    pageNo: page,
                    pageSize: pageSize,
                    sortBy: filter,
                    sortDir: sortDir,
                }
            }
        ).then(res => {
            console.log(res)
            setPageContent(res.content)
            setTotalPage(res.totalPage)
        }).catch(error => {
            console.log("Error at getting request:", error)
            toast.error(`${error.message}`, {
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
    }, [page, pageSize, filter, sortDir])

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
                            <option value={"majorId"}>Major's Id</option>
                            <option value={"status"}>Status</option>
                        </select>
                    </div>
                    <div className={Style.create}>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "10px" }} />
                        <span><a href="major/create">CREATE</a></span>
                    </div>
                </Stack>

                {/* Table Header */}
                <Table className={Style.table} striped bordered>
                    <thead>
                        <tr>
                            <th>
                                Major ID
                                <span
                                    style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                    onClick={() => {
                                        setFilter("majorId");
                                        setSortDir(sortDir === "asc" ? "desc" : "asc");
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={sortDir === "asc" ? faArrowUp : faArrowDown}
                                        style={{ color: "#000000" }}
                                    />
                                </span>
                            </th>
                            <th>Major Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pageContent.map((item, index) => (
                            <tr key={index}>
                                <td>{item.majorId}</td>
                                <td>{item.majorName}</td>
                                <td>{item.status}</td>
                                <td>
                                    <span
                                        className={Style.icon}
                                        onClick={() => navigate(`edit/${item.majorId}`, { state: { item } })}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#0071c7" }} />
                                    </span>
                                    <span
                                        className={Style.icon}
                                        id={Style.delete}
                                    >
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#db0000" }} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Pagination */}
                <Pagination
                    style={{ justifyContent: 'center' }}
                    active
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
            <div className={Style.filterContainer}>
                <form id="status" >
                    <p>Status</p>
                    <div>
                        <input name="status" id="all" type="radio" />
                        <label htmlFor="all">All</label><span>25</span>
                    </div>
                    <div>
                        <input name="status" id="open" type="radio" />
                        <label htmlFor="open">Open</label><span>25</span>
                    </div>
                    <div>
                        <input name="status" id="close" type="radio" />
                        <label htmlFor="close">Close</label><span>25</span>
                    </div>
                </form>
            </div>
        </div >
    )
};

export const MajorEdit = ({ props }) => {


    return (
        <div className={Style.container}>
            <ToastContainer />
            <form className={Style.formEdit}>
                <div>
                    <label htmlFor="majorId">Major's Id</label>
                    <input id="majorId" type="text" readOnly />
                </div>
                <div>
                    <label htmlFor="majorName">Major's Name</label>
                    <input id="majorName" type="text" required />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <Stack style={{ flexDirection: 'row', padding: '10px 20px', margin: '0' }}>
                        <input name="status" id="open" type="radio" required /><label htmlFor="open">Open</label>
                        <input name="status" id="close" type="radio" required /><label htmlFor="close">Close</label>
                    </Stack>
                </div>
                <Stack style={{ flexDirection: 'row', padding: '10px 20px', width: '100%' }} gap={3}>
                    <button className={Style.save} type="submit">Save</button>
                    <button className={Style.add} >
                        <a href="">Add subject</a>
                    </button>
                    <button
                        className={`ms-auto ${Style.delete}`}
                        type="submit">Delete</button>
                </Stack>
            </form>


        </div >
    )
}
export const MajorCreate = () => {


    return (
        <div className={Style.container}>
            <ToastContainer />
            <form className={Style.formEdit}>
                <div>
                    <label htmlFor="majorName">Major's Name</label>
                    <input id="majorName" type="text" required />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <Stack style={{ flexDirection: 'row', padding: '10px 20px', margin: '0' }}>
                        <input name="status" id="open" type="radio" required /><label htmlFor="open">Open</label>
                        <input name="status" id="close" type="radio" required /><label htmlFor="close">Close</label>
                    </Stack>
                </div>
                <Stack style={{ flexDirection: 'row', padding: '10px 20px', width: '100%' }} gap={3}>
                    <button className={Style.save} type="submit">Save</button>
                    <button className={Style.add} >
                        <a href="">Add subject</a>
                    </button>
                </Stack>
            </form>


        </div >
    )
}