import { Stack } from "react-bootstrap";
import axios from "../../Services/customizeAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Style from "../../assets/style/form.module.scss";
import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
const subjects = ["SWP301", "SWR301", "SWT301", "PRF192", "CEA201"];

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

function CreateSlot() {

    const { setSelectedSlot, daySelected, setDaySelected, setShowSlotModal, selectedSlot, dispatchEmptySlot } = useContext(GlobalContext)
    const [roomFilter, setRoomFilter] = useState([]);
    const [address, setAddress] = useState(null)
    const [slot, setSlot] = useState(1)
    const [duration, setDuration] = useState(15)
    const [selectRoom, setSelectRoom] = useState(null)
    const [time, setTime] = useState(slotTime[slot - 1].start);
    const roomList = typeof window != null ? JSON.parse(sessionStorage.getItem('roomList')) : null


    useEffect(() => {
        setTime(slotTime[slot - 1].start)
    }, [slot])

    const handleSubmit = async (e) => {

        await axios.post(`/api/v1/slots/lecturer/2`, {
            slotTimeId: slot,
            dateStart: selectedSlot.date,
            timeStart: time + ':00',
            duration: '00:' + duration + ':00',
            roomId: selectRoom
        }).then((response) => {
            console.log("response:");
            console.log(response);
            window.location.reload();
        })
            .catch((error) => {
                console.log("error at create slot: " + error);
            })

    setShowSlotModal(false);
  };

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
        return address != null ? true : false
    }

    const handleSetSelectedSlot = (e) => {
        return (
            [
                {
                    ...e,
                    time_start: time + ":00",
                    duration: duration,
                }
            ]
        )
    }
    return (
        <div className={Style.box}>
            <div className={Style.box_content}

                style={{
                    width: '300px',
                    height: 'auto'
                }}

            >
                <Stack direction='vertical' gap='2' className={Style.object}>
                    <Stack className='pb-2 pe-2' direction='horizontal' gap='2'>
                        <h4
                            style={{ margin: '0' }}
                        >Create slot</h4>
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
                                {console.log(daySelected)}
                                <label htmlFor="datepicker">Date:</label>
                                <DatePicker
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
                            <div>
                                <label htmlFor="slot">Slot:</label>
                                <select
                                    id='slot'
                                    name='slot time'
                                    placeholder='Choose slot'
                                    onChange={(e) => { setSlot(e.target.value) }}
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
                                        setSelectedSlot((selectedSlot) => handleSetSelectedSlot(selectedSlot))
                                    }}
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
                                        clearIcon
                                        disableClock="true"
                                        minTime={getMin()}
                                        maxTime={getMax()}
                                        onChange={(value) => {
                                            setTime(value);
                                            setSelectedSlot((selectedSlot) => handleSetSelectedSlot(selectedSlot));
                                        }}
                                        value={time}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='address'>Address:</label>
                                    <select
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
                                </div>
                                <div>
                                    <label htmlFor="room">Room:</label>
                                    <select
                                        id='room'
                                        placeholder='Choose room'
                                        disabled={isDisabled(address)}
                                        onChange={e => { setSelectRoom(e.target.value) }}
                                    >
                                        <option defaultChecked>
                                            Select Room
                                        </option>
                                        {
                                            roomFilter.map(room => {
                                                return (<option key={room.roomId} value={room.roomId}>{room.roomId}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </Stack>
                    </form>

                    <button className={Style.book_btn} onClick={(e) => handleSubmit(e)}>Create</button>
                </Stack>
            </div>
        </div>
    );
}

export default CreateSlot;
