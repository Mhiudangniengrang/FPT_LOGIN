import { Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Style from '../../assets/style/form.module.scss'
import React, { useState, useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import ExcelReader from '../ExcelReader';

const subjects = [
    'SWP301', 'SWR301', 'SWT301', 'PRF192', 'CEA201'
]

function CreateSlot() {

    const { setDaySelected, emptySlots, setShowSlotModal, selectedSlot, dispatchEmptySlot } = useContext(GlobalContext)
    const [selectedDate, setSelectedDate] = useState(new Date());


    const slotData = selectedSlot['slot'];
    const handleSubmit = (e) => {
        e.preventDefault();
        const emptySlot = {
            slot: slotData.slot,
            date: slotData.date,
            time: slotData.time,
        };
        dispatchEmptySlot({ type: "push", payload: emptySlot });
        setShowSlotModal(false);
    };



    return (
        <>
            <div className={Style.box}>
                <div className={Style.box_content}>
                    <Stack direction='vertical' gap='2'>
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
                                onClick={() => setShowSlotModal(false)} />
                        </Stack>
                        <Stack direction='vertical'>
                            <DatePicker
                                onChange={(date) => {
                                    setShowSlotModal(false),
                                        setDaySelected(date),
                                        setSelectedDate(date)
                                }}
                                placeholderText='Choose your date'
                                selected={new Date(slotData.date)}
                                value={new Date(slotData.date)}
                                dateFormat={'dd/MM/yyyy'}
                            />
                            <ExcelReader />
                        </Stack>
                        <button onClick={(e) => handleSubmit(e)}>Create</button>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default CreateSlot;