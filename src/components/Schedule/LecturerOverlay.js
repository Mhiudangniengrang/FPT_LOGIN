
import { useContext, useEffect, useMemo } from 'react';
import GlobalContext from '../../context/GlobalContext';
import ViewSlot from './L_ViewSlotOverlay';
import CreateSlot from './L_CreateSlotOverlay';
function LecturerOverlay() {
    const { selectedSlot } = useContext(GlobalContext)
    const status = selectedSlot ? selectedSlot.status : null
    return (
        <>
            {(status === undefined || status === null) && (
                <CreateSlot />
            )}
            {(status === "BOOKED" || status === "OPEN") &&
                <ViewSlot />
            }
        </>
    );
}

export default LecturerOverlay;