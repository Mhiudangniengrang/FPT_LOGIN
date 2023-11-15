import { ButtonGroup, Spinner, Stack, ToggleButton } from "react-bootstrap";
import axios from "../../Services/customizeAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Style from "../../assets/style/form.module.scss";
import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import dayjs from "dayjs";
import { useData } from "../../context/DataContext";
import { ToastContainer, toast } from "react-toastify";

const slotTime = [
    {
        slot: "1",
        start: "7:00",
        end: "9:15",
    },
    {
        slot: "2",
        start: "9:30",
        end: "11:45",
    },
    {
        slot: "3",
        start: "12:30",
        end: "14:45",
    },
    {
        slot: "4",
        start: "15:00",
        end: "17:15",
    },
    {
        slot: "5",
        start: "17:30",
        end: "19:45",
    },
    {
        slot: "6",
        start: "20:00",
        end: "22:15",
    },
];

function ViewSlot() {

    const { daySelected, setDaySelected, setShowSlotModal, selectedSlot } = useContext(GlobalContext)
    const [address, setAddress] = useState(null)
    const [rooms, setRooms] = useState([])
    const [slot, setSlot] = useState(selectedSlot ? selectedSlot.slotTimeId : 1)
    const [duration, setDuration] = useState(selectedSlot ? (selectedSlot.duration).split(":")[1] : 15)
    const [selectRoom, setSelectRoom] = useState(selectedSlot ? selectedSlot.roomId : null)
    const [time, setTime] = useState(slotTime[slot - 1].start);
    const [loading, isLoading] = useState(true)
    const [save, isSaving] = useState(false)
    const { loginUser } = useData()
    const [mode, setMode] = useState('public');
    const [rechedule, setRechedule] = useState(false);

    console.log(selectedSlot)
    const getFilterRoom = () => {
        const matchingRoom = rooms.reduce((accumulator, room) => {
            if (room.address === address) {
                return [...accumulator, room];
            }
            return accumulator
        }, [])
        return matchingRoom
    }

    useEffect(() => {
        setTime(slotTime[slot - 1].start)
    }, [slot])

    useEffect(() => {
        axios
            .get(`/api/v1/slots/lecturer/room`)
            .then(res => {
                setRooms(res)
            }).catch(error => {
                console.log("Error at getting rooms", error)
            }).finally(
                isLoading(false)
            )
    }, [])

    const handleUpdateSlot = async (e) => {
        e.preventDefault();
        isSaving(true)
        await axios.put(`/api/v1/slots/lecturer/${loginUser.userId}`, {
            emptySlotId: selectedSlot.emptySlotId,
            dateStart: selectedSlot.dateStart,
            timeStart: selectedSlot.timeStart,
            duration: selectedSlot.duration,
            roomId: selectedSlot.roomId,
            slotTimeId: selectedSlot.slotTimeId,
            "mode": "string",
        }).then((response) => {
            toast.success(`Update successfully`, {
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
            .catch((error) => {
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
                console.log("error at create slot: ", error);
            })
            .finally(() => {
                isSaving(false)
                setShowSlotModal(false);
            })
    }

    const handleReschedule = async (e) => {
        e.preventDefault()
        isSaving(true)
        await axios.put(`/api/v1/slots/${selectedSlot.emptySlotId}/lecturer/${loginUser.userId}`, {
            slotTimeId: slot,
            dateStart: dayjs(daySelected).format("YYYY-MM-DD"),
            timeStart: time + ':00',
            duration: '00:' + duration + ':00',
            roomId: selectRoom,
        }).then((response) => {
            toast.success(`Reschedule successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("response:");
            console.log(response);
        })
            .catch((error) => {
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
                console.log("error at create slot: ", error);
            })
            .finally(() => {
                isSaving(false)
                setShowSlotModal(false);
            })
    }

    function subtractDuration() {
        const [hours, minutes] = (slotTime[slot - 1].end).split(':').map(Number);
        const totalMinutes = hours * 60 + minutes - duration;

        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;

        const formattedHours = String(newHours).padStart(2, '0');
        const formattedMinutes = String(newMinutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    }


    const getStartTime = () => {
        return slot != 0 ? (
            <span>
                {slotTime[slot - 1].start} - {slotTime[slot - 1].end}
            </span>
        ) : (
            <span></span>
        );
    };

    const getMin = () => {
        return slotTime[slot - 1].start
    }

    const getMax = () => {
        return subtractDuration();
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const isDisabled = (address) => {
        return address == null ? true : false
    }

    const checkDate = () => {
        const currDate = dayjs(Date.now()).format("YYYY-MM-DD");
        return currDate === selectedSlot.dateStart
    }

    const handleAbsent = () => {
        axios.put(`/api/v1/slots/${selectedSlot.emptySlotId}/lecturer/${loginUser.userId}/student/${selectedSlot.studentId}`)
            .then(res => {
                console.log(res)
                toast.success(`Save successful`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }).catch(error => {
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
                console.log("error at absent: ", error);
            }).finally(() => {
                setShowSlotModal(false)
            })
    }

    return (
        <div className={Style.box}>
            <ToastContainer />
            {selectedSlot.status === "BOOKED" ? (
                <div className={Style.box_content}

                    style={{
                        height: 'fit-content', width: "fit-content",
                    }}

                >
                    <Stack direction="horizontal" gap={3}>
                        <Stack direction='vertical' gap='2' className={Style.object}
                        >
                            <Stack className='pb-2 pe-2' direction='horizontal' gap='2'>
                                <h4
                                    style={{ margin: '0' }}
                                >View slot</h4><span>(This slot had been booked)</span>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className='ms-auto'
                                    style={{ color: "#000000", cursor: 'pointer', padding: '5px' }}
                                    onClick={() => {
                                        setDaySelected(new Date());
                                        setShowSlotModal(false)
                                    }}
                                />
                            </Stack>

                            <Stack direction='vertical'>
                                <p>Student: {selectedSlot.studentName}</p>
                                <p>Slot: {selectedSlot.slotTimeId}</p>
                                <p>Duration: {selectedSlot.duration}</p>


                                <p>Date : {selectedSlot.dateStart}</p>
                                <p>Time : {selectedSlot.timeStart}</p>

                                <p >Room: {selectedSlot.roomId}</p>
                                <p>Booked date: {dayjs(selectedSlot.bookedDate).format("YYYY-MM-DD")}</p>
                                <Stack direction='horizontal' gap={1} style={{ marginBottom: '1rem' }}>
                                    <p style={{ margin: '0' }}>Subject: {selectedSlot.subjectId}</p>
                                </Stack>
                                <Stack direction='vertical' gap='2'
                                    style={{ marginBottom: '10px' }}
                                >
                                    <p
                                        style={{ maxWidth: '300px' }}
                                    >Purpose: {selectedSlot.requestContent || selectedSlot.description}</p>
                                </Stack>
                                {!checkDate() && (
                                    <button className={`${Style.book_btn} mt-1 mb-1 p-2`}
                                        onClick={() => setRechedule(!rechedule)}
                                    >Reschedule</button>
                                )}
                                {checkDate() && (
                                    <Stack direction="horizontal" gap={3}>
                                        <button className={`${Style.absentBtn} mt-1 mb-1 p-2`}
                                            onClick={() => handleAbsent()}
                                        >Absent</button>
                                    </Stack>
                                )}

                            </Stack>
                        </Stack>

                        {rechedule && (
                            <Stack direction='vertical' gap='2' className={`${Style.object}`}>
                                <h4
                                    style={{ margin: '0' }}
                                >Reschedule</h4>
                                <div
                                    style={{
                                        padding: '10px',
                                        width: '300px',
                                        border: '1px solid #333'
                                    }}
                                >
                                    <form onSubmit={e => { handleUpdateSlot(e) }} >
                                        <Stack direction='vertical' gap='3'
                                        >
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="datepicker">Date:</label>
                                                <div className="ms-auto">
                                                    <DatePicker
                                                        className={`${Style.picker}`}
                                                        id='datepicker'
                                                        onChange={(date) => {
                                                            setDaySelected(date)
                                                        }}
                                                        minDate={new Date()}
                                                        placeholderText='Choose your date'
                                                        selected={daySelected}
                                                        dateFormat={'dd/MM/yyyy'}
                                                    />
                                                </div>
                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="slot">Slot:</label>
                                                <select
                                                    id='slot'
                                                    name='slot time'
                                                    placeholder='Choose slot'
                                                    className="ms-auto"
                                                    onChange={(e) => { setSlot(e.target.value) }}
                                                >
                                                    <option value={1}>Slot 1</option>
                                                    <option value={2}>Slot 2</option>
                                                    <option value={3}>Slot 3</option>
                                                    <option value={4}>Slot 4</option>
                                                    <option value={5}>Slot 5</option>
                                                    <option value={6}>Slot 6</option>
                                                </select>
                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="duration">Duration:</label>
                                                <select
                                                    id='duration'
                                                    name='slot time'
                                                    placeholder='Choose slot'
                                                    className="ms-auto"
                                                    onChange={(e) => {
                                                        setDuration(e.target.value);
                                                    }}
                                                >
                                                    <option value={15}>15 minutes</option>
                                                    <option value={30}>30 minutes</option>
                                                    <option value={45}>45 minutes</option>
                                                </select>
                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="time">Start time: <span style={{ fontSize: '12px' }}>{getStartTime()}</span></label>

                                                <div
                                                    className="ms-auto"
                                                >
                                                    <TimePicker
                                                        className={Style.picker}
                                                        required
                                                        clearIcon={true}
                                                        disableClock={true}
                                                        minTime={getMin()}
                                                        maxTime={getMax()}
                                                        onChange={(value) => {
                                                            setTime(value);
                                                        }}
                                                        value={time}
                                                    />
                                                </div>

                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor='address'>Address:</label>
                                                <select
                                                    className="ms-auto"
                                                    id='address'
                                                    onChange={e => handleAddressChange(e)}
                                                >
                                                    <option defaultChecked>
                                                        Select Address
                                                    </option>
                                                    <option value={'FPT University'}>
                                                        FPT University
                                                    </option>
                                                    <option value={'Nha Van Hoa'}>
                                                        Nha van hoa
                                                    </option>

                                                </select>
                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="room">Room:</label>
                                                {loading ? (<Spinner size="sm" />) : (
                                                    <select
                                                        className="ms-auto"
                                                        id='room'
                                                        placeholder='Choose room'
                                                        disabled={isDisabled(address)}
                                                        onChange={e => { setSelectRoom(e.target.value) }}
                                                    >
                                                        <option defaultChecked>
                                                            Select Room
                                                        </option>
                                                        {
                                                            getFilterRoom().map(room => {
                                                                return (<option key={room.roomId} value={room.roomId}>{room.roomId}</option>)
                                                            })
                                                        }
                                                    </select>
                                                )}
                                            </Stack>

                                        </Stack>

                                        <button
                                            className={Style.book_btn}
                                            onClick={(e) => handleReschedule(e)}
                                        >{!loading ? "Update" : "Updating..."}</button>
                                    </form>
                                </div>
                            </Stack>
                        )}
                    </Stack>
                </div>
            ) : (
                <div className={Style.box_content}

                    style={{
                        height: 'fit-content', width: 'fit-content'
                    }}

                >
                    <Stack direction="horizontal" gap={5}>
                        <Stack direction='vertical' gap='2' className={Style.object}>
                            <Stack className='pb-2 pe-2' direction='horizontal' gap='2'>
                                <h4
                                    style={{ margin: '0' }}
                                >View slot</h4>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className='ms-auto'
                                    style={{ color: "#000000", cursor: 'pointer', padding: '5px' }}
                                    onClick={() => {
                                        setDaySelected(new Date());
                                        setShowSlotModal(false)
                                    }}
                                />
                            </Stack>

                            <Stack direction='vertical'>
                                <p>Slot: {selectedSlot.slotTimeId}</p>
                                <p>Duration: {selectedSlot.duration}</p>


                                <p>Date : {selectedSlot.dateStart}</p>
                                <p>Time : {selectedSlot.timeStart}</p>

                                <p >Room: {selectedSlot.roomId}</p>

                                <button className={`${Style.book_btn} mt-1 mb-1 p-2`}
                                    onClick={() => setRechedule(!rechedule)}
                                >{rechedule ? "Editing..." : "Edit"}</button>
                            </Stack>
                        </Stack>
                        {checkDate()}
                        {rechedule && (
                            <Stack direction='vertical' gap='2' className={`${Style.object}`}>
                                <h4
                                    style={{ margin: '0' }}
                                >Update empty slot</h4>
                                <div
                                    style={{
                                        padding: '10px',
                                        width: '300px',
                                        border: '1px solid #333'
                                    }}
                                >
                                    <form onSubmit={e => { handleUpdateSlot(e) }} >
                                        <Stack direction='vertical' gap='3'
                                        >
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="datepicker">Date:</label>
                                                <div className="ms-auto">
                                                    <DatePicker
                                                        className={`${Style.picker}`}
                                                        id='datepicker'
                                                        onChange={(date) => {
                                                            setDaySelected(date)
                                                        }}
                                                        minDate={new Date()}
                                                        placeholderText='Choose your date'
                                                        selected={daySelected}
                                                        dateFormat={'dd/MM/yyyy'}
                                                    />
                                                </div>
                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="slot">Slot:</label>
                                                <select
                                                    id='slot'
                                                    name='slot time'
                                                    placeholder='Choose slot'
                                                    className="ms-auto"
                                                    onChange={(e) => { setSlot(e.target.value) }}
                                                >
                                                    <option value={1}>Slot 1</option>
                                                    <option value={2}>Slot 2</option>
                                                    <option value={3}>Slot 3</option>
                                                    <option value={4}>Slot 4</option>
                                                    <option value={5}>Slot 5</option>
                                                    <option value={6}>Slot 6</option>
                                                </select>
                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="duration">Duration:</label>
                                                <select
                                                    id='duration'
                                                    name='slot time'
                                                    placeholder='Choose slot'
                                                    className="ms-auto"
                                                    onChange={(e) => {
                                                        setDuration(e.target.value);
                                                    }}
                                                >
                                                    <option value={15}>15 minutes</option>
                                                    <option value={30}>30 minutes</option>
                                                    <option value={45}>45 minutes</option>
                                                </select>
                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="time">Start time: <span style={{ fontSize: '12px' }}>{getStartTime()}</span></label>

                                                <div
                                                    className="ms-auto"
                                                >
                                                    <TimePicker
                                                        className={Style.picker}
                                                        required
                                                        clearIcon={true}
                                                        disableClock={true}
                                                        minTime={getMin()}
                                                        maxTime={getMax()}
                                                        onChange={(value) => {
                                                            setTime(value);
                                                        }}
                                                        value={time}
                                                    />
                                                </div>

                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor='address'>Address:</label>
                                                <select
                                                    className="ms-auto"
                                                    id='address'
                                                    onChange={e => handleAddressChange(e)}
                                                >
                                                    <option defaultChecked>
                                                        Select Address
                                                    </option>
                                                    <option value={'FPT University'}>
                                                        FPT University
                                                    </option>
                                                    <option value={'Nha Van Hoa'}>
                                                        Nha van hoa
                                                    </option>

                                                </select>
                                            </Stack>
                                            <Stack direction="horizontal" gap={2}>
                                                <label htmlFor="room">Room:</label>
                                                {loading ? (<Spinner size="sm" />) : (
                                                    <select
                                                        className="ms-auto"
                                                        id='room'
                                                        placeholder='Choose room'
                                                        disabled={isDisabled(address)}
                                                        onChange={e => { setSelectRoom(e.target.value) }}
                                                    >
                                                        <option defaultChecked>
                                                            Select Room
                                                        </option>
                                                        {
                                                            getFilterRoom().map(room => {
                                                                return (<option key={room.roomId} value={room.roomId}>{room.roomId}</option>)
                                                            })
                                                        }
                                                    </select>
                                                )}
                                            </Stack>

                                        </Stack>

                                        <button
                                            className={Style.book_btn}
                                            onClick={(e) => handleUpdateSlot(e)}
                                        >{!loading ? "Save" : "Saving..."}</button>
                                    </form>
                                </div>
                            </Stack>
                        )}
                    </Stack>
                </div>
            )
            }
        </div >
    );
}

export default ViewSlot;
