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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export const RoomList = () => {
    const { action } = useParams();
    const [page, setPage] = useState(0)
    const [loading, isLoading] = useState(true)
    const [pageContent, setPageContent] = useState([])
    const [filter, setFilter] = useState("roomId")
    const [sortDir, setSortDir] = useState("asc")
    const [totalPage, setTotalPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [status, setStatus] = useState("")
    const [numberAll, setNumberAll] = useState(0)
    const [numberOpen, setNumberOpen] = useState(0)
    const [isDelete, setDelete] = useState(false)

    const handleRadioChange = (newStatus) => {
        setStatus(newStatus);
    };

    useEffect(async () => {
        await axios.get(`/api/v1/room/admin/rooms`,
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
            console.log("Error at getting request:", error)
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
                            <option value={"roomId"}>Room's Id</option>
                            <option value={"address"}>Address</option>
                            <option value={"status"}>Status</option>
                        </select>
                    </div>
                    <div className={Style.create}>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "10px" }} />
                        <span><a href="room/create">CREATE</a></span>
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
                                    Room ID
                                    <span
                                        style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setFilter("roomId");
                                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={sortDir === "asc" ? faArrowUp : faArrowDown}
                                            style={{ color: "#000000" }}
                                        />
                                    </span>
                                </th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pageContent.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.roomId}</td>
                                    <td>{item.address}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <span
                                            className={Style.icon}
                                            onClick={() => navigate(`/admin/room/edit/${item.roomId}`, { state: { item } })}
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

export const RoomEdit = () => {
    const location = useLocation();
    const { id } = useParams();
    const [room, setRoom] = useState(location.state.item)
    console.log(room)
    const [saving, isSaving] = useState(false)
    const handleRadioChange = (newStatus) => {
        setStatus(newStatus);
    };

    const [status, setStatus] = useState("")

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
            console.log("Error at saving room", error)
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

            <form className={Style.formEdit}>

                <h3>Edit room</h3>
                <div>
                    <label htmlFor="roomId">Room's Id</label>
                    <input id="roomId" type="text" value={room.roomId} readOnly />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input id="address" type="text" value={room.address} readOnly />
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
                        type="submit" onClick={() => navigate("/admin/room")}
                    >Back</button>
                </Stack>
            </form>
        </div >
    )
}

export const RoomCreate = () => {
    const location = useLocation();
    const [saving, isSaving] = useState(false)
    const [address, setAddress] = useState("")
    const [roomId, setRoomId] = useState("")
    const handleRadioChange = (newStatus) => {
        setStatus(newStatus);
    };

    const handleChangeAddress = (address) => {
        setAddress(address)
    }
    const [status, setStatus] = useState("")

    const handleSave = (e) => {
        isSaving(true)
        e.preventDefault()
        console.log(status)
        axios.post(`/api/v1/room/admin`,
            {
                roomId: roomId,
                address: address,
                status: "OPEN"
            }
        )
            .then(res => {
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
                console.log("Error at saving room", error)
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

            <form className={Style.formEdit}>

                <h3>Create room</h3>
                <div>
                    <label htmlFor="roomId">Room's Id</label>
                    <input id="roomId" type="text" value={roomId} required
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <select id="address" name="address"
                        onChange={(e) => handleChangeAddress(e.target.value)}
                    >
                        <option value={""} defaultChecked>Select address</option>
                        <option value={"FPT University"}>FPT University</option>
                        <option value={"Nha Van Hoa"}>Nha Van Hoa</option>
                    </select>
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
                        type="submit" onClick={() => navigate("/admin/room")}
                    >Back</button>
                </Stack>
            </form>
        </div >
    )
}