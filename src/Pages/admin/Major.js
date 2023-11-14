
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
import { MajorSubjectList } from "./Subject";
export const MajorList = () => {
    const { loginUser } = useData()
    const { action } = useParams();
    const [page, setPage] = useState(0)
    const [loading, isLoading] = useState(true)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("majorId")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [status, setStatus] = useState("")
    const [numberAll, setNumberAll] = useState(0)
    const [numberOpen, setNumberOpen] = useState(0)
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

    const location = useLocation()
    useEffect(async () => {
        await axios.get(`/api/v1/major/admin/majors`,
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
            setPageContent(res.content)
            setTotalPage(res.totalPage)
            setNumberOpen(res.count)
            if (status === "") {
                setNumberAll(res.totalElement)
            }
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

    useEffect(() => {
        console.log("number")

        axios.get(`/api/v1/major/admin/majors`, {
            params: {
                status: "open"
            }
        }).then(res => {
            setNumberOpen(res.totalElement)
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
        });

    }, [])

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
                    <div className={Style.create}>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "10px" }} />
                        <span><a href="major/create">CREATE</a></span>
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
                                    Major ID
                                    <span
                                        style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setFilter("majorId");
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
                                            onClick={() => navigate(`/admin/major/edit/${item.majorId}`, { state: { item } })}
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

            {/* Filter Container */}
            <div className={Style.filterContainer}>
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
            </div>
        </div >
    )
};

// chua xong
export const MajorEdit = () => {
    const { loginUser } = useData();
    const { id } = useParams();
    const [major, setMajor] = useState({})
    const [name, setName] = useState("")
    const [loading, isLoading] = useState(true)
    const [saving, isSaving] = useState(false)
    const handleRadioChange = (newStatus) => {
        console.log(newStatus)
        setStatus(newStatus);
    };

    const [status, setStatus] = useState("")
    useEffect(() => {
        axios
            .get(`/api/v1/major/admin/major/${id}`)
            .then(res => {
                setMajor(res)
                setName(res.majorName)
                setStatus(res.status)
            }).catch(error => {
                console.log("Error at getting major:", error)
                toast.error(`${error.response.data.message}`, {
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
        axios.put(`/api/v1/major/admin/${loginUser.userId}`,
            {
                majorId: major.majorId,
                majorName: name,
                status: status,
            }
        ).then(res => {
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
            console.log("Error at saving major", error)
            toast.error(`${error.response.data.message}`, {
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
                <Stack direction="horizontal" style={{ width: '100%', alignItems: 'flex-start' }}>
                    <form className={Style.formEdit} style={{ maxWidth: '300px', alignItems: 'center' }}>

                        <h3>Edit major</h3>
                        <div>
                            <label htmlFor="majorId">Major's Id</label>
                            <input id="majorId" type="text" value={major.majorId} readOnly />
                        </div>
                        <div>
                            <label htmlFor="majorName">Major's Name</label>
                            <input id="majorName" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
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
                                type="submit" onClick={() => navigate("/admin/major")}
                            >Back</button>
                        </Stack>
                    </form>
                    <div className="ms-auto me-5" >
                        <MajorSubjectList />
                    </div>
                </Stack>
            )}
        </div >
    )
}

export const MajorCreate = () => {
    const { loginUser } = useData();
    const [name, setName] = useState("")
    const [saving, isSaving] = useState(false)

    const navigate = useNavigate();
    const handleSave = (e) => {
        isSaving(true)
        e.preventDefault()
        axios.post(`/api/v1/major/admin/${loginUser.userId}?majorName=${name}`
        ).then(res => {
            console.log(res)
            toast.success(`Add successfully`, {
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
            console.log("Error at saving major", error)
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
            isSaving(false)
        })
    }
    return (
        <div className={Style.container}>
            {console.log(saving)}
            <ToastContainer />

            <form className={Style.formEdit}>
                <h3>Create major</h3>
                <div>
                    <label htmlFor="majorName">Major's Name</label>
                    <input id="majorName" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <Stack style={{ flexDirection: 'row', padding: '10px 20px', width: '100%' }} gap={3}>
                    <button className={Style.save}
                        type="submit"
                        onClick={(e) => handleSave(e)}
                        style={{
                            maxWidth: '100px'
                        }}
                    >
                        {!saving ? "Create" : "Creating..."}
                    </button>
                    <button
                        className={`ms-auto ${Style.back}`}
                        type="submit" onClick={() => navigate("/admin/major")}
                    >Back</button>
                </Stack>
            </form>
        </div >
    )
}

export const SubjectMajorList = ({ ChooseMajor }) => {
    const [page, setPage] = useState(0)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("majorId")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [selectedMajor, setSelectedMajor] = useState([])
    console.log(selectedMajor)

    useEffect(async () => {
        const id = toast.loading('Please wait...')
        await axios.get(`/api/v1/major/admin/majors`,
            {
                params: {
                    pageNo: page,
                    pageSize: pageSize,
                    sortBy: filter,
                    sortDir: sortDir,
                    status: ""
                }
            }
        ).then(res => {
            setPageContent(res.content)
            setTotalPage(res.totalPage)
            toast.update(id, { render: "Get major complete", type: "success", isLoading: false, autoClose: true });

        }).catch(error => {
            toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });
            console.log("Error at getting request:", error)
        })
    }, [page, pageSize, filter, sortDir])

    const handlePageChange = (value) => {
        setPage(value)
    }
    const handleChooseSubject = (item) => {
        if (!selectedMajor.some(
            (selected) => selected.majorId === item.majorId
        )) {
            setSelectedMajor(prev => [
                ...prev,
                {
                    majorId: item.majorId,
                }
            ])
            ChooseMajor(item)
        } else {
            setSelectedMajor(selectedMajor.filter(
                (selected) => selected.majorId !== item.majorId
            ))
            ChooseMajor(item)
        }

    }

    const checkChosen = (item) => {

        return selectedMajor.some(
            (selected) =>
                selected.majorId === item.majorId
        )

    }

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
                    <div className={Style.create}
                        onClick={() => {
                            setSelectedMajor([]),
                                ChooseMajor(null)
                        }}
                    >
                        <span><a>Clear</a></span>
                    </div>
                </Stack>


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
                                        setPage(1)
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
                            <tr key={index}
                                className={checkChosen(item) ? Style.active : ""}>
                                <td>{item.majorId}</td>
                                <td>{item.majorName}</td>
                                <td>{item.status}</td>
                                <td>
                                    <span
                                        className={Style.icon}
                                        onClick={() => handleChooseSubject(item)}
                                    >
                                        {!checkChosen(item) ? (
                                            <FontAwesomeIcon icon={faPlus} style={{ color: "#0071c7" }} />
                                        ) : (
                                            <FontAwesomeIcon icon={faTrash} style={{ color: "#db0000" }} />
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

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