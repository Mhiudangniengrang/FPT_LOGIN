import { Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Style from '../../assets/style/form.module.scss'
import React, { useState, useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';

const subjects = [
    'SWP301', 'SWR301', 'SWT301', 'PRF192', 'CEA201'
]

function CreateSlot() {

    const { daySelected, setDaySelected, setShowSlotModal, selectedSlot, dispatchEmptySlot } = useContext(GlobalContext)
    const [slot, setSlot] = useState(0)
    const [duration, setDuration] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        const emptySlot = {
            slot: selectedSlot['slot'].slot,
            date: selectedSlot['slot'].date,
            time: selectedSlot['slot'].time,
        };
        dispatchEmptySlot({ type: "push", payload: emptySlot });
        setShowSlotModal(false);
    };

    const isExistSelectedSlot = () => {
        if (selectedSlot != null) {
            return new Date(selectedSlot['slot'].date)
        }
        return daySelected
    }

    const getStep = () => {
        duration != 0 ? duration * 60 : 0
    }
    return (
        <>
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
                                style={{
                                    color: "#000000",
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setDaySelected(new Date());
                                    setShowSlotModal(false)
                                }} />
                        </Stack>

                        <form>
                            <Stack direction='vertical' gap='3'
                                style={{
                                    alignItems: 'flex-start'
                                }}
                            >
                                <div>
                                    <label htmlFor="datepicker">Date:</label>
                                    <DatePicker
                                        id='datepicker'
                                        onChange={(date) => {
                                            setDaySelected(date)
                                        }}
                                        placeholderText='Choose your date'
                                        selected={isExistSelectedSlot()}
                                        value={isExistSelectedSlot()}
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
                                        onChange={(e) => { setDuration(e.target.value) }}
                                    >
                                        <option value={15}>15 minutes</option>
                                        <option value={30}>30 minutes</option>
                                        <option value={45}>45 minutes</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="time">Time:</label>
                                    <div id='time'>
                                        <label htmlFor="startTime">From:</label>
                                        <input id='startTime' type='time' name='start time'
                                            step="300"
                                        />
                                        <label htmlFor="endTime">to </label>
                                        <input id='endTime' type='time' name='end time'
                                            step="300"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="room">Room:</label>
                                        <select
                                            id='room'
                                            placeholder='Choose room'
                                        >
                                        </select>
                                    </div>
                                </div>
                            </Stack>
                        </form>

                        <button className={Style.book_btn} onClick={(e) => handleSubmit(e)}>Create</button>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default CreateSlot;