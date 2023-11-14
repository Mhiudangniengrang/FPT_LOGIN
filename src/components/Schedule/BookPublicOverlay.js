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
import { ToastContainer, toast } from 'react-toastify';
const subjects = [
    'SWP391', 'MATH101', 'JPN301'
]

function BookPublicOverlay() {
    const { lecturerId } = useParams()
    const { loginUser } = useData()
    const { setShowSlotModal, selectedSlot } = useContext(GlobalContext)
    console.log(selectedSlot)
    const [purpose, setPurpose] = useState(
        selectedSlot ? selectedSlot.description || selectedSlot.requestContent : ""
    );
    const [subject, setSubject] = useState(
        selectedSlot ? selectedSlot.subjectId : ""
    );
    const [subjectList, setSubjectList] = useState([])
    const [loading, isLoading] = useState(false)
    const checkDate = (day) => {
        let currDay = new Date();
        const [date, month, year] = day.split('/').map(String)
        let selectDate = new Date(year + "/" + month + "/" + date)

        if (selectDate >= currDay) { return true }
        return false;
    }
    const handleUpdateSlot = (e) => {
        e.preventDefault()
        isLoading(true)
        axios
            .put(`/api/v1/students/${loginUser.userId}/updating/bookedSlot/${selectedSlot.emptySlotId}`, null, {
                params: {
                    subjectId: subject,
                    description: purpose,
                }
            })
            .then(res => {
                console.log(res);
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
            .catch(err => {
                console.log(err);
                toast.error(`Error at update slot`, {
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
            .finally(() => {
                isLoading(false);

                setShowSlotModal(false);
            });

    };

    useEffect(() => {
        if (lecturerId) {
            axios.get(`/api/v1/students/subjects/lecturer/${lecturerId}`)
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
            axios.get(`/api/v1/students/subjects/lecturer/${selectedSlot.lecturerId}`)
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
    return (
        <>
            <div className={Style.box}>
                <ToastContainer />
                {
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
                            <div className={Style.box_content}
                                style={{ height: 'fit-content', width: "fit-content" }}
                            >
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
                                    <Stack direction='horizontal' gap={5}>
                                        <Stack direction='vertical'
                                            style={{
                                                maxWidth: '300px',
                                            }}
                                        >
                                            <p>Lecturer: {selectedSlot.lecturerName}</p>
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
                                                <p>Purpose: {selectedSlot.requestContent || selectedSlot.description}</p>
                                            </Stack>

                                        </Stack>

                                        <div
                                            style={{
                                                padding: '10px',
                                                width: '300px',
                                                border: '1px solid #333'
                                            }}
                                        >
                                            <form onSubmit={e => { handleUpdateSlot(e) }}>
                                                <p style={{ margin: '0' }}>Subject:</p>
                                                <select
                                                    onChange={e => setSubject(e.target.value)}
                                                    style={{ marginBottom: '10px' }}
                                                >
                                                    {subjectList.map((item, index) => (
                                                        <option
                                                            key={index}
                                                            value={`${item.subjectId}`}
                                                        >
                                                            {item.subjectId}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Stack direction='vertical' gap='2'
                                                    style={{ marginBottom: '10px' }}
                                                >
                                                    <label htmlFor='purpose'>Purpose:</label>
                                                    <textarea id='purpose' className={Style.purpose}
                                                        maxLength={200}
                                                        value={purpose}
                                                        onChange={e => setPurpose(e.target.value)}
                                                    >
                                                    </textarea>
                                                </Stack>

                                                <button
                                                    className={Style.book_btn}
                                                >{!loading ? "Update" : "Updating..."}</button>
                                            </form>
                                        </div>
                                    </Stack>
                                </Stack>

                            </div>
                        )
                }
            </div>
        </>
    );
}

export default BookPublicOverlay;