import { Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Style from '../../assets/style/form.module.scss'
import { useContext, useEffect, useMemo } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import axios from '../../Services/customizeAxios'
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
const subjects = [
    'SWP391', 'MATH101', 'JPN301'
]

function BookPublicOverlay() {
    const { lecturerId } = useParams()
    const { loginUser } = useData()
    const { setShowSlotModal, selectedSlot } = useContext(GlobalContext)
    const [purpose, setPurpose] = useState(
        selectedSlot ? selectedSlot.description : ""
    );
    const [subject, setSubject] = useState(
        selectedSlot ? selectedSlot.subjectId : ""
    );
    const [subjectList, setSubjectList] = useState([])
    const [loading, isLoading] = useState(true)
    const checkDate = (day) => {
        let currDay = new Date();
        const [date, month, year] = day.split('/').map(String)
        let selectDate = new Date(year + "/" + month + "/" + date)

        if (selectDate >= currDay) { return true }
        return false;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
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

    const handleUpdateSlot = () => {

    }

    useEffect(() => {
        if (lecturerId) {
            axios.get(`/api/v1/lecturer/${lecturerId}/subjects`)
                .then(res => {
                    setSubjectList(res);
                    isLoading(false)
                })
                .catch(error => {
                    console.log("Error at getting subject list", error);
                    isLoading(false)

                });
        } else {
            console.log(selectedSlot)
            axios.get(`/api/v1/lecturer/${selectedSlot.lecturerId}/subjects`)
                .then(res => {
                    setSubjectList(res);
                    isLoading(false)
                })
                .catch(error => {
                    console.log("Error at getting subject list", error);
                    isLoading(false)

                });
        }
    }, []);

    console.log("BookOverlay")
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
                                margin: '10px 10px 10px 10px',
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

                                <form id='form' className={Style.object} onSubmit={(e) => handleSubmit(e)}>

                                    <Stack direction='vertical' gap='2'>
                                        <div className={Style.subjects}>
                                            {loading ? (
                                                <p>Loading...</p>
                                            ) : (
                                                subjectList.map((item, index) => (
                                                    <div
                                                        className={`${Style.subject}  ${subject === item.subjectId ? Style.active : ""}`}
                                                        key={index}
                                                        onClick={() => setSubject(item.subjectId)}
                                                    >{item.subjectId}
                                                    </div>
                                                ))
                                            )}
                                        </div>
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

                                        <button className={Style.book_btn} type='submit'>Book</button>

                                    </Stack>
                                </form>
                            </Stack>
                        </Stack>
                    </div>
                ) : (
                    !checkDate(selectedSlot.dateStart) ?
                        (
                            <div className={Style.box_content}>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '15px',
                                        borderRadius: "10px",
                                        background: "red",
                                        margin: '10px 10px 10px 10px',
                                    }}
                                >
                                </div>

                                <Stack direction='vertical' gap='2'>
                                    <Stack className='pb-2 pe-2' direction='horizontal' gap='2'>
                                        <h4
                                            style={{ margin: '0' }}
                                        >View slot</h4><span style={{ margin: '0' }}>    (This slot has overdue)</span>
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
                                        <p>Duration: {selectedSlot.duration}</p>
                                        <p>Subject: {selectedSlot.subjectId}</p>
                                        <p>Date : {selectedSlot.dateStart}</p>
                                        <p>Time : {selectedSlot.timeStart}</p>
                                        <p>Room: {selectedSlot.roomId}</p>
                                        <p>Booked date: {dayjs(selectedSlot.bookedDate).format("YYYY-MM-DD")}</p>
                                        <Stack direction='vertical' gap='2'
                                            style={{ marginBottom: '10px' }}
                                        >
                                            <label htmlFor='purpose'>Purpose:</label>
                                            <textarea id='purpose' className={Style.purpose}
                                                value={selectedSlot.description}
                                                disabled
                                            >
                                            </textarea>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </div>
                        ) : (
                            <div className={Style.box_content}>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '15px',
                                        borderRadius: "10px",
                                        background: "red",
                                        margin: '10px 10px 10px 10px',
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
                                        <p>Lecturer: {selectedSlot.lecturerName}</p>
                                        <p>Slot: {selectedSlot.slotTimeId}</p>
                                        <p>Duration: {selectedSlot.duration}</p>
                                        <p>Date : {selectedSlot.dateStart}</p>
                                        <p>Time : {selectedSlot.timeStart}</p>
                                        <p>Room: {selectedSlot.roomId}</p>
                                        <p>Booked date: {dayjs(selectedSlot.bookedDate).format("YYYY-MM-DD")}</p>
                                        <Stack direction='horizontal' gap={1} style={{ marginBottom: '1rem' }}>
                                            <p style={{ margin: '0' }}>Subject:</p>
                                            <select
                                                onChange={e => setSubject(e.target.value)}
                                            >
                                                {subjectList.map((item, index) => (
                                                    <option
                                                        key={index}
                                                        value={`${item.subjectId}`}
                                                        defaultValue={selectedSlot.subjectId === item.subjectId ? true : false}>
                                                        {item.subjectId}
                                                    </option>
                                                ))}
                                            </select>
                                        </Stack>
                                        <Stack direction='vertical' gap='2'
                                            style={{ marginBottom: '10px' }}
                                        >
                                            <label htmlFor='purpose'>Purpose:</label>
                                            <textarea id='purpose' className={Style.purpose}
                                                value={purpose}
                                                onChange={e => setPurpose(e.target.value)}
                                            >
                                            </textarea>
                                        </Stack>
                                        <button
                                            className={Style.book_btn}
                                            onClick={() => handleUpdateSlot}
                                        >Update</button>
                                    </Stack>
                                </Stack>
                            </div>
                        )

                )
                }
            </div>
        </>
    );
}

export default BookPublicOverlay;