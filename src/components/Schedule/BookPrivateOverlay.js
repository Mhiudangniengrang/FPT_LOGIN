import { useState, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Overlay from 'react-bootstrap/Overlay';
import Style from '../../assets/style/form.module.scss'
import CurrentWeekDatePicker from './CurrentWeekDatePicker';

const subjects = [
    'SWP301', 'SWR301', 'SWT301', 'PRF192', 'CEA201'
]

function BookPrivateOverlay() {
    const [show, setShow] = useState(false);
    const target = useRef(null);


    const closeForm = () => {
        setShow(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., save the event data)
    };


    return (
        <>
            <div style={{
                display: 'inline-block',
                border: '3px solid #333',
                padding: '10px  ',
                borderRadius: '10px',
            }} ref={target} onClick={() => setShow(!show)}>
                <p className='mb-0'>30 mins at 610 (NVH)</p>
                <p>(9:30 - 10:00)</p>
            </div>
            <Overlay target={target.current} show={show} placement="right">
                {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                }) => (
                    <div
                        {...props}
                        style={{
                            display: 'flex',
                            width: '400px',
                            height: '60vh',
                            position: 'absolute',
                            backgroundColor: '#fff',
                            padding: '10px 10px',
                            color: 'black',
                            borderRadius: 3,
                            overflowY: 'auto',
                            boxShadow: 'rgba(0, 0, 0, 0.3) 1px 2px 7px 3px',
                            ...props.style,
                        }}
                    >
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
                                <button onClick={handleOverlayClose} style={{ border: 'none' }}>
                                    <FontAwesomeIcon icon={faXmark} style={{ color: '#000000' }} />
                                </button>
                            </Stack>
                            <Stack direction='vertical'>
                                <p>Lecturer: { }</p>
                                <p>Date</p>
                                <p>Time</p>
                                <p>Room</p>
                                <p>Status</p>

                                <label htmlFor='form'>Choose your subject:</label>
                                <div className={Style.subjects}>
                                    {subjects.map(subject => {
                                        return (
                                            <div className={Style.contain}>
                                                <span
                                                    className={Style.span}
                                                >{subject}</span>
                                            </div>
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
                                            Private code:
                                            <OverlayTrigger
                                                placement='right'
                                                overlay={
                                                    <Tooltip id={`tooltip-right`}>
                                                        <span style={{ fontSize: '12px', textAlign: 'left' }}>You must contact to your teacher to get this private code</span>
                                                    </Tooltip>
                                                }
                                            >
                                                <Button style={{ backgroundColor: '#fff', border: 'none' }}>
                                                    <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#000000", }} />
                                                </Button>
                                            </OverlayTrigger>
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
                )}
            </Overlay >
        </>
    );
}

export default BookPrivateOverlay;