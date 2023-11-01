import { Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Style from '../../assets/style/form.module.scss'
import { useContext, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import axios from '../../Services/customizeAxios'
const subjects = [
    'SWP391', 'MATH101', 'JPN301'
]

function BookPublicOverlay() {
    const { loginUser } = useData()
    console.log(loginUser)
    const { setShowSlotModal, selectedSlot } = useContext(GlobalContext)
    const [purpose, setPurpose] = useState(
        selectedSlot ? selectedSlot.description : ""
    );
    const [subject, setSubject] = useState(
        selectedSlot ? selectedSlot.subjectId : ""
    );

    console.log("BookPublicOverLay")
    console.log(selectedSlot)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(subject)
        console.log(purpose)
        axios
            .put(`/api/v1/students/emptySlot/${selectedSlot.emptySlotId}/student/${loginUser.userId}/subject/${subject}`,
                {
                    subjectId: subject,
                    description: purpose,
                }
            ).then(res => [
                console.log(res)
            ]).catch(err => {
                console.log(err)
            })
        setShowSlotModal(false);
    };

    return (
        <>
            <div className={Style.box}>
                {selectedSlot.status === "OPEN" ? (
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
                                <FontAwesomeIcon icon={faXmark}

                                    className='ms-auto'
                                    style={{
                                        color: "#000000",
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setShowSlotModal(false)} />
                            </Stack>
                            <Stack direction='vertical'>
                                <p>Lecturer: {selectedSlot.lecturerName}</p>
                                <p>Slot: {selectedSlot.slotTimeId}</p>
                                <p>Date : {selectedSlot.dateStart}</p>
                                <p>Duration : {selectedSlot.duration}</p>
                                <p>Time : {selectedSlot.timeStart}</p>
                                <p>Room: {selectedSlot.roomId}</p>

                                <label htmlFor='form'>Choose subject:</label>
                                <div className={Style.subjects}>
                                    {subjects.map((subject, index) => {
                                        return (
                                            <>
                                                <input id={`radio-${index}`} type="radio" name="radio"
                                                    value={subject}
                                                    onClick={() => {
                                                        setSubject(subject);
                                                        selectedSlot.subjectId = subject
                                                    }}

                                                />
                                                <label htmlFor={`radio-${index}`} key={index}>{subject}</label>

                                            </>
                                        )
                                    }
                                    )}
                                </div>
                                <form id='form' className={Style.object} onSubmit={(e) => handleSubmit(e)}>

                                    <Stack direction='vertical' gap='2'>
                                        <label htmlFor='purpose'>Purpose:</label>
                                        <textarea id='purpose' className={Style.purpose}
                                            rows="4"
                                            maxLength='200'
                                            placeholder='Enter your purpose (200 words)'
                                            onChange={(e) => {
                                                setPurpose(e.target.value);
                                                selectedSlot.description = e.target.value;
                                            }}
                                            value={selectedSlot.description}
                                            required
                                        >
                                        </textarea>
                                        {selectedSlot.status !== 'Booked' && (

                                            <button className={Style.book_btn} type='submit'  >Book</button>
                                        )}
                                    </Stack>
                                </form>
                            </Stack>
                        </Stack>
                    </div>
                ) :
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
                                >View slot</h4>
                                <FontAwesomeIcon icon={faXmark}

                                    className='ms-auto'
                                    style={{
                                        color: "#000000",
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setShowSlotModal(false)} />
                            </Stack>
                            <Stack direction='vertical'>
                                <p>Lecturer: {selectedSlot.teacher}</p>
                                <p>Slot: {selectedSlot.slot}</p>
                                <p>Date : {selectedSlot.date}</p>
                                <p>Time : {selectedSlot.time}</p>
                                <p>Room: {selectedSlot.room}</p>

                                <label htmlFor='form'>Choose your subject:</label>
                                <div className={Style.subjects}>
                                    {subjects.map((subject, index) => {
                                        return (
                                            <>
                                                <input id={`radio-${index}`} type="radio" name="radio"
                                                    value={subject}
                                                    onClick={() => {
                                                        setSubject(subject);
                                                        selectedSlot.subjectId = subject
                                                    }}

                                                />
                                                <label htmlFor={`radio-${index}`} key={index}>{subject}</label>

                                            </>
                                        )
                                    }
                                    )}
                                </div>
                                <form id='form' className={Style.object} onSubmit={(e) => handleSubmit(e)}>

                                    <Stack direction='vertical' gap='2'>
                                        <label htmlFor='purpose'>Purpose:</label>
                                        <textarea id='purpose' className={Style.purpose}
                                            rows="4"
                                            maxLength='200'
                                            placeholder='Enter your purpose (200 words)'
                                            onChange={(e) => {
                                                setPurpose(e.target.value);
                                                selectedSlot.description = e.target.value;
                                            }}
                                            value={selectedSlot.description}
                                            required
                                        >
                                        </textarea>
                                        {selectedSlot.status !== 'Booked' && (

                                            <button className={Style.book_btn} type='submit' >Book</button>
                                        )}
                                    </Stack>
                                </form>
                            </Stack>
                        </Stack>
                    </div>
                }
            </div>
        </>
    );
}

export default BookPublicOverlay;