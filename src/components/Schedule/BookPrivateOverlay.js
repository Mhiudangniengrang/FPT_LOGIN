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

function BookPrivateOverlay() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const { showSlotModal, setShowSlotModal, selectedSlot } = useContext(GlobalContext)
    console.log("BookPublic:" + showSlotModal)
    const [description, setDescription] = useState(
        selectedSlot ? selectedSlot.description : ""
    );

    const slotData = selectedSlot['slot']

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., save the event data)
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
                            <p>Date : {getDateFormat(slotData.date)}</p>
                            <p>Time : {slotData.time}</p>
                            <p>Room: {slotData.room}</p>
                            <p>Status: {slotData.status}</p>

                            <label htmlFor='form'>Choose your subject:</label>
                            <div className={Style.subjects}>
                                {subjects.map(subject => {
                                    return (
                                        <button type='radio' className={Style.contain}>
                                            <span
                                                className={Style.span}
                                            >{subject}</span>
                                        </button>
                                    )
                                }
                                )}
                            </div>
                            <form id='form' className={Style.object}>

                                <Stack direction='vertical' gap='2'>
                                    <label htmlFor='purpose'>Purpose:</label>
                                    <textarea id='purpose' className={Style.purpose}
                                        rows="4"
                                        maxLength='200'
                                        placeholder='Enter your purpose (200 words)'
                                    ></textarea>
                                    <label htmlFor='code'>
                                        <span>Private code:  </span>
                                        <div onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ position: 'relative', display: 'inline-block' }}>
                                            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#000000", }} />
                                            {isHovered && (
                                                <div
                                                    style={{
                                                        width: '200px',
                                                        fontSize: '12px',
                                                        position: 'absolute',
                                                        top: '100%',
                                                        left: 0,
                                                        background: 'white',
                                                        padding: '5px',
                                                        border: '1px solid #ccc',
                                                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                                                    }}
                                                >
                                                    You must contact your teacher to get this private code
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                    <input type='text' id='code'
                                        placeholder='Type a meeting code'
                                        className={Style.code}
                                    ></input>
                                    <button className={Style.book_btn} type='submit'>Book</button>
                                </Stack>
                            </form>
                        </Stack>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default BookPrivateOverlay;