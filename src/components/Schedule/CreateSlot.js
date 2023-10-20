import { Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Style from '../../assets/style/form.module.scss'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useState } from 'react';
import { getDateFormat } from '../../Utils/dateUtils'

const subjects = [
    'SWP301', 'SWR301', 'SWT301', 'PRF192', 'CEA201'
]

function CreateSlot() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const { showSlotModal, setShowSlotModal, selectedSlot, dispatchCalSlot } = useContext(GlobalContext)
    console.log("BookPublic:" + showSlotModal)
    const [purpose, setPurpose] = useState(
        selectedSlot ? selectedSlot['slot'].purpose : ""
    );

    const slotData = selectedSlot['slot']

    const handleSubmit = (e) => {
        e.preventDefault();
        const calendarSlot = {
            // title,
            // description,
            // label: selectedLabel,
            // day: daySelected.valueOf(),
            // id: selectedEvent ? selectedEvent.id : Date.now(),
            //  < p > Lecturer: { slotData.teacher }</p>
            //                 <p>Slot: {slotData.slot}</p>
            //                 <p>Date : {getDateFormat(slotData.date)}</p>
            //                 <p>Time : {slotData.time}</p>
            //                 <p>Room: {slotData.room}</p>
            //                 <p>Status: {slotData.status}</p>
            teacher: selectedSlot['slot'].teacher,
            slot: selectedSlot['slot'].slot,
            time: selectedSlot['slot'].time,
            room: selectedSlot['slot'].room,
            purpose: purpose,
            status: 'waiting',
        };
        if (selectedEvent) {
            dispatchCalSlot({ type: "update", payload: calendarSlot });
        } else {
            dispatchCalSlot({ type: "push", payload: calendarSlot });
        }

        setShowEventModal(false);
    };

    return (
        <>
            <div className={Style.box}>
                <div className={Style.box_content}>

                </div>
            </div>
        </>
    );
}

export default CreateSlot;