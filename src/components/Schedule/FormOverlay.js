import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';

function FormOverlay() {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <>
            <div style={{ display: 'inline-block', border: '1px solid #333' }} ref={target} onClick={() => setShow(!show)}>
                <p>30 mins at 610 (NVH)</p>
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
                            position: 'absolute',
                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        asdasdasd
                    </div>
                )}
            </Overlay>
        </>
    );
}

export default FormOverlay;