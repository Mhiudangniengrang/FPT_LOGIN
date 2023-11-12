import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export const UserList = () => {
    const [page, setPage] = useState(0)
    const [loading, isLoading] = useState(true)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("userId")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [status, setStatus] = useState("")
    const [numberAll, setNumberAll] = useState(0)
    const [numberStatus, setNumberStatus] = useState({ totalOPEN: 0, totalCLOSE: 0 });
    const [isDelete, setDelete] = useState(false)

    const handleDelete = (item) => {
        axios.put(`/api/v1/admin/${item.userId}?status=CLOSED`
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
        await axios.get(`/api/v1/admin/user`,
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
            console.log(res.content)
            setPageContent(res.content)
            setTotalPage(res.totalPage)
            setNumberStatus({
                totalOPEN: res.totalOPEN,
                totalCLOSE: res.totalCLOSE,
            });
            if (status === "") {
                setNumberAll(res.totalElement)
            }
        }).catch(error => {
            console.log("Error at getting user:", error)
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
                            <option value={"userId"}>User's Id</option>
                            <option value={"role"}>Role</option>
                            <option value={"absentCount"}>Absent</option>
                            <option value={"status"}>Status</option>
                        </select>

                    </div>
                </Stack>
                {loading ? (
                    <Spinner style={{ margin: '30px auto' }} />
                ) : (
                    <Table className={Style.table} striped bordered>
                        <thead>
                            <tr>
                                <th>
                                    User ID
                                    <span
                                        style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setFilter("userId");
                                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                                            setPage(0);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={sortDir === "asc" ? faArrowUp : faArrowDown}
                                            style={{ color: "#000000" }}
                                        />
                                    </span>
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Unique</th>
                                <th>Role</th>
                                <th>Absent</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pageContent.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.userId}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.unique}</td>
                                    <td>{item.roleId}</td>
                                    <td>{item.absentCount}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <span
                                            className={Style.icon}
                                            onClick={() => navigate(`edit/${item.userId}`, { state: { item } })}
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
                    <div
                        onChange={() => handleRadioChange('')}
                    >
                        <input name="status" id="all" type="radio" />
                        <label htmlFor="all">All</label>
                        {loading ? (<span><Spinner style={{ width: '20px', height: '20px' }} /></span>) : (<span>
                            {numberAll}
                        </span>)}
                    </div>
                    <div

                        onChange={() => handleRadioChange('OPEN')}
                    >
                        <input name="status" id="open" type="radio" />
                        <label htmlFor="open">Open</label>
                        {loading ? (<span><Spinner style={{ width: '20px', height: '20px' }} /></span>) : (<span>
                            {numberStatus.totalOPEN}
                        </span>)}
                    </div>
                    <div

                        onChange={() => handleRadioChange('CLOSED')}
                    >
                        <input name="status" id="close" type="radio" />
                        <label htmlFor="close">Close</label>
                        {loading ? (<span><Spinner style={{ width: '20px', height: '20px' }} /></span>) : (<span>
                            {numberStatus.totalCLOSE}
                        </span>)}
                    </div>
                    <div
                        onChange={() => handleRadioChange('BANNED')}
                    >
                        <input name="status" id="banned" type="radio" />
                        <label htmlFor="banned">Banned</label>
                        {loading ? (<span><Spinner style={{ width: '20px', height: '20px' }} /></span>) : (<span>
                            {numberAll - numberStatus.totalOPEN - numberStatus.totalCLOSE}
                        </span>)}
                    </div>
                </form>
            </div>
        </div >
    )
};

export const UserEdit = () => {
    const { id } = useParams();
    const [loading, isLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [saving, isSaving] = useState(false)
    const handleRadioChange = (newStatus) => {
        setStatus(newStatus);
    };

    const [status, setStatus] = useState("")
    useEffect(() => {
        axios
            .get(`/api/v1/admin/profile/${id}`)
            .then(res => {
                console.log(res)
                setUser(res)
                setStatus(res.status)
            }).catch(error => {
                console.log("Error at getting user:", error)
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
            }).finally(() => {
                isLoading(false)
            })
    }, [])

    const handleSave = (e) => {
        isSaving(true)
        e.preventDefault()
        console.log(status)
        axios.put(`/api/v1/admin/${id}?status=${status}`).then(res => {
            console.log(res)
            toast.success(`Save successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(error => {
            console.log("Error at saving user", error)
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
            isSaving(false)
        })
    }
    const navigate = useNavigate();
    return (
        <div className={Style.container}>
            {console.log(saving)}
            <ToastContainer />
            {loading ? (
                <Spinner style={{ margin: '50px auto' }} />
            ) : (
                <form className={Style.formEdit}>

                    <h3>User's Profile</h3>
                    <div>
                        <label htmlFor="majorId">User's Id</label>
                        <input id="majorId" type="text" value={user.userId} readOnly />
                    </div>
                    <div>
                        <label htmlFor="majorName">User's Name</label>
                        <input id="majorName" type="text" value={user.userName} readOnly />
                    </div>
                    <div>
                        <label htmlFor="majorName">Email</label>
                        <input id="majorName" type="text" value={user.email} readOnly />
                    </div>
                    <div>
                        <label htmlFor="majorName">unique</label>
                        <input id="majorName" type="text" value={user.unique} readOnly />
                    </div>
                    <div>
                        <label htmlFor="status">Status</label>
                        <Stack style={{ flexDirection: 'row', padding: '10px 20px', margin: '0', justifyContent: 'center' }}>
                            <div
                                style={{ margin: '0' }}
                            >
                                <input name="status" id="open" type="radio" checked={status === "OPEN" ? true : false}
                                    onClick={() => handleRadioChange('OPEN')} />
                                <label htmlFor="open" style={{ textAlign: 'center' }}>Open</label>

                            </div>
                            <div
                                style={{ margin: '0' }}
                            >
                                <input name="status" id="closed" type="radio" checked={status === "CLOSED" ? true : false}
                                    onClick={() => handleRadioChange('CLOSED')} />
                                <label htmlFor="closed" style={{ textAlign: 'center' }}>Closed</label>
                            </div>
                        </Stack>
                    </div>
                    <Stack style={{ flexDirection: 'row', padding: '10px 20px', width: '100%' }} gap={3}>
                        <button className={Style.save}
                            type="submit"
                            onClick={(e) => handleSave(e)}
                            style={{
                                maxWidth: '100px'
                            }}
                        >
                            {!saving ? "Save" : "Saving..."}
                        </button>
                        <button
                            className={`ms-auto ${Style.back}`}
                            type="submit" onClick={() => navigate("/admin/user")}
                        >Back</button>
                    </Stack>
                </form>
            )}
        </div >
    )
}

export const SubjectLecturerList = ({ lecturers }) => {

    return (
        <div className={Style.container}>
            <ToastContainer />
            <div className={Style.tableContainer}>

                <Table className={Style.table} striped bordered>
                    <thead>
                        <tr>
                            <th>
                                Lecturer's ID
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Unique</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lecturers.map((item, index) => (
                            <tr key={index}>
                                <td>{item.userId}</td>
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>{item.unique}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div >
    )
};