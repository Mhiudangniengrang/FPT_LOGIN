import React, { useEffect, useState } from "react";
import Style from "../../assets/style/admin.module.scss"
import { Button, Pagination, Spinner, Stack, Table, ToastHeader } from "react-bootstrap";
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
import { useData } from "../../context/DataContext";
import { SubjectLecturerList } from "./User";
import { SubjectMajorList } from "./Major";
export const SubjectList = () => {
    const { action } = useParams();
    const [page, setPage] = useState(0)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("subjectId")
    const [status, setStatus] = useState("")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [numberAll, setNumberAll] = useState(0)
    const [numberOpen, setNumberOpen] = useState(0)
    const [loading, isLoading] = useState(true)
    useEffect(async () => {
        await axios.get(`/api/v1/subject/admin/subjects`,
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
            setNumberOpen(res.totalOpen)
            if (status === "") {
                setNumberAll(res.totalElement)
            }
        }).catch(error => {
            console.log("Error at getting subject:", error)
            toast.error(`Error at getting subject`, {
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
    }, [page, pageSize, filter, sortDir, status])

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
                            <option value={"subjectId"}>Subject's Id</option>
                            <option value={"status"}>Status</option>
                        </select>
                    </div>
                    <div className={Style.create}>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "10px" }} />
                        <span><a href="subject/create">CREATE</a></span>
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
                                    Subject ID
                                    <span
                                        style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setFilter("subjectId");
                                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={sortDir === "asc" ? faArrowUp : faArrowDown}
                                            style={{ color: "#000000" }}
                                        />
                                    </span>
                                </th>
                                <th>Subject Name</th>
                                <th>Major Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pageContent.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.subjectId}</td>
                                    <td>{item.subjectName}</td>
                                    <td>
                                        {item.major.map((i, index) => (
                                            <p key={index}>{i.majorName}</p>
                                        ))}
                                    </td>
                                    <td>{item.status}</td>
                                    <td>
                                        <span
                                            className={Style.icon}
                                            onClick={() => navigate(`edit/${item.subjectId}`, { state: { item } })}
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

// chua xong save 
export const SubjectEdit = () => {
    const { loginUser } = useData();
    const { id } = useParams();

    const [subject, setSubject] = useState({})
    const [name, setName] = useState("")
    const [loading, isLoading] = useState(true)
    const [saving, isSaving] = useState(false)
    const [major, setMajor] = useState([])
    const handleRadioChange = (newStatus) => {
        console.log(newStatus)
        setStatus(newStatus);
    };

    const [status, setStatus] = useState("")
    useEffect(() => {
        axios
            .get(`/api/v1/subject/admin/${id}`)
            .then(res => {
                setSubject(res)
                setMajor(res.majorSet)
                setName(res.subjectName)
            }).catch(error => {
                console.log("Error at getting major:", error)
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

    const ChooseMajor = (selectedMajor) => {
        if (selectedMajor === null) {
            setMajor([])
            return
        }
        if (!major.some(
            (selected) => selected.majorId === selectedMajor.majorId
        )) {
            setMajor((prevMajor) => [
                ...prevMajor,
                {
                    majorId: selectedMajor.majorId,
                    majorName: selectedMajor.majorName,
                }
            ]);
        } else {
            setMajor(major.filter(
                (selected) => selected.majorId !== selectedMajor.majorId
            ))
        }
    };
    return (
        <div className={Style.container}>
            <ToastContainer />
            {loading ? (
                <Spinner style={{ margin: '50px auto' }} />
            ) : (
                <Stack direction="horizontal" style={{ width: '100%', alignItems: 'flex-start' }}>
                    <form className={Style.formEdit} style={{ maxWidth: '300px', alignItems: 'center' }}>

                        <h3>Edit subject</h3>
                        <div>
                            <label htmlFor="subjectId">Subject's Id</label>
                            <input id="subjectId" type="text" value={id} readOnly />
                        </div>
                        <div>
                            <label htmlFor="subjectName">Subject's Name</label>
                            <input id="subjectName" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="majorName">Major's Name</label>
                            {subject.majorSet.map((item, index) => (
                                <p key={index} style={{ padding: '0 10px' }}>{item.majorName}</p>
                            ))}
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
                                type="submit" onClick={() => navigate("/admin/subject")}
                            >Back</button>
                        </Stack>
                    </form>
                    <Stack className="ms-auto me-5" >
                        <SubjectLecturerList lecturers={subject.lecturerSet} />
                    </Stack>
                </Stack>
            )}
        </div >
    )
}

export const SubjectCreate = () => {
    const { loginUser } = useData();

    const [subject, setSubject] = useState({})
    const [subjectId, setSubjectId] = useState("")
    const [name, setName] = useState("")
    const [loading, isLoading] = useState(true)
    const [saving, isSaving] = useState(false)
    const handleSave = (e) => {
        isSaving(true)
        e.preventDefault()
        axios.post(`/api/v1/subject/admin/${loginUser.userId}`,
            {
                subjectId: subjectId,
                subjectName: name,
                majorId: major.map(item => item.majorId)
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
    const [major, setMajor] = useState([])
    const ChooseMajor = (selectedMajor) => {
        if (selectedMajor === null) {
            setMajor([])
            return
        }
        if (!major.some(
            (selected) => selected.majorId === selectedMajor.majorId
        )) {
            setMajor((prevMajor) => [
                ...prevMajor,
                {
                    majorId: selectedMajor.majorId,
                    majorName: selectedMajor.majorName,
                }
            ]);
        } else {
            setMajor(major.filter(
                (selected) => selected.majorId !== selectedMajor.majorId
            ))
        }
    };
    const navigate = useNavigate();
    return (
        <div className={Style.container}>
            <Stack direction="horizontal" style={{ width: '100%', alignItems: 'flex-start' }}>
                <form className={Style.formEdit} style={{ maxWidth: '300px', alignItems: 'center' }}>

                    <h3>Create subject</h3>
                    <div>
                        <label htmlFor="majorId">Subject's Id</label>
                        <input id="majorId" type="text" value={subjectId} required onChange={(e) => setSubjectId(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="majorName">Subject's Name</label>
                        <input id="majorName" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="majorName">Major's Name</label>
                        {major.map((item, index) => (
                            <p key={index} style={{ padding: '0 10px' }}>{item.majorName}</p>
                        ))}
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
                            type="submit" onClick={() => navigate("/admin/subject")}
                        >Back</button>
                    </Stack>
                </form>
                <div className="ms-auto me-5" >
                    <SubjectMajorList ChooseMajor={ChooseMajor} />
                </div>
            </Stack>
        </div>
    )
}

export const MajorSubjectList = () => {
    const { id } = useParams();
    const [page, setPage] = useState(0)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("subjectId")
    const [status, setStatus] = useState("")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [loading, isLoading] = useState(true)
    useEffect(async () => {
        await axios.get(`/api/v1/subject/admin/major/${id}`,
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
            setTotalPage(res.totalPage)
        }).catch(error => {
            console.log("Error at getting subject:", error)
            toast.error(`Error at getting subject`, {
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
    }, [page, pageSize, filter, sortDir, status])

    const handlePageChange = (value) => {
        setPage(value)
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
                            <option value={"subjectId"}>Subject's Id</option>
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
                                    Subject ID
                                    <span
                                        style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setFilter("subjectId");
                                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={sortDir === "asc" ? faArrowUp : faArrowDown}
                                            style={{ color: "#000000" }}
                                        />
                                    </span>
                                </th>
                                <th>Subject Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pageContent.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.subjectId}</td>
                                    <td>{item.subjectName}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <span
                                            className={Style.icon}
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