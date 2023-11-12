import dayjs from 'dayjs';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export const AccessExpired = () => {
    const [show, setShow] = useState(true)
    const handleExtendAccess = () => {
        sessionStorage.setItem('loginTime', dayjs(Date.now()))
        setShow(false)
    };
    const navigate = useNavigate()
    const handleExit = () => {
        setShow(false)
        navigate('/');
    };
    return (
        <>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Access token has expired!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You need to extend your access or exit.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleExtendAccess}>
                        Extend access
                    </Button>
                    <Button variant="primary" onClick={handleExit}>
                        Exit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
