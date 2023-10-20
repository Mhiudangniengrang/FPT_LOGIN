import { useRef } from 'react';
import { Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Style from '../../assets/style/form.module.scss'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useState } from 'react';

const subjects = [
    'SWP301', 'SWR301', 'SWT301', 'PRF192', 'CEA201'
]

function BookPublicOverlay() {

    const { showSlotModal, setShowSlotModal, selectedSlot, dispatchCalSlot } = useContext(GlobalContext)
    const [purpose, setPurpose] = useState(
        selectedSlot ? selectedSlot.description : ""
    );
    const [subject, setSubject] = useState(
        selectedSlot ? selectedSlot.subject : ""
    );

    const slotData = selectedSlot['slot']

    const handleSubmit = (e) => {
        e.preventDefault();
        const calendarSlot = {
            teacher: selectedSlot['slot'].teacher,
            slot: selectedSlot['slot'].slot,
            date: selectedSlot['slot'].date,
            time: selectedSlot['slot'].time,
            subject: selectedSlot['slot'].subject,
            room: selectedSlot['slot'].room,
            purpose: purpose,
            status: 'waiting',
        };
        dispatchCalSlot({ type: "push", payload: calendarSlot });
        setShowSlotModal(false);
    };

    return (
        <>
            <div className={Style.box}>
                <div className={Style.box_content}>
                    <div
                        style={{
                            width: '30px',
                            height: '15px',
                            borderRadius: "10px",
                            background: "#40BC4C",
                            margin: '5px 10px 10px 10px',
                        }}
                    >
                    </div>

                    <Stack direction='vertical' gap='2'>
                        <Stack className='pb-2 pe-2' direction='horizontal' gap='2'>
                            <h4
                                style={{ margin: '0' }}
                            >Book slot</h4>
                            <FontAwesomeIcon className='pe-2' icon={faEllipsisVertical} style={{ color: "#0d0d0d", marginLeft: 'auto' }} />
                            <FontAwesomeIcon icon={faXmark}
                                style={{
                                    color: "#000000",
                                    cursor: 'pointer',
                                }}
                                onClick={() => setShowSlotModal(false)} />
                        </Stack>
                        <Stack direction='vertical'>
                            <p>Lecturer: {slotData.teacher}</p>
                            <p>Slot: {slotData.slot}</p>
                            <p>Date : {slotData.date}</p>
                            <p>Time : {slotData.time}</p>
                            <p>Room: {slotData.room}</p>
                            <p>Status: {slotData.status}</p>

                            <label htmlFor='form'>Choose your subject:</label>
                            <div className={Style.subjects}>
                                {subjects.map((subject, index) => {
                                    return (
                                        <>
                                            <input id={`radio-${index}`} type="radio" name="radio"
                                                value={subject}
                                            />
                                            <label htmlFor={`radio-${index}`} key={index}>{subject}</label>

                                        </>
                                    )
                                }
                                )}

                                {console.log(subject)}
                            </div>
                            <form id='form' className={Style.object} onSubmit={(e) => handleSubmit(e)}>

                                <Stack direction='vertical' gap='2'>
                                    <label htmlFor='purpose'>Purpose:</label>
                                    <textarea id='purpose' className={Style.purpose}
                                        rows="4"
                                        maxLength='200'
                                        placeholder='Enter your purpose (200 words)'
                                        onChange={(e) => setPurpose(e.target.value)}
                                    ></textarea>
                                    <button className={Style.book_btn} type='submit' >Book</button>
                                </Stack>
                            </form>
                        </Stack>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default BookPublicOverlay;