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

function S_ViewRequest() {
    const { lecturerId } = useParams()
    const { loginUser } = useData()
    const { setShowSlotModal, selectedSlot } = useContext(GlobalContext)
    return (
        <>
            <div className={Style.box}>
                <div className={Style.box_content}
                    style={{
                        height: 'fit-content'
                    }}
                >
                    <div
                        style={{
                            width: '30px',
                            height: '15px',
                            borderRadius: "10px",
                            background: "green",
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
                            <p>Booked date: {dayjs(selectedSlot.bookedDate).format("YYYY-MM-DD")}</p>
                            <p>Subject: {selectedSlot.subjectId}</p>

                            <Stack direction='vertical' gap='2'
                                style={{ marginBottom: '10px' }}
                            >
                                <label htmlFor='purpose'>Purpose:</label>
                                <textarea id='purpose' className={Style.purpose}
                                    value={selectedSlot.requestContent}
                                    disabled={true}
                                >
                                </textarea>
                            </Stack>
                            <button
                                className={Style.book_btn}
                            >Update</button>
                        </Stack>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default S_ViewRequest;