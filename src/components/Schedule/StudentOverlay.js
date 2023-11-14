
import { useContext, useEffect, useMemo } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useParams } from 'react-router-dom';
import BookPublicOverlay from './BookPublicOverlay';
import S_BookSlot from './S_BookSlotOverLay';
import S_ViewRequest from './S_ViewRequestOverlay';

function StudentOverlay() {
    const { selectedSlot } = useContext(GlobalContext)
    const { lecturerId } = useParams()
    const status = selectedSlot.status || selectedSlot.requestStatus
    console.log(status)
    return (
        <>
            {(status === "BOOKED" && lecturerId === undefined) &&
                <BookPublicOverlay />
            }
            {status === "OPEN" &&
                <S_BookSlot />
            }
            {status === "APPROVED" &&
                <S_ViewRequest />
            }
        </>
    );
}

export default StudentOverlay;