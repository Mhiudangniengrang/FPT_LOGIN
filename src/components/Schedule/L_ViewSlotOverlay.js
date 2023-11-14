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
    const [slot, setSlot] = useState(1)
    const [duration, setDuration] = useState(15)
    const [selectRoom, setSelectRoom] = useState(null)
    const [time, setTime] = useState(slotTime[slot - 1].start);
    const [loading, isLoading] = useState(true)
    const [save, isSaving] = useState(false)
    const { loginUser } = useData()
    const [mode, setMode] = useState('public');
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

    const handleSubmit = async () => {
        isSaving(true)
        await axios.post(`/api/v1/slots/lecturer/${loginUser.userId}`, {
            emptySlotId: 103,
            slotTimeId: slot,
            dateStart: dayjs(daySelected).format("YYYY-MM-DD"),
            timeStart: time + ':00',
            duration: '00:' + duration + ':00',
            roomId: selectRoom,
            mode: mode,
            status: "OPEN"
        }).then((response) => {
            toast.success(`Create successfully`, {
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

    };

    const handleUpdate = () => {

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

    const parseDuration = (d) => {
        const input = d;
        const [hours, minutes, seconds] = input.split(":");
        const formattedTime = parseInt(minutes);
        return formattedTime;
    }
    return (
        <div className={Style.box}>
            <ToastContainer />
            {selectedSlot.status === "BOOKED" ? (
                <div className={Style.box_content}

                    style={{
                        height: 'auto'
                    }}

                >
                    <Stack direction='vertical' gap='2' className={Style.object}>
                        <Stack className='pb-2 pe-2' direction='horizontal' gap='2'>
                            <h4
                                style={{ margin: '0' }}
                            >View slot</h4><span>(This slot had been booked)</span>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className='ms-auto'
                                style={{ color: "#000000", cursor: 'pointer' }}
                                onClick={() => {
                                    setDaySelected(new Date());
                                    setShowSlotModal(false)
                                }}
                            />
                        </Stack>

                        <form>
                            <Stack direction='vertical' gap='3'
                            >
                                <div>
                                    <label htmlFor="datepicker">Date:</label>
                                    <DatePicker
                                        id='datepicker'
                                        onChange={(date) => {
                                            setDaySelected(date)
                                        }}
                                        minDate={new Date()}
                                        placeholderText='Choose your date'
                                        selected={new Date(selectedSlot.dateStart)}
                                        dateFormat={'dd/MM/yyyy'}
                                        disable={true}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="slot">Slot:</label>
                                    <select
                                        id='slot'
                                        name='slot time'
                                        placeholder='Choose slot'
                                        onChange={(e) => { setSlot(e.target.value) }}
                                        defaultValue={selectedSlot.slotTimeId}
                                        disabled={true}
                                    >
                                        <option value={1}>Slot 1</option>
                                        <option value={2}>Slot 2</option>
                                        <option value={3}>Slot 3</option>
                                        <option value={4}>Slot 4</option>
                                        <option value={5}>Slot 5</option>
                                        <option value={6}>Slot 6</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="duration">Duration:</label>
                                    <select
                                        id='duration'
                                        name='slot time'
                                        placeholder='Choose slot'
                                        onChange={(e) => {
                                            setDuration(e.target.value);
                                        }}
                                        defaultValue={parseDuration(selectedSlot.duration)}
                                        disabled={true}
                                    >
                                        <option value={15}>15 minutes</option>
                                        <option value={30}>30 minutes</option>
                                        <option value={45}>45 minutes</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="time">Start time: {getStartTime()}</label>
                                    <div
                                        style={{
                                            width: '200px'
                                        }}
                                    >
                                        <TimePicker
                                            required
                                            disableClock="true"
                                            clearIcon
                                            minTime={getMin()}
                                            maxTime={getMax()}
                                            onChange={(value) => {
                                                setTime(value);
                                            }}
                                            value={selectedSlot.timeStart}
                                            disabled={true}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='address'>Address:</label>
                                        <select
                                            id='address'
                                            onChange={e => handleAddressChange(e)}
                                            disabled={true}
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
                                    </div>
                                    <div>
                                        <label htmlFor="room">Room:</label>
                                        <select
                                            id='room'
                                            placeholder='Choose room'
                                            disabled={true}
                                            onChange={e => { setSelectRoom(e.target.value) }}

                                        >
                                            <option defaultChecked>
                                                {selectedSlot.roomId}
                                            </option>
                                            {
                                                getFilterRoom().map(room => {
                                                    return (<option key={room.roomId} value={room.roomId}>{room.roomId}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </Stack>
                        </form>
                    </Stack>
                </div>
            ) : (
                <div
                    className={Style.box_content}
                    id={Style.createSlot}
                >
                    <Stack direction='vertical' gap='2' className={Style.object}>
                        <Stack className='pb-2 pe-2' direction='horizontal' gap='2'>
                            <h4
                                style={{ margin: '0' }}
                            >View slot</h4>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className='ms-auto'
                                style={{ color: "#000000", cursor: 'pointer' }}
                                onClick={() => {
                                    setDaySelected(new Date());
                                    setShowSlotModal(false)
                                }}
                            />
                        </Stack>

                        <form>
                            <Stack direction='vertical' gap='3'
                            >
                                <Stack direction="horizontal">
                                    <label htmlFor="datepicker">Date:</label>
                                    <DatePicker
                                        id='datepicker'
                                        onChange={(date) => {
                                            setDaySelected(date)
                                        }}
                                        minDate={new Date()}
                                        placeholderText='Choose your date'
                                        selected={new Date(selectedSlot.dateStart)}
                                        dateFormat={'dd/MM/yyyy'}
                                        disable={true}
                                    />
                                </Stack>
                                <Stack direction="horizontal">
                                    <label htmlFor="slot">Slot:</label>
                                    <select
                                        id='slot'
                                        name='slot time'
                                        placeholder='Choose slot'
                                        onChange={(e) => { setSlot(e.target.value) }}
                                        defaultValue={selectedSlot.slotTimeId}
                                        disabled={true}
                                    >
                                        <option value={1}>Slot 1</option>
                                        <option value={2}>Slot 2</option>
                                        <option value={3}>Slot 3</option>
                                        <option value={4}>Slot 4</option>
                                        <option value={5}>Slot 5</option>
                                        <option value={6}>Slot 6</option>
                                    </select>
                                </Stack>
                                <Stack direction="horizontal">
                                    <label htmlFor="duration">Duration:</label>
                                    <select
                                        id='duration'
                                        name='slot time'
                                        placeholder='Choose slot'
                                        onChange={(e) => {
                                            setDuration(e.target.value);
                                        }}
                                        defaultValue={parseDuration(selectedSlot.duration)}
                                        disabled={true}
                                    >
                                        <option value={15}>15 minutes</option>
                                        <option value={30}>30 minutes</option>
                                        <option value={45}>45 minutes</option>
                                    </select>
                                </Stack>
                                <Stack direction="horizontal">
                                    <label htmlFor="time">Start time: {getStartTime()}</label>
                                    <TimePicker
                                        required
                                        disableClock="true"
                                        clearIcon
                                        minTime={getMin()}
                                        maxTime={getMax()}
                                        onChange={(value) => {
                                            setTime(value);
                                        }}
                                        value={selectedSlot.timeStart}
                                        disabled={true}
                                    />
                                </Stack>
                                <Stack direction="horizontal">
                                    <label htmlFor='address'>Address:</label>
                                    <select
                                        id='address'
                                        onChange={e => handleAddressChange(e)}
                                        disabled={true}
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
                                <Stack direction="horizontal">
                                    <label htmlFor="room">Room:</label>
                                    <select
                                        id='room'
                                        placeholder='Choose room'
                                        disabled={true}
                                        onChange={e => { setSelectRoom(e.target.value) }}

                                    >
                                        <option defaultChecked>
                                            {selectedSlot.roomId}
                                        </option>
                                        {
                                            getFilterRoom().map(room => {
                                                return (<option key={room.roomId} value={room.roomId}>{room.roomId}</option>)
                                            })
                                        }
                                    </select>
                                </Stack>
                            </Stack>
                        </form>
                    </Stack>
                </div >
            )
            }
        </div >
    );
}

export default ViewSlot;
